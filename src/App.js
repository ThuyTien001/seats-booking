import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from './firebase';
import './App.css';

function App() {
 const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchSeats = async () => {
      const snapshot = await getDocs(collection(db, "seats"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSeats(data);
    };
    fetchSeats();
  }, []);

  const handleBook = async () => {
    if (selectedSeat && userName) {
      const seatRef = doc(db, "seats", selectedSeat.id);
      await updateDoc(seatRef, { takenBy: userName });
      setSeats(seats.map(s => s.id === selectedSeat.id ? { ...s, takenBy: userName } : s));
      setSelectedSeat(null);
      setUserName("");
    }
  };

  return (
    <div className="app">
      <h2>Chọn ghế</h2>
      <div className="seat-grid">
        {seats.map(seat => (
          <div
            key={seat.id}
            className={`seat ${seat.type} ${seat.takenBy ? "taken" : ""}`}
            onClick={() => !seat.takenBy && setSelectedSeat(seat)}
          >
            {seat.code}
          </div>
        ))}
      </div>

      {selectedSeat && (
        <div className="popup">
          <h4>Đăng ký ghế: {selectedSeat.code}</h4>
          <input
            type="text"
            placeholder="Tên của bạn"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button onClick={handleBook}>Xác nhận</button>
          <button onClick={() => setSelectedSeat(null)}>Hủy</button>
        </div>
      )}
    </div>
  );
}

export default App;
