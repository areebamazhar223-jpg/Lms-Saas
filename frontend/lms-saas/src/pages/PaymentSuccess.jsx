import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const payment = location.state?.payment;

  if (!payment) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <>
    <Navbar />
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">
          <CheckCircle size={70} />
        </div>

        <h1>{payment.itemType === "certificate" ? "Certificate Ready!" : "Payment Successful!"}</h1>

        <p className="success-message">
          {payment.itemType === "certificate"
            ? "Your certificate purchase is complete. Download it from My Certificates."
            : "Your course has been purchased successfully."}
        </p>

        <div className="transaction-box">

          <div className="transaction-row">
            <span>{payment.itemType === "certificate" ? "Certificate" : "Course"}</span>
            <strong>{payment.courseName}</strong>
          </div>

          <div className="transaction-row">
            <span>Amount Paid</span>
            <strong>Rs {Number(payment.amount).toLocaleString()}</strong>
          </div>

          <div className="transaction-row">
            <span>Payment Method</span>
            <strong>{payment.paymentMethod}</strong>
          </div>

          <div className="transaction-row">
            <span>Transaction ID</span>
            <strong>{payment.transactionId}</strong>
          </div>

          <div className="transaction-row">
            <span>Status</span>
            <strong className="paid-status">Paid</strong>
          </div>

        </div>

        <div className="success-buttons">

          <button
            onClick={() => navigate(payment.itemType === "certificate" ? "/student/certificates" : "/student/my-courses")}
            className="primary-button"
          >
            {payment.itemType === "certificate" ? "My Certificates" : "Go to My Courses"}
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/student/my-payments")}
            className="secondary-button"
          >
            View Payment History
          </button>

        </div>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default PaymentSuccess;
