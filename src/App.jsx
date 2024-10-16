import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import { useState } from "react";
import OverviewPage from "./pages/Homepage.jsx/OverviewPage";
import Products from "./pages/products/Products";
import User from "./pages/User/User";

function PrivateRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateStatus = () => {
    setIsLoggedIn((prev) => !prev);
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
          path="/products"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Products />
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
