import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full h-[100px]  bg-accent shadow-xl flex justify-center items-center relative">
      <img
        src="/logo.png"
        alt="logo"
        className="w-[100px] h-[100px] object-cover absolute  left-1"
      />

      <Link to="/" className="text-[25px] font-bold m-1 text-white">
        Home
      </Link>
      <Link to="/contact" className="text-[25px] font-bold m-1 text-white">
        contact
      </Link>
      <Link to="/gallery" className="text-[25px] font-bold m-1 text-white">
        Gallery
      </Link>
      <Link to="/items" className="text-[25px] font-bold m-1 text-white">
        Items
      </Link>

      <Link to="/booking" className="text-[25px] font-bold m-1 text-white absolute right-3">
        <FaShoppingCart />
      </Link>
    </header>
  );
}
