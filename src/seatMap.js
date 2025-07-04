import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useSearchParams } from "react-router-dom";

const SeatMap = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [highlightedSeatId, setHighlightedSeatId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const snapshot = await getDocs(collection(db, "seats"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSeats(data);

        const seatParam = searchParams.get("seat");
        if (seatParam) {
          setHighlightedSeatId(seatParam);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ghế:", error);
      }
    };

    fetchSeats();

    // ✅ Kiểm tra quyền admin từ localStorage
    const stored = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(stored);
    // console.log("Admin mode:", stored);
  }, [searchParams]);

  const groupedSeats = seats.reduce((acc, seat) => {
    const row = seat.SeatId?.[0];
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  Object.keys(groupedSeats).forEach((row) => {
    groupedSeats[row].sort((a, b) => {
      const aNum = parseInt(a.SeatId.slice(1));
      const bNum = parseInt(b.SeatId.slice(1));
      return aNum - bNum;
    });
  });

  const handleSeatClick = (seat) => {
    if (isAdmin || !seat.takenBy) {
      setSelectedSeat(seat);
    }
  };

  return (
    <div className="app">
      <h2>Sơ đồ ghế</h2>
      <div className="w-full overflow-x-auto seat-grid seat-line">
        <div className="inline-block seat-grid-container min-w-[700px] grid grid-cols-11 gap-2 p-4 ">
          {Object.keys(groupedSeats).map((row) => (
            <div key={row} className="flex overflow-x-scroll justify-center mb-2 seat-row">
              {groupedSeats[row].map((seat) => (
                <div
                  key={seat.id}
                  className={` w-10 h-10 text-sm font-bold rounded-md m-1 text-white text-center leading-10 shadow seat
                    ${seat.status === "booked" ? "booked" : ""} 
                    ${seat.status === "available" ? "available" : ""} 
                    ${seat.status === "checkedin" ? "checkedin" : ""} 
                    ${seat.id === highlightedSeatId ? "highlighted" : ""}
                  `}
                  onClick={() => {
                    console.log("Clicked:", seat.SeatId);
                    handleSeatClick(seat);
                  }}
                >
                  {seat.SeatId}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {selectedSeat && isAdmin && (
        <div className=" popup bg-white border p-4 rounded shadow-md">
          <h4>Thông tin ghế: {selectedSeat.SeatId || selectedSeat.id}</h4>
          <p>
            Người đặt: 
            {selectedSeat?.user
              ? `${selectedSeat.user.name} (${selectedSeat.user.email})`
              : "Vị trí trống"}
          </p>
          <p>
            Trạng thái: {selectedSeat?.status?.stringValue || selectedSeat?.status || "unknown"}
          </p>

          <div className="flex gap-2 mt-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              // onClick={async () => {
              //   try {
              //     const seatRef = doc(db, "seats", selectedSeat.id);
              //     await updateDoc(seatRef, {
              //       status: "checkedin",
              //     });
              //     setSeats((prev) =>
              //       prev.map((s) =>
              //         s.id === selectedSeat.id
              //           ? { ...s, status: "checkedin" }
              //           : s
              //       )
              //     );
              //     alert("Đã check-in!");
              //     setSelectedSeat(null);
              //   } catch (error) {
              //     console.error("Lỗi khi check-in:", error);
              //     alert("Không thể check-in ghế.");
              //   }
              // }}

              onClick={async () => {
                try {
                  const seatRef = doc(db, "seats", selectedSeat.id);
                  await updateDoc(seatRef, {
                    status: "checkedin"
                  });

                  // Cập nhật lại dữ liệu ghế trên giao diện
                  setSeats(prevSeats =>
                    prevSeats.map(seat =>
                      seat.id === selectedSeat.id
                        ? { ...seat, status: "checkedin" }
                        : seat
                    )
                  );

                  alert("Đã check-in thành công!");
                  setSelectedSeat(null);
                } catch (error) {
                  console.error("Check-in thất bại:", error);
                  alert("Không thể check-in ghế.");
                }
              }}
            >
              Checkin
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                try {
                  const seatRef = doc(db, "seats", selectedSeat.id);
                  await updateDoc(seatRef, {
                    status: "available",
                    user: null,
                    takenBy: null,
                  });
                  setSeats((prev) =>
                    prev.map((s) =>
                      s.id === selectedSeat.id
                        ? {
                            ...s,
                            status: "available",
                            user: null,
                            takenBy: null,
                          }
                        : s
                    )
                  );
                  alert("Đã hủy vé!");
                  setSelectedSeat(null);
                } catch (error) {
                  console.error("Lỗi khi hủy vé:", error);
                  alert("Không thể hủy vé.");
                }
              }}
            >
              Hủy vé
            </button>

            <button
              className="bg-gray-300 text-black px-3 py-1 rounded"
              onClick={() => setSelectedSeat(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
