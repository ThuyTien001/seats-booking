import React, { useEffect, useState } from "react";
// import { collection, getDocs, } from "firebase/firestore";
// import { db } from './firebase';
import './App.css';
import AdminLogin from './adminLogin';
import SeatMap from "./seatMap";
const QR =() => {
    const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState("user");

  useEffect(() => {

      const storedAdmin = localStorage.getItem('isAdmin');
    if (storedAdmin === 'true') setIsAdmin(true);

        // Xác định mode theo URL
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get("mode");
    if (modeParam === "admin") setViewMode("admin");
    else setViewMode("user"); // mặc định là user

  }, []);

   const handleLoginSuccess = () => {
    localStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
  };
// ⚙️ Hiển thị khác nhau cho user và admin
  if (viewMode === "admin") {
    return isAdmin ? (
      <SeatMap isAdmin={true} />
    ) : (
      <AdminLogin onLoginSuccess={handleLoginSuccess} />
    );
  }
    // Mặc định: chế độ người dùng xem sơ đồ ghế
  return <SeatMap isAdmin={false} />;
}

export default QR;