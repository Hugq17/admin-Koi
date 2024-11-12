import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/brand/logo.png";
import KoiBG from "../assets/brand/KoiBG.jpg";
const Login = ({ updateStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.accessToken);
        updateStatus(data.accessToken);
        navigate("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-black bg-opacity-80 flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "#111827" }}
    >
      {/* Left: Background Image */}
      <div className="w-1/2 hidden lg:block">
        <img
          src={KoiBG}
          alt="Background"
          className="object-cover w-full h-screen filter brightness-50"
        />
      </div>

      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 p-8 w-full lg:w-1/2 bg-gray-800 shadow-lg rounded-lg"
        style={{ backgroundColor: "#111827" }}>
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            className="h-32 w-auto my-2"
            alt="Logo"
            style={{ width: "auto", height: "180px" }}
          />
        </div>
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Đăng nhập
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChangeEmail}
              placeholder="Nhập email của bạn"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              disabled={loading}
              style={{ color: "black" }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleInputChangePassword}
              placeholder="Nhập mật khẩu của bạn"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              disabled={loading}
              style={{ color: "black" }}
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full transition duration-200"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Forgot Password & Sign Up Links */}
        <div className="flex justify-between mt-4 text-sm text-blue-500">
          <a href="#" className="hover:underline">Quên mật khẩu?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

