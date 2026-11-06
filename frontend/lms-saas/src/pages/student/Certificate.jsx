import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Award, ArrowLeft, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Certificate.css";

function Certificate() {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get(`/student/certificate/${id}`)
      .then(({ data }) => { if (active) setCertificate(data.certificate || null); })
      .catch(() => { if (active) setCertificate(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <main className="certificate-page"><p className="certificate-state">Preparing your certificate…</p></main>;
  if (!certificate) return <main className="certificate-page"><p className="certificate-state">Certificate not found.</p><Link to="/student/certificates">Back to certificates</Link></main>;

  const date = certificate.updatedAt ? new Date(certificate.updatedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";
  return (
    <main className="certificate-page">
      <div className="certificate-toolbar"><Link to="/student/certificates"><ArrowLeft size={17} /> My certificates</Link><button type="button" onClick={() => window.print()}><Printer size={17} /> Print / Save PDF</button></div>
      <article className="certificate-card" aria-label="Certificate of completion">
        <div className="certificate-border">
          <div className="certificate-brand"><span className="certificate-brand-mark"><Award size={20} /></span> LEARNSMART <i>ACADEMY</i></div>
          <div className="certificate-rule"><span /></div>
          <p className="certificate-kicker">CERTIFICATE OF COMPLETION</p>
          <h1>Achievement<br />unlocked.</h1>
          <p className="certificate-presented">This certificate is proudly presented to</p>
          <h2 className="student-name">{certificate.student?.name || "Learner"}</h2>
          <p className="certificate-course-copy">for successfully completing the course</p>
          <h3 className="course-name">{certificate.course?.title || "Course"}</h3>
          <div className="certificate-bottom">
            <div><span>INSTRUCTOR</span><strong>{certificate.course?.instructor?.name || "LearnSmart Academy"}</strong></div>
            <div className="certificate-seal"><Award size={23} /><span>VERIFIED<br />ACHIEVEMENT</span></div>
            <div className="certificate-date"><span>DATE AWARDED</span><strong>{date}</strong></div>
          </div>
          <div className="certificate-id">CERTIFICATE ID&nbsp; · &nbsp;{certificate._id}</div>
        </div>
      </article>
      <p className="certificate-note">Your achievement is ready to print or save as a PDF.</p>
    </main>
  );
}

export default Certificate;
