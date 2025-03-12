import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Route, Routes, Link } from "react-router-dom";
export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[400px] h-full bg-gray-200">
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <BsGraphDown />
          Dashboard
        </button>
        <Link
          to="/admin/booking"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegBookmark />
          Booking
        </Link>
        <Link
          to="/admin/items"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <MdOutlineSpeakerGroup /> Items
        </Link>
        <Link
          to="/admin/users"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegUser /> Users
        </Link>
      </div>
      <div className="w-[calc(100vw-400px)] bg-red-200">
        <Routes path="/*">
          <Route path="/booking" element={<h1>Booking</h1>}/>
          <Route path="items" element={<h1>Items</h1>} />
          <Route path="users" element={<h1>Users</h1>} />
        </Routes>
      </div>
    </div>
  );
}
