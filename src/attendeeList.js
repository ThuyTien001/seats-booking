import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "./firebase";

const  AttendeeList = () =>{
    const [seats, setSeats]= useState([]);
    useEffect(() => {
        const fetchSeats = async()=>{
            try{
                const snapshot = await getDocs(collection(db, "seats"));
                const data = snapshot.docs.map((doc) => ({
                    id: doc.SeatId,
                    ...doc.data(),
                }));

                //Lọc các ghế đã được đặt
                const bookedSeats = data.filter(seat => seat.user)
                setSeats(bookedSeats);
            }catch(error){
                console.error('Lỗi khi lấy danh sách đại biểu: ', error);
            }
        };
        fetchSeats();
    }, []);

    return(
        // <div className="p-4">
        //     <h2 className="text-xl font-bold mb-4">DANH SÁCH ĐẠI BIỂU ĐÃ ĐĂNG KÝ</h2>
        //     <div className="overflow-x-auto" >
        //         <table className="min-w-full bg-white border border-gray-300">
        //             <thead>
        //                 <tr className="bg-gray-100 text-left">
        //                 <th className="py-2 px-4 border">#</th>
        //                 <th className="py-2 px-4 border">Tên</th>
        //                 <th className="py-2 px-4 border">Email</th>
        //                 {/* <th className="py-2 px-4 border">SĐT</th> */}
        //                 <th className="py-2 px-4 border">Ghế</th>
        //                 <th className="py-2 px-4 border">Trạng thái</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {seats.map((seat, index) => (
        //                     <tr key={seat.SeatId} className="hover:bg-gray-50">
        //                         <td className="py-2 px-4 border">{index + 1}</td>
        //                         <td className="py-2 px-4 border">{seat.user?.name || "—"}</td>
        //                         <td className="py-2 px-4 border">{seat.user?.email || "—"}</td>
        //                         {/* <td className="py-2 px-4 border">{seat.user?.phone || "—"}</td> */}
        //                         <td className="py-2 px-4 border">{seat.SeatId || seat.SeatId}</td>
        //                         <td className="py-2 px-4 border">
        //                         {seat.status === "checkedin"
        //                                         ? "✅ Đã check-in"
        //                                         : seat.status === "booked"
        //                                         ? "🟡 Đã đặt"
        //                                         : seat.status === "available"
        //                                         ? "⚪ Trống"
        //                                         : seat.status || "?"}
        //                                     </td>
        //                                 </tr>
        //                 ))}

        //                 {seats.length === 0 && (
        //                 <tr>
        //                     <td colSpan="6" className="text-center py-4 text-gray-500">
        //                     Chưa có đại biểu nào đăng ký.
        //                     </td>
        //                 </tr>
        //                 )}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>

        <div className="p-4 max-w-4xl mx-auto ">
            <h2 className="text-2xl font-bold mb-6 text-center">DANH SÁCH ĐẠI BIỂU ĐÃ ĐĂNG KÝ</h2>
            <div className="overflow-x-auto">
                <table className="hover:table-fixed min-w-full table-auto border border-gray-300 shadow-lg rounded-md overflow-hidden">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <th className="py-3 px-4 border">STT</th>
                    <th className="py-3 px-4 border">Tên</th>
                    <th className="py-3 px-4 border">Email</th>
                    <th className="py-3 px-4 border">Ghế</th>
                    <th className="py-3 px-4 border">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {seats.map((seat, index) => (
                    <tr key={seat.SeatId} className="hover:bg-gray-50 text-sm">
                        <td className="py-2 px-4 border">{index + 1}</td>
                        <td className="py-2 px-4 border">{seat.user?.name || "—"}</td>
                        <td className="py-2 px-4 border">{seat.user?.email || "—"}</td>
                        <td className="py-2 px-4 border">{seat.SeatId || "—"}</td>
                        <td className="py-2 px-4 border">
                        {seat.status === "checkedin"
                            ? "✅ Đã check-in"
                            : seat.status === "booked"
                            ? "🟡 Đã đặt"
                            : seat.status === "available"
                            ? "⚪ Trống"
                            : seat.status || "?"}
                        </td>
                    </tr>
                    ))}

                    {seats.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">
                        Chưa có đại biểu nào đăng ký.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
    )
}
export default AttendeeList;