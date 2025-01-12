import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css"; // إذا كنت بحاجة إلى تنسيق مخصص

// دالة للتحقق من صحة البيانات
const validateForm = (formData) => {
  const errors = {};
  if (!formData.name) errors.name = "Full name is required";
  if (!formData.address) errors.address = "Address is required";
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }
  return errors;
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  // إدارة حالة النموذج
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  // إدارة الأخطاء
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من صحة البيانات
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // محاكاة عملية إرسال الطلب
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Order Submitted:", { formData, cart });
      alert("Your order has been placed successfully!");
      setIsSubmitting(false);
      setFormData({ name: "", address: "", email: "", phone: "" }); // إعادة تعيين النموذج
      navigate("/payment", { state: { cart, totalPrice } }); // الانتقال إلى صفحة الدفع
    }, 2000); // محاكاة عملية الدفع
  };

  return (
    <div className="checkout-container">
      <h1>{cart.length > 0 ? "Checkout" : "Your Cart is Empty"}</h1>
      {cart.length > 0 ? (
        <>
          <p>Please review your order before proceeding to payment.</p>
          <ul className="checkout-cart-list">
            {cart.map((product) => (
              <li key={product.id} className="checkout-cart-item">
                <div className="checkout-item-details">
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="checkout-item-total">
                  <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-summary">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="checkout-button">
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>Your cart is empty. Please go back and add items to your cart.</p>
      )}
    </div>
  );
};

export default Checkout;
