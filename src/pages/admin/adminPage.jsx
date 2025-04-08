import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeakerGroup } from "react-icons/md";
import { Route, Routes, Link } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddProducts from "./addProducts";
import UpdateProduct from "./updateProductPage";
import AdminUsersPage from "./adminUsers";
import AdminBookingPage from "./adminBookingPage";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
  const [userValidation, setUserValidation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized to access this page.");
      window.location.href = "/";
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.role === "admin") {
          setUserValidation(true);
        } else {
          alert("You are not authorized to access this page.");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error("Authorization failed:", err);
        alert("An error occurred. Try again later.");
        window.location.href = "/";
      });
  }, []);

 return (
   <div className="w-full h-screen flex bg-gray-50">
     {/* Sidebar */}
     <div className="w-72 h-full bg-white shadow-lg p-6 flex flex-col gap-6">
       <h1 className="text-2xl font-bold text-center text-blue-600 flex items-center justify-center gap-2">
         <BsGraphDown className="text-xl" />
         Dashboard
       </h1>

       <nav className="flex flex-col gap-5">
         <Link
           to="/admin/booking"
           className="flex items-center gap-4 p-3 rounded-lg text-gray-700 hover:bg-blue-200 transition duration-300 ease-in-out transform hover:scale-105"
         >
           <FaRegBookmark className="text-xl" />
           Booking
         </Link>
         <Link
           to="/admin/items"
           className="flex items-center gap-4 p-3 rounded-lg text-gray-700 hover:bg-blue-200 transition duration-300 ease-in-out transform hover:scale-105"
         >
           <MdOutlineSpeakerGroup className="text-xl" />
           Items
         </Link>
         <Link
           to="/admin/users"
           className="flex items-center gap-4 p-3 rounded-lg text-gray-700 hover:bg-blue-200 transition duration-300 ease-in-out transform hover:scale-105"
         >
           <FaRegUser className="text-xl" />
           Users
         </Link>
       </nav>
     </div>

     {/* Main Content */}
     <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
       {userValidation && (
         <Routes>
           <Route
             path="/dashboard"
             element={
               <h1 className="text-3xl font-semibold text-gray-800">
                 Dashboard
               </h1>
             }
           />
           <Route path="/booking" element={<AdminBookingPage />} />
           <Route path="/items" element={<AdminItemsPage />} />
           <Route path="/items/add" element={<AddProducts />} />
           <Route path="/items/edit" element={<UpdateProduct />} />
           <Route path="/users" element={<AdminUsersPage />} />
         </Routes>
       )}
     </div>
   </div>
 );
}
