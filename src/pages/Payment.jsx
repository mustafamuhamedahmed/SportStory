import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css"; // إذا كنت بحاجة إلى إضافة ملف CSS مخصص

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // حالة تخزين بيانات الدفع
  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // حالة تخزين الرسائل الخطأ
  const [paymentError, setPaymentError] = useState(null);

  // حالة المعالجة
  const [isProcessing, setIsProcessing] = useState(false);

  // حالة تخزين السلة والمبلغ الإجمالي
  const { cart = [], totalPrice = 0 } = location.state || {};

  // دالة لمعالجة التغيير في الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // دالة للتحقق من صحة البيانات المدخلة
  const validateForm = () => {
    if (!paymentData.name || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      setPaymentError("All fields are required");
      return false;
    }

    // تحقق من صحة تنسيق رقم البطاقة (مثال على التحقق)
    const cardNumberPattern = /^[0-9]{16}$/;
    if (!cardNumberPattern.test(paymentData.cardNumber)) {
      setPaymentError("Card number must be 16 digits");
      return false;
    }

    // تحقق من صلاحية تاريخ انتهاء البطاقة (مثال على التحقق)
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(paymentData.expiryDate)) {
      setPaymentError("Expiry date must be in MM/YY format");
      return false;
    }

    // تحقق من صحة الـ CVV
    if (!/^\d{3}$/.test(paymentData.cvv)) {
      setPaymentError("CVV must be 3 digits");
      return false;
    }

    return true;
  };

  // دالة لمعالجة تقديم النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // وضع حالة المعالجة
    setPaymentError(null); // إعادة تعيين أي رسائل خطأ سابقة

    // تحقق من صحة البيانات المدخلة
    if (!validateForm()) {
      setIsProcessing(false);
      return;
    }

    try {
      // هنا يمكنك إضافة معالجة الدفع عبر API (Stripe/PayPal أو API مخصص)
      // استبدل هذا بالكود الفعلي للاتصال بـ API.
      const response = await fetch("https://api.example.com/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment failed");

      // إذا تم الدفع بنجاح
      alert("Payment successful!");

      // إعادة تعيين البيانات بعد الدفع
      setPaymentData({ name: "", cardNumber: "", expiryDate: "", cvv: "" });
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setIsProcessing(false); // إيقاف حالة المعالجة
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>

      <form onSubmit={handleSubmit} className="payment-form">
        <div>
          <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span> - ${item.price.toFixed(2)} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={paymentData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentData.cardNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={paymentData.expiryDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentData.cvv}
          onChange={handleChange}
        />

        {paymentError && <p className="error-message">{paymentError}</p>}

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Payment;
