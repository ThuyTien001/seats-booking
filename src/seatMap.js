// import React, { useEffect, useState } from "react";
// import { collection, getDocs, doc, updateDoc} from "firebase/firestore";
// import { db } from './firebase';

// const SeatMap = ({ isAdmin }) => {
//      const [seats, setSeats] = useState([]);
//       const [selectedSeat, setSelectedSeat] = useState(null);
//       const [userName, setUserName] = useState("");
//   const handleSeatClick = (seat) => {
//     if (!isAdmin) return;

//     // show popup thông tin người dùng, nút checkin/hủy
//     console.log("Admin clicked seat:", seat);
//   };
//     useEffect(() => {
//         const fetchSeats = async () => {
//             const snapshot = await getDocs(collection(db, "seats"));
//             const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setSeats(data);
//         }
//     }, []);

//   const handleBook = async () => {
//     if (selectedSeat && userName) {
//       const seatRef = doc(db, "seats", selectedSeat.id);
//       await updateDoc(seatRef, { takenBy: userName });
//       setSeats(seats.map(s => s.id === selectedSeat.id ? { ...s, takenBy: userName } : s));
//       setSelectedSeat(null);
//       setUserName("");
//     }
//   };

//   return (
//     <div className="app">
//       <h2>Chọn ghế</h2>
//       <div className="seat-grid">
//         {seats.map(seat => (
//           <div
//             key={seat.id}
//             className={`seat ${seat.type} ${seat.takenBy ? "taken" : ""}`}
//             onClick={() => !seat.takenBy && setSelectedSeat(seat)}
//           >
//             {seat.SeatId}
//           </div>
//         ))}
//       </div>

//       {selectedSeat && (
//         <div className="popup">
//           <h4>Đăng ký ghế: {selectedSeat.SeatId}</h4>
//           <input
//             type="text"
//             placeholder="Tên của bạn"
//             value={userName}
//             onChange={e => setUserName(e.target.value)}
//           />
//           <button onClick={handleBook}>Xác nhận</button>
//           <button onClick={() => setSelectedSeat(null)}>Hủy</button>
//         </div>
//       )}
//     </div>
//   );
// };
// export default SeatMap;



import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const SeatMap = ({ isAdmin }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [highlightedSeatId, setHighlightedSeatId] = useState(null);
//   const [userName, setUserName] = useState("");

  // Gọi API lấy dữ liệu ghế
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const snapshot = await getDocs(collection(db, "seats"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // ✅ Sắp xếp theo số thứ tự ghế
        // data.sort((a, b) => {
        //   const aNum = parseInt(a.id?.replace(/[^\d]/g, ''));
        //   const bNum = parseInt(b.id.replace(/[^\d]/g, ''));
        //   return aNum - bNum;
        // });
        setSeats(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ghế:", error);
      }
    };
    fetchSeats(); // Gọi hàm ngay khi component mount
  }, []);

  // Nhóm ghế thành từng hàng (A, B, C,...)
const groupedSeats = seats.reduce((acc, seat) => {
  const row = seat.SeatId?.[0]; // Lấy ký tự đầu tiên, ví dụ A, B, C
  if (!acc[row]) acc[row] = [];
  acc[row].push(seat);
  return acc;
}, {});

Object.keys(groupedSeats).forEach(row => {
  groupedSeats[row].sort((a, b) => {
    const aNum = parseInt(a.SeatId.slice(1));
    const bNum = parseInt(b.SeatId.slice(1));
    return aNum - bNum;
  });
});
  // Xử lý đặt ghế (cho user)
//   const handleBook = async () => {
//     if (selectedSeat && userName) {
//       try {
//         const seatRef = doc(db, "seats", selectedSeat.id);
//         await updateDoc(seatRef, { takenBy: userName });

//         // Cập nhật local state sau khi cập nhật Firebase
//         setSeats(seats.map(s =>
//           s.id === selectedSeat.id ? { ...s, takenBy: userName } : s
//         ));

//         setSelectedSeat(null);
//         setUserName("");
//       } catch (error) {
//         console.error("Lỗi khi cập nhật ghế:", error);
//       }
//     }
//   };

  // Xử lý khi admin click vào ghế
  const handleSeatClick = (seat) => {
    if (isAdmin) {
      setSelectedSeat(seat);
    } else if (!seat.takenBy) {
      setSelectedSeat(seat);
    }
  };

  return (
    <div className="app">
      <h2>Sơ đồ ghế</h2>
      <div className="seat-grid seat-line">
        {/* {seats.map(seat => (
        //   <div
        //     key={seat.id}
        //     className={`seat ${seat.takenBy ? "taken" : "available"}`}
        //     onClick={() => handleSeatClick(seat)}
        //   >
        //     {seat.SeatId || seat.id}
        //   </div>
        <div
            key={seat.id}
            className={`seat 
                ${seat.status === "booked" ? "booked" : ""} 
                ${seat.status === "available" ? "available" : ""} 
                ${seat.status === "checkedin" ? "checkedin" : ""} 
                ${seat.id === highlightedSeatId ? "highlighted" : ""}
            `}
            onClick={() => handleSeatClick(seat)}
            >
            {seat.SeatId || seat.id}
            </div>
        ))} */}

        <div className="seat-grid-container">
  {Object.keys(groupedSeats).map(row => (
    <div key={row} className="seat-row">
      {groupedSeats[row].map(seat => (
        <div
          key={seat.id}
          className={`seat
            ${seat.status === "booked" ? "booked" : ""} 
            ${seat.status === "available" ? "available" : ""} 
            ${seat.status === "checkedin" ? "checkedin" : ""} 
            ${seat.id === highlightedSeatId ? "highlighted" : ""}
          `}
          onClick={() => handleSeatClick(seat)}
        >
          {seat.SeatId}
        </div>
      ))}
    </div>
  ))}
</div>

      </div>

      {/* {selectedSeat && !selectedSeat.takenBy && !isAdmin && (
        <div className="popup">
          <h4>Đăng ký ghế: {selectedSeat.SeatId || selectedSeat.id}</h4>
          <input
            type="text"
            placeholder="Tên của bạn"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button onClick={handleBook}>Xác nhận</button>
          <button onClick={() => setSelectedSeat(null)}>Hủy</button>
        </div>
      )} */}

      {selectedSeat && isAdmin && (
        <div className="popup">
          <h4>Thông tin ghế: {selectedSeat.SeatId || selectedSeat.id}</h4>
          <p>Người đặt: {selectedSeat.takenBy || "Vị trí trống"}</p>
          <button onClick={() => alert("Chức năng Checkin hoặc Hủy sắp thêm")}>Thao tác</button>
          <button onClick={() => setSelectedSeat(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
