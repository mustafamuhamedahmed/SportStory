import React, { useState } from "react";
import InputField from "./InputField";

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // تحقق من صحة البيانات
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);

    // إذا لم تكن هناك أخطاء، يمكنك إرسال البيانات
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
