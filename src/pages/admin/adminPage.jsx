import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { Route, Routes, Link } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddProducts from "./addProducts";
import UpdateProduct from "./updateProductPage";
import AdminUsersPage from "./adminUsers";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 h-full bg-white shadow-md p-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-center text-blue-600">
          Admin Panel
        </h1>
        <nav className="flex flex-col gap-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 transition"
          >
            <BsGraphDown className="text-lg" /> Dashboard
          </Link>
          <Link
            to="/admin/booking"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 transition"
          >
            <FaRegBookmark className="text-lg" /> Booking
          </Link>
          <Link
            to="/admin/items"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 transition"
          >
            <MdOutlineSpeakerGroup className="text-lg" /> Items
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-blue-100 transition"
          >
            <FaRegUser className="text-lg" /> Users
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route
            path="/dashboard"
            element={<h1 className="text-2xl font-semibold">Dashboard</h1>}
          />
          <Route
            path="/booking"
            element={<h1 className="text-2xl font-semibold">Booking</h1>}
          />
          <Route path="/items" element={<AdminItemsPage />} />
          <Route path="/items/add" element={<AddProducts />} />
          <Route path="/items/edit" element={<UpdateProduct />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route
            path="/users"
            element={<h1 className="text-2xl font-semibold">Users</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}
