import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[400px] h-full bg-gray-200">
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <BsGraphDown />
          Dashboard
        </button>
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <FaRegBookmark />
          Booking
        </button>
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <MdOutlineSpeakerGroup /> Items
        </button>
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <FaRegUser /> Users
        </button>
      </div>
      <div className="w-full bg-red-200"></div>
    </div>
  );
}
