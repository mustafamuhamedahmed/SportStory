import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // التحقق من صحة البريد الإلكتروني
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // التحقق من صحة كلمة المرور
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    // إعادة تعيين الرسائل السابقة
    setError("");
    setIsEmailValid(true);
    setIsPasswordValid(true);

    // التحقق من صحة البيانات
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setError("Please enter a valid email.");
      return;
    }
    if (!validatePassword(password)) {
      setIsPasswordValid(false);
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // محاكاة عملية تسجيل الدخول (يمكنك استبدالها بطلب حقيقي)
    setTimeout(() => {
      console.log("Logging in with:", email, password);
      setLoading(false);
      // يمكن إضافة عملية التوجيه أو التعامل مع النتيجة هنا بعد تسجيل الدخول
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Login</h1>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      
      {/* إدخال البريد الإلكتروني */}
      <InputField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        isValid={isEmailValid}
      />
      
      {/* إدخال كلمة المرور */}
      <InputField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        isValid={isPasswordValid}
      />

      {/* الزر لتسجيل الدخول */}
      <Button
        label={loading ? "Logging in..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
};

export default Login;