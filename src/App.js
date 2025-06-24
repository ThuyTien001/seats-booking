// import React, { useEffect, useState } from "react";
// // import { collection, getDocs, } from "firebase/firestore";
// // import { db } from './firebase';
// import './App.css';
// import AdminLogin from './adminLogin';
// import SeatMap from "./seatMap";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import SeatMap from "./seatMap";
import AdminLogin from "./adminLogin";
import GoogleFormEmbed from "./GoogleFormEmbed";
import QR from "./qr"; // file xử lý view mode admin/user như bạn viết
import AttendeeList from "./attendeeList";
import "./index.css"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // ✅ Kiểm tra localStorage khi app vừa tải
  useEffect(() => {
    // const isAdmin = localStorage.getItem('isAdmin') === 'true';
    // if (isAdmin) {
    //   setIsLoggedIn(true);
    // }else {
    //   setIsLoggedIn(false);
    // }

        const isAdminStored = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(isAdminStored);
  }, []);
  //   return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<QR />} /> {/* Mặc định: hiển thị sơ đồ hoặc login */}
  //       <Route path="/form" element={<GoogleFormEmbed />} />
  //       <Route path="/seats" element={<SeatMap isAdmin={false} />} />
  //       <Route path="/admin" element={<AdminLogin onLoginSuccess={() => { window.location.href = "/"; }} />} />
  //     </Routes>
  //   </Router>
  // );

    return (
    <Router>
      <Routes>
        {/* Nếu là admin, tự động vào QR view với quyền admin */}
        <Route
          path="/"
          element={<QR isAdmin={isLoggedIn} />}
        />

        {/* Form đăng ký từ Google Form */}
        <Route path="/form" element={<GoogleFormEmbed />} />

        <Route path="/list" element={<AttendeeList />} />

        {/* Chỉ xem ghế với tư cách user */}
        <Route path="/seats" element={<SeatMap isAdmin={true} />} />

        {/* Trang đăng nhập admin */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
            )
          }
        />
      </Routes>
    </Router>
  );

  // return (
  //   <div style={{Width: "100%", padding: "20px" }}>
  //     <h2>Đăng ký tham dự sự kiện</h2>
  //     <iframe
  //       src="https://docs.google.com/forms/d/e/1FAIpQLSfASgLIkIx6Jynz7r6c1NUWYZ97k3d2bYQxQ1SkkvHFUn2SBg/viewform?embedded=true" 
  //       width="640" 
  //       height="954" 
  //       frameborder="0" 
  //       marginheight="0" 
  //       marginwidth="0">
  //     Đang tải…
  //     </iframe>

  //   </div>
  // );
// 
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [viewMode, setViewMode] = useState("user");

//   useEffect(() => {

//       const storedAdmin = localStorage.getItem('isAdmin');
//     if (storedAdmin === 'true') setIsAdmin(true);

//         // Xác định mode theo URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const modeParam = urlParams.get("mode");
//     if (modeParam === "admin") setViewMode("admin");
//     else setViewMode("user"); // mặc định là user

//   }, []);

//    const handleLoginSuccess = () => {
//     localStorage.setItem("isAdmin", "true");
//     setIsAdmin(true);
//   };
// // ⚙️ Hiển thị khác nhau cho user và admin
//   if (viewMode === "admin") {
//     return isAdmin ? (
//       <SeatMap isAdmin={true} />
//     ) : (
//       <AdminLogin onLoginSuccess={handleLoginSuccess} />
//     );
//   }
//     // Mặc định: chế độ người dùng xem sơ đồ ghế
//   return <SeatMap isAdmin={false} />;

  //  return (
  //   <div>
  //     {isAdmin ? (
  //       <SeatMap isAdmin={true} />
  //     ) : (
  //       <AdminLogin onLoginSuccess={handleLoginSuccess} />
  //     )}
  //   </div>
  // );
  // const handleBook = async () => {
  //   if (selectedSeat && userName) {
  //     const seatRef = doc(db, "seats", selectedSeat.id);
  //     await updateDoc(seatRef, { takenBy: userName });
  //     setSeats(seats.map(s => s.id === selectedSeat.id ? { ...s, takenBy: userName } : s));
  //     setSelectedSeat(null);
  //     setUserName("");
  //   }
  // };

  // return (
  //   <div className="app">
  //     <h2>Chọn ghế</h2>
  //     <div className="seat-grid">
  //       {seats.map(seat => (
  //         <div
  //           key={seat.id}
  //           className={`seat ${seat.type} ${seat.takenBy ? "taken" : ""}`}
  //           onClick={() => !seat.takenBy && setSelectedSeat(seat)}
  //         >
  //           {seat.SeatId}
  //         </div>
  //       ))}
  //     </div>

  //     {selectedSeat && (
  //       <div className="popup">
  //         <h4>Đăng ký ghế: {selectedSeat.SeatId}</h4>
  //         <input
  //           type="text"
  //           placeholder="Tên của bạn"
  //           value={userName}
  //           onChange={e => setUserName(e.target.value)}
  //         />
  //         <button onClick={handleBook}>Xác nhận</button>
  //         <button onClick={() => setSelectedSeat(null)}>Hủy</button>
  //       </div>
  //     )}
  //   </div>
  // );
}

export default App;
