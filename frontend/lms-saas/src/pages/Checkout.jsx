import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentMethod from "../components/PaymentMethod";
import api from "../services/api";
import { getCourseImageUrl } from "../services/media";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;
  const purchaseType = location.state?.purchaseType || "course";
  const certificatePricing = location.state?.certificatePricing;
  const pricing = purchaseType === "certificate" ? certificatePricing : course?.pricing;
  const amount = purchaseType === "certificate"
    ? pricing?.certificateCurrentPrice ?? 0
    : pricing?.currentPrice ?? course?.price ?? 0;
  const originalAmount = purchaseType === "certificate"
    ? pricing?.certificateOriginalPrice ?? amount
    : pricing?.originalPrice ?? amount;
  const discountAmount = purchaseType === "certificate"
    ? pricing?.certificateDiscountAmount ?? 0
    : pricing?.discountAmount ?? 0;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setError("");
    try {
      const { data } = purchaseType === "certificate"
        ? await api.post(`/payment/certificate/${location.state.enrollmentId}`, { paymentMethod })
        : await api.post("/payment", {
          courseId: course._id,
          paymentMethod,
        });

      navigate("/payment-success", {
        state: {
          payment: {
            ...data.payment,
            courseName: course.title,
            itemType: purchaseType,
          },
        },
      });
    } catch (paymentError) {
      setError(
        paymentError.response?.data?.message ||
          "Payment could not be completed. Please try again."
      );
    }
  };

  if (!course?._id) {
    return (
      <>
      <Navbar />
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-left">
            <h1>Purchase details are missing</h1>
            <p>Choose a course or certificate first, then continue to checkout.</p>
            <button type="button" onClick={() => navigate("/courses")}>
              Browse courses
            </button>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-left">
          <div className="checkout-header">
            <h1>{purchaseType === "certificate" ? "Certificate checkout" : "Checkout"}</h1>
            <p>{purchaseType === "certificate" ? "Claim your course achievement" : "Complete your course purchase"}</p>
          </div>

          <div className="course-summary">
            <div className="course-image">
              {course.thumbnail ? (
                <img src={getCourseImageUrl(course.thumbnail)} alt={course.title} />
              ) : (
                <div className="course-placeholder">
                  LMS
                </div>
              )}
            </div>

            <div className="course-info">
              <h2>{course.title}</h2>
              <p>{purchaseType === "certificate" ? "Certificate of completion" : "Lifetime course access"}</p>
              <h3>Rs {Number(amount).toLocaleString()}</h3>
              {discountAmount > 0 && (
                <p className="checkout-discount">
                  <del>Rs {Number(originalAmount).toLocaleString()}</del>
                  <span>You save Rs {Number(discountAmount).toLocaleString()}</span>
                </p>
              )}
            </div>
          </div>

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onPayment={handlePayment}
            amount={amount}
          />
          {error && <p role="alert" className="payment-error">{error}</p>}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-item">
            <span>{purchaseType === "certificate" ? "Certificate" : "Course"}</span>
            <span>Rs {Number(amount).toLocaleString()}</span>
          </div>

          <div className="summary-item">
            <span>Discount</span>
            <span>Rs {Number(discountAmount).toLocaleString()}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>Rs {Number(amount).toLocaleString()}</strong>
          </div>

          <div className="secure-payment">
            🔒 Secure Demo Payment
          </div>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Checkout;
