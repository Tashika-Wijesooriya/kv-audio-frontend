import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Link to="/admin/items/add">
        <LuCirclePlus className="text-[50px] absolute right-4 bottom-4 hover:text-blue-700 cursor-pointer" />
      </Link>
    </div>
  );
}
