import axios from "axios";
import { useEffect, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const bachendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(bachendUrl + "/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setItems(res.data);
          setItemsLoaded(true);
        })
        .catch((err) => console.error(err));
    }
  }, [itemsLoaded]);

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = localStorage.getItem("token");
      axios
        .delete(bachendUrl + `/api/products/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setItems((prevItems) => prevItems.filter((item) => item.key !== key));
          toast.success("Item deleted successfully");
        })
        .catch(() => toast.error("Failed to delete item"));
    }
  };

  return (
    <div className="w-full h-full p-6 bg-gray-100 flex flex-col items-center">
      {!itemsLoaded && (
        <div className="border-4 border-indigo-300 border-t-transparent rounded-full w-[50px] h-[50px] animate-spin mb-4"></div>
      )}

      {itemsLoaded && (
        <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Key</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Dimensions</th>
                <th className="p-3 text-left">Availability</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.key} className="border-b hover:bg-gray-100">
                  <td className="p-3">{product.key}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">Rs. {product.price}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.dimension}</td>
                  <td className="p-3">
                    <span
                      className={
                        product.availability ? "text-green-600" : "text-red-600"
                      }
                    >
                      {product.availability ? "Available" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-3 text-center flex gap-4 justify-center">
                    <Link
                      to={`/admin/items/edit`}
                      state={product}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEdit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.key)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/admin/items/add">
        <LuCirclePlus className="text-[50px] fixed right-6 bottom-6 text-blue-500 hover:text-blue-700 cursor-pointer shadow-lg" />
      </Link>
    </div>
  );
}
