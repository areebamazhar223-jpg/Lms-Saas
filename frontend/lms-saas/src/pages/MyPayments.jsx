import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Calendar, CreditCard, Package, CheckCircle, Clock } from "lucide-react";
import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import "../styles/lms-theme.css";
import "./MyPayments.css";

export default function MyPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/payment/history");
        
        if (data?.success && data?.payments) {
          setPayments(data.payments);
        } else {
          // Mock data for demonstration
          setPayments([
            {
              _id: "1",
              courseName: "Advanced React Development",
              amount: 7999,
              originalAmount: 15999,
              discount: 50,
              paymentMethod: "Credit Card",
              transactionId: "TXN20250128001",
              status: "completed",
              createdAt: "2025-01-28T10:30:00Z",
              type: "course"
            },
            {
              _id: "2",
              courseName: "UI/UX Design Masterclass",
              amount: 0,
              originalAmount: 0,
              discount: 0,
              paymentMethod: "Free Enrollment",
              transactionId: "TXN20250127001",
              status: "completed",
              createdAt: "2025-01-27T14:20:00Z",
              type: "course"
            },
            {
              _id: "3",
              courseName: "Python for Data Science",
              amount: 5999,
              originalAmount: 9999,
              discount: 40,
              paymentMethod: "JazzCash",
              transactionId: "TXN20250126001",
              status: "completed",
              createdAt: "2025-01-26T09:15:00Z",
              type: "course"
            }
          ]);
        }
      } catch (err) {
        console.error("Payment History Error:", err);
        setError("Failed to load payment history");
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPaymentIcon = (method) => {
    if (method?.toLowerCase().includes("free")) return Package;
    return CreditCard;
  };

  const totalSpent = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalSaved = payments.reduce((sum, p) => sum + ((p.originalAmount || 0) - (p.amount || 0)), 0);

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="lms-loading">
          <div className="lms-spinner"></div>
          <p className="lms-loading__text">Loading payments...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="my-payments">
        {/* Header Section */}
        <div className="payments-header">
          <div className="header-content">
            <h1>Payment History</h1>
            <p>Track all your course purchases and transactions</p>
          </div>
          
          <div className="payment-stats">
            <div className="stat-box">
              <div className="stat-icon" style={{ background: "rgba(133, 142, 71, 0.1)", color: "#858e47" }}>
                <Package size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Courses</span>
                <span className="stat-value">{payments.length}</span>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="stat-icon" style={{ background: "rgba(223, 135, 57, 0.1)", color: "#df8739" }}>
                <CreditCard size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Spent</span>
                <span className="stat-value">Rs {totalSpent.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="stat-icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                <CheckCircle size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Saved</span>
                <span className="stat-value">Rs {totalSaved.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {payments.length === 0 ? (
          <div className="empty-payments">
            <Package size={64} />
            <h2>No Payment History</h2>
            <p>You haven't purchased any courses yet. Explore our courses and start learning!</p>
            <button className="btn btn-primary" onClick={() => navigate("/student/courses")}>
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="payments-list">
            {payments.map((payment) => {
              const PaymentIcon = getPaymentIcon(payment.paymentMethod);
              const isFree = payment.amount === 0;
              const hasDiscount = payment.discount > 0;

              return (
                <div key={payment._id} className="payment-card">
                  <div className="payment-card-header">
                    <div className="payment-icon">
                      <PaymentIcon size={24} />
                    </div>
                    <div className="payment-course-info">
                      <h3>{payment.courseName}</h3>
                      <div className="payment-meta">
                        <span className="payment-date">
                          <Calendar size={14} />
                          {formatDate(payment.createdAt)}
                        </span>
                        <span className="payment-method">
                          <CreditCard size={14} />
                          {payment.paymentMethod}
                        </span>
                      </div>
                    </div>
                    <div className="payment-status">
                      {payment.status === "completed" ? (
                        <span className="status-badge status-success">
                          <CheckCircle size={14} />
                          Completed
                        </span>
                      ) : (
                        <span className="status-badge status-pending">
                          <Clock size={14} />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="payment-card-body">
                    <div className="payment-details">
                      <div className="detail-row">
                        <span className="detail-label">Transaction ID:</span>
                        <span className="detail-value">{payment.transactionId}</span>
                      </div>
                      
                      {!isFree && (
                        <>
                          {hasDiscount && (
                            <div className="detail-row">
                              <span className="detail-label">Original Price:</span>
                              <span className="detail-value detail-strikethrough">
                                Rs {payment.originalAmount?.toLocaleString()}
                              </span>
                            </div>
                          )}
                          
                          {hasDiscount && (
                            <div className="detail-row discount-row">
                              <span className="detail-label">Discount ({payment.discount}% OFF):</span>
                              <span className="detail-value discount-value">
                                - Rs {(payment.originalAmount - payment.amount).toLocaleString()}
                              </span>
                            </div>
                          )}
                          
                          <div className="detail-row total-row">
                            <span className="detail-label">Amount Paid:</span>
                            <span className="detail-value total-value">
                              Rs {payment.amount.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                      
                      {isFree && (
                        <div className="detail-row free-row">
                          <span className="free-badge">
                            <Package size={14} />
                            Free Course
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="payment-actions">
                      <button className="btn-link" onClick={() => navigate(`/student/course/${payment.courseId}`)}>
                        View Course
                      </button>
                      <button className="btn-link">
                        <Download size={16} />
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
