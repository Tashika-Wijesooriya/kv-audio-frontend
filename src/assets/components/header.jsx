import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPanel from "./mobileNavPanel"; // adjust the path if needed

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0); // Dynamic cart item count

  const token = localStorage.getItem("token");
  return (
    <header className="w-full h-[80px] bg-accent shadow-xl flex justify-center items-center relative px-4">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="logo"
        className="w-[70px] h-[70px] object-cover absolute left-4"
      />

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className="text-[25px] font-bold text-white">
          Home
        </Link>
        <Link to="/contact" className="text-[25px] font-bold text-white">
          Contact
        </Link>
        <Link to="/gallery" className="text-[25px] font-bold text-white">
          Gallery
        </Link>
        <Link to="/items" className="text-[25px] font-bold text-white">
          Items
        </Link>
      </div>

      {/* Desktop Cart Icon */}
      <div className="hidden md:flex items-center absolute right-20 text-white text-xl">
        <Link to="/booking" className="relative">
          <FaShoppingCart />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
              {cartItems}
            </span>
          )}
        </Link>
      </div><br></br><br></br>
      {token && (
        <div
          className="hidden md:flex items-center absolute right-5 text-white text-xl"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          {/* Logout Icon */}
          Logout
        </div>
      )}
      {/* Hamburger Icon - Mobile Only */}
      <GiHamburgerMenu
        className="text-[24px] text-white absolute right-5 md:hidden"
        onClick={() => setNavbarOpen(!navbarOpen)}
      />

      {/* Mobile Nav Panel */}
      <MobileNavPanel navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
    </header>
  );
}
