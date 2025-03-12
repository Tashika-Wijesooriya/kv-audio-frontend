import { Routes, Route } from "react-router-dom";
import Header from "../../assets/components/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Item from "./item";
import ErrorNotFound from "./error";

export default function HomePage()
{
    return (
      <>
        <Header />
        <div className="h-[calc(100vh-100px)]  w-full">
          <Routes path="/*">
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/items" element={<Item />} />
            <Route path="/*" element={<ErrorNotFound />} />
          </Routes>
        </div>
      </>
    );
}