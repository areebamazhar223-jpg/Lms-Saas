import { useEffect, useState } from "react";
import { CreditCard, CheckCircle } from "lucide-react";
import api from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./MyPayments.css";

const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api.get("/payment/my-payments")
      .then(({ data }) => {
        if (active) setPayments(data.payments || []);
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || "Could not load payments.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  return (
    <>
    <Navbar />
    <div className="payments-page">

      <div className="payments-container">

        <div className="payments-header">
          <div>
            <h1>My Payments</h1>
            <p>View your course payment history</p>
          </div>

          <div className="payment-count">
            <CreditCard size={20} />
            {payments.length} Payments
          </div>
        </div>

        {loading ? (
          <div className="empty-payments"><p>Loading payments...</p></div>
        ) : error ? (
          <div className="empty-payments"><p role="alert">{error}</p></div>
        ) : payments.length === 0 ? (
          <div className="empty-payments">
            <CreditCard size={50} />

            <h2>No Payments Yet</h2>

            <p>
              Your completed course purchases will appear here.
            </p>
          </div>
        ) : (
          <div className="payments-table">

            <div className="table-header">
              <span>Course</span>
              <span>Amount</span>
              <span>Method</span>
              <span>Transaction ID</span>
              <span>Status</span>
            </div>

            {payments.map((payment) => (
              <div className="payment-row" key={payment._id}>

                <div className="course-cell">
                  <strong>
                    {payment.course?.title || "Course unavailable"}
                    {payment.itemType === "certificate" ? " · Certificate" : ""}
                  </strong>
                  <small>
                    {new Date(
                      payment.paymentDate
                    ).toLocaleDateString()}
                  </small>
                </div>

                <strong>Rs {Number(payment.amount).toLocaleString()}</strong>

                <span className="method">
                  {payment.paymentMethod}
                </span>

                <span className="transaction-id">
                  {payment.transactionId}
                </span>

                <span className={payment.status === "Paid" ? "status-paid" : "status-pending"}>
                  {payment.status === "Paid" && <CheckCircle size={16} />}
                  {payment.status}
                </span>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
    <Footer />
    </>
  );
};

export default MyPayments;
