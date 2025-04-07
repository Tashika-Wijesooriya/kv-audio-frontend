import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { loadCart, formatDate } from "../../utils/cart";
import BookingItems from "../../assets/components/bookingItem";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());

  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 86400000));

  const [startingDate, setStartingDate] = useState(today);
  const [endingDate, setEndingDate] = useState(tomorrow);
  const [total, setTotal] = useState(0);

  const getBookingDays = () => {
    const start = new Date(startingDate);
    const end = new Date(endingDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff : 0;
  };

  const calculateTotal = () => {
    const cartInfo = loadCart();
    cartInfo.startingDate = startingDate;
    cartInfo.endingDate = endingDate;
    cartInfo.days = getBookingDays();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
      .then((res) => {
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching total. Please try again.");
      });
  };

  const reloadCart = () => {
    setCart(loadCart());
    calculateTotal();
  };

  const handleBookingCreation = () => {
    const updatedCart = loadCart();
    const bookingDetails = {
      ...updatedCart,
      startingDate,
      endingDate,
      days: getBookingDays(),
    };

    const token = localStorage.getItem("token");

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, bookingDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("cart");
        setCart(loadCart());
        toast.success("Booking created successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error creating booking. Please try again.");
      });
  };

  useEffect(() => {
    calculateTotal();
  }, [startingDate, endingDate]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {/* Booking Dates */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Select Booking Dates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={startingDate}
                min={today}
                onChange={(e) => setStartingDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={endingDate}
                min={startingDate}
                onChange={(e) => setEndingDate(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            Booking Duration:{" "}
            <span className="font-semibold text-blue-600">
              {getBookingDays()} {getBookingDays() === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        {cart.orderedItems.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            {cart.orderedItems.map((item) => (
              <BookingItems
                key={item.key}
                itemKey={item.key}
                qty={item.qty}
                refresh={reloadCart}
              />
            ))}

            {/* Checkout Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  Rs. {total.toFixed(2).toLocaleString("en-IN")}
                </span>
              </div>
              <button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                onClick={handleBookingCreation}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
