import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { addToCart, removeFromCart } from "../../utils/cart";
import { FaSpinner, FaTrashAlt } from "react-icons/fa";

export default function BookingItems(props) {
  const { itemKey, qty, refresh } = props;
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setStatus("error");
          removeFromCart(itemKey);
          refresh();
        });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-center">
        <FaSpinner className="animate-spin text-blue-500 text-2xl" />
      </div>
    );
  }

  if (status === "error" || !item) {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-4 text-center text-red-500">
        This item is unavailable and was removed from your cart.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full sm:w-1/2">
        <img
          src={item.image?.[0] || "/default-product.jpg"}
          alt={item.name || "Product"}
          className="w-20 h-20 object-cover rounded-lg border"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-500">
            {item.category || "Uncategorized"}
          </p>
          <p className="text-sm text-gray-900">
            Rs.{" "}
            {item.price?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* Quantity & Price */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-8 w-full sm:w-auto">
        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow-inner text-sm text-gray-700">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200"
            onClick={() => {
              if (qty > 1) {
                addToCart(itemKey, -1);
              } else {
                removeFromCart(itemKey);
              }
              refresh();
            }}
            aria-label="Decrease quantity"
          >
            –
          </button>

          <span className="px-3 font-medium text-gray-800">{qty}</span>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200"
            onClick={() => {
              addToCart(itemKey, 1);
              refresh();
            }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="text-sm text-green-600 font-semibold">
          Rs.{" "}
          {(item.price * qty).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </div>

        <button
          className="flex items-center text-sm text-red-500 hover:text-red-600 mt-2 sm:mt-0"
          onClick={() => {
            removeFromCart(itemKey);
            refresh();
            toast.success(`${item.name} removed from cart.`);
          }}
        >
          <FaTrashAlt className="w-4 h-4 mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
}
