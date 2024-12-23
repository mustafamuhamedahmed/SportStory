import React, { useState, useEffect } from "react";
import "./PostCoupons.css"; // ملف CSS للتنسيق
import Button from "../components/Button"; // مكون الزر

const PostCoupons = () => {
  const [couponData, setCouponData] = useState({
    code: "",
    discount: "",
    expiryDate: "",
  });

  const [addError, setAddError] = useState(null);
  const [coupons, setCoupons] = useState([]);

  // دالة لمعالجة التغيير في الحقول
  const handleChange = (e) => {
    setCouponData({ ...couponData, [e.target.name]: e.target.value });
  };

  // دالة لإرسال الكوبون الجديد إلى الـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddError(null); // إعادة تعيين الأخطاء السابقة
      const response = await fetch("https://api.example.com/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(couponData),
      });

      if (!response.ok) throw new Error("Failed to add coupon");

      // إعادة تعيين البيانات بعد إضافة الكوبون
      setCouponData({ code: "", discount: "", expiryDate: "" });

      // تحديث قائمة الكوبونات بعد إضافة كوبون جديد
      const updatedCoupons = await fetchCoupons();
      setCoupons(updatedCoupons);
    } catch (error) {
      setAddError(error.message); // تخزين الخطأ إذا حدث
    }
  };

  // دالة لجلب الكوبونات
  const fetchCoupons = async () => {
    const response = await fetch("https://api.example.com/coupons");
    const data = await response.json();
    return data;
  };

  // جلب الكوبونات عند تحميل الصفحة
  useEffect(() => {
    const loadCoupons = async () => {
      const loadedCoupons = await fetchCoupons();
      setCoupons(loadedCoupons);
    };

    loadCoupons();
  }, []);

  return (
    <div className="post-coupons">
      <h1>Post Coupons</h1>

      <section className="add-coupon-section">
        <h2>Add New Coupon</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={couponData.code}
            onChange={handleChange}
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount Percentage"
            value={couponData.discount}
            onChange={handleChange}
          />
          <input
            type="date"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
          />
          <Button type="submit" label="Add Coupon" />
        </form>
        {addError && <p className="error-message">{addError}</p>}
      </section>

      <section className="coupons-list-section">
        <h2>Available Coupons</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan="3">No coupons available</td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td>{coupon.expiryDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PostCoupons;
