import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Award, Download, LockKeyhole } from "lucide-react";
import api from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Certificates.css";

function Certificates() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/student/certificates")
      .then(({ data }) => {
        if (active) setCertificates(data.certificates || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Could not load certificates.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const downloadCertificate = async (id) => {
    try {
      const response = await api.get(`/student/certificate/${id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "LearnSmart-Certificate.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (requestError) {
      alert(requestError.response?.data?.message || "Certificate download failed.");
    }
  };

  const claimCertificate = async (enrollment) => {
    if (enrollment.certificatePricing?.certificateFree) {
      try {
        setProcessingId(enrollment._id);
        await api.post(`/payment/certificate/${enrollment._id}`);
        setCertificates((items) => items.map((item) => item._id === enrollment._id
          ? { ...item, certificateIssued: true }
          : item));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Certificate could not be issued.");
      } finally {
        setProcessingId("");
      }
      return;
    }

    navigate("/checkout", {
      state: {
        purchaseType: "certificate",
        enrollmentId: enrollment._id,
        course: enrollment.course,
        certificatePricing: enrollment.certificatePricing,
      },
    });
  };

  if (loading) {
    return <><Navbar /><main className="certificates-page"><div className="certificate-loading">Loading your certificates...</div></main><Footer /></>;
  }

  return (
    <>
    <Navbar />
    <main className="certificates-page">
      <header className="certificate-header">
        <div>
          <span className="certificate-eyebrow">YOUR ACHIEVEMENTS</span>
          <h1>Certificates</h1>
          <p>Finish a course, then claim your certificate here.</p>
        </div>
        <div className="certificate-total"><Award size={20} /> {certificates.filter((item) => item.certificateIssued).length} issued</div>
      </header>

      {error && <p className="certificate-error" role="alert">{error}</p>}

      {certificates.length === 0 ? (
        <section className="certificate-empty">
          <Award size={38} />
          <h2>Your certificates will appear here</h2>
          <p>Complete an enrolled course to unlock its certificate.</p>
        </section>
      ) : (
        <div className="certificate-grid">
          {certificates.map((item) => {
            const pricing = item.certificatePricing || {};
            return (
              <article className="certificate-card" key={item._id}>
                <div className="certificate-card-icon"><Award size={24} /></div>
                <span className={item.certificateIssued ? "certificate-status is-issued" : "certificate-status"}>
                  {item.certificateIssued ? "Certificate ready" : "Course completed"}
                </span>
                <h2>{item.course?.title || "Course"}</h2>
                <p className="certificate-completed-date">
                  Completed {new Date(item.updatedAt).toLocaleDateString()}
                </p>
                <div className="certificate-price">
                  {pricing.certificateFree ? (
                    <strong>Certificate included</strong>
                  ) : (
                    <>
                      <strong>Rs {Number(pricing.certificateCurrentPrice || 0).toLocaleString()}</strong>
                      {pricing.certificateDiscountAmount > 0 && <del>Rs {Number(pricing.certificateOriginalPrice).toLocaleString()}</del>}
                    </>
                  )}
                </div>
                {item.certificateIssued ? (
                  <button type="button" className="certificate-action" onClick={() => downloadCertificate(item._id)}>
                    <Download size={17} /> Download certificate
                  </button>
                ) : (
                  <button type="button" className="certificate-action" disabled={processingId === item._id} onClick={() => claimCertificate(item)}>
                    {pricing.certificateFree ? <Award size={17} /> : <LockKeyhole size={16} />}
                    {processingId === item._id ? "Processing..." : pricing.certificateFree ? "Claim free certificate" : "Get certificate"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
    <Footer />
    </>
  );
}

export default Certificates;
