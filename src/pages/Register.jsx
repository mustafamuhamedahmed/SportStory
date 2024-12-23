import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.username) {
      formErrors.username = "Username is required.";
      isValid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
      console.log("Form Submitted", formData);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="register">
      <h1 className="register__title">Register</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={`register__input ${errors.username ? "invalid" : ""}`}
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="register__error">{errors.username}</span>}
        </div>

        <div className="register__field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`register__input ${errors.email ? "invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="register__error">{errors.email}</span>}
        </div>

        <div className="register__field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`register__input ${errors.password ? "invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="register__error">{errors.password}</span>}
        </div>

        <button type="submit" className="register__button">Sign Up</button>
        <a href="/login" className="register__link">Already have an account? Log in</a>
      </form>

      {isSubmitted && <div className="register__message success">Account created successfully!</div>}
      {!isSubmitted && Object.values(errors).some((error) => error) && (
        <div className="register__message error">There are errors in the form. Please correct them.</div>
      )}
    </div>
  );
};

export default Register;
