import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    // Kiểm tra định dạng email đơn giản
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(""); // Đặt lại thông báo lỗi

    try {
      const response = await fetch(
        "https://koi-care-server.azurewebsites.net/api/account/login",
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
        updateStatus(data.accessToken); // Gọi updateStatus với accessToken
        navigate("/dashboard"); // Chuyển đến trang dashboard
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
    <div className="login-image">
      <div className="flex items-center p-40 w-full">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center w-full"
        >
          <p className="text-6xl pixelify-sans text-white w-screen flex justify-center">
            Đăng nhập
          </p>
          <div className="mt-10 w-full flex justify-center">
            <input
              value={email}
              placeholder="Email"
              onChange={handleInputChangeEmail}
              className="bg-[#F1F1F1] p-3 rounded-md text-black w-1/2" // Thay đổi độ rộng
              aria-label="Email"
              disabled={loading}
              type="email" // Thay đổi thành type="email"
            />
          </div>
          <div className="mt-1 mb-8 w-full flex justify-center">
            <input
              placeholder="Mật khẩu"
              value={password}
              type="password"
              onChange={handleInputChangePassword}
              className="bg-[#F1F1F1] p-3 rounded-md text-black w-1/2" // Thay đổi độ rộng
              aria-label="Password"
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-max"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
