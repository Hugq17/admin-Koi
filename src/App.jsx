import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import OverviewPage from "./pages/OverviewPage";
import User from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import BlogsPage from "./pages/BlogsPage";
import OrdersPage from "./pages/OrdersPage";

function PrivateRoute({ isLoggedIn, children }) {
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(Boolean(token));
  }, []);

  const updateStatus = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(Boolean(token));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {isLoggedIn && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Login updateStatus={updateStatus} />} />
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <OverviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <BlogsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SettingsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
