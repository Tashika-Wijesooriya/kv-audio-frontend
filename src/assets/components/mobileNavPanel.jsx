import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaPhone, FaShoppingCart } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { MdLibraryMusic } from "react-icons/md";

export default function MobileNavPanel({ navbarOpen, setNavbarOpen }) {
  if (!navbarOpen) return null;

  return (
    <div className="absolute top-[80px] right-0 w-[30%] sm:w-[30%] bg-accent  z-50 shadow-xl px-8 py-8 flex flex-col items-center animate-slideDown rounded-b-3xl backdrop-blur-lg">
      {/* Close Button */}
      <div className="w-full flex justify-end mb-6">
        <IoIosCloseCircle
          className="text-white text-4xl cursor-pointer hover:text-red-400 transition-all duration-300"
          onClick={() => setNavbarOpen(false)}
        />
      </div>

      {/* Navigation Links */}
      <nav className="w-full flex flex-col space-y-6 items-center">
        <Link
          to="/"
          onClick={() => setNavbarOpen(false)}
          className="flex items-center gap-4 text-white text-lg font-semibold hover:text-primary transition-all duration-300"
        >
          <IoMdHome className="text-3xl" />
          
        </Link>

        <Link
          to="/contact"
          onClick={() => setNavbarOpen(false)}
          className="flex items-center gap-4 text-white text-lg font-semibold hover:text-primary transition-all duration-300"
        >
          <FaPhone className="text-3xl" />
          
        </Link>

        <Link
          to="/gallery"
          onClick={() => setNavbarOpen(false)}
          className="flex items-center gap-4 text-white text-lg font-semibold hover:text-primary transition-all duration-300"
        >
          <GrGallery className="text-3xl" />
        
        </Link>

        <Link
          to="/items"
          onClick={() => setNavbarOpen(false)}
          className="flex items-center gap-4 text-white text-lg font-semibold hover:text-primary transition-all duration-300"
        >
          <MdLibraryMusic className="text-3xl" />
        
        </Link>

        <Link
          to="/booking"
          onClick={() => setNavbarOpen(false)}
          className="flex items-center gap-4 text-white text-lg font-semibold hover:text-primary transition-all duration-300"
        >
          <FaShoppingCart className="text-3xl" />
          
        </Link>
      </nav>
    </div>
  );
}
