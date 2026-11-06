import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Lock,
} from "lucide-react";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  onPayment,
  amount,
}) => {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    mobileNumber: "",
    reference: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    Promise.resolve(onPayment(formData)).finally(() => setLoading(false));
  };

  return (
    <div className="payment-box">

      <div className="payment-title">
        <h2>Payment Method</h2>
        <p>Choose your preferred payment method</p>
      </div>

      <div className="payment-options">

        <button
          type="button"
          className={`payment-option ${
            paymentMethod === "card" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          <CreditCard size={22} />
          <div>
            <strong>Credit / Debit Card</strong>
            <span>Visa, Mastercard</span>
          </div>
        </button>

        <button
          type="button"
          className={`payment-option ${
            paymentMethod === "easypaisa" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("easypaisa")}
        >
          <Smartphone size={22} />
          <div>
            <strong>EasyPaisa</strong>
            <span>Mobile wallet</span>
          </div>
        </button>

        <button
          type="button"
          className={`payment-option ${
            paymentMethod === "jazzcash" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("jazzcash")}
        >
          <Wallet size={22} />
          <div>
            <strong>JazzCash</strong>
            <span>Mobile wallet</span>
          </div>
        </button>

      </div>

      <form onSubmit={handleSubmit} className="payment-form">

        {paymentMethod === "card" && (
          <>
            <div className="form-group">
              <label>Card Holder Name</label>
              <input
                type="text"
                name="cardName"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                maxLength="19"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="12/30"
                  maxLength="5"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  maxLength="3"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </>
        )}

        {paymentMethod === "easypaisa" && (
          <>
            <div className="wallet-info">
              <h3>EasyPaisa Demo Payment</h3>
              <p>
                This is a demo payment. No real money will be transferred.
              </p>
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="03XX XXXXXXX"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Transaction Reference</label>
              <input
                type="text"
                name="reference"
                placeholder="EP-DEMO-12345"
                value={formData.reference}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {paymentMethod === "jazzcash" && (
          <>
            <div className="wallet-info">
              <h3>JazzCash Demo Payment</h3>
              <p>
                This is a demo payment. No real money will be transferred.
              </p>
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                placeholder="03XX XXXXXXX"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Transaction Reference</label>
              <input
                type="text"
                name="reference"
                placeholder="JC-DEMO-12345"
                value={formData.reference}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="pay-button"
          disabled={loading}
        >
          <Lock size={18} />

          {loading
            ? "Processing Payment..."
            : `Pay Rs ${Number(amount).toLocaleString()}`}
        </button>

      </form>

      <p className="demo-note">
        This is a demo payment system for the LMS portfolio project.
      </p>

    </div>
  );
};

export default PaymentMethod;
