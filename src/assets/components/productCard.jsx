import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addToCart } from "../../utils/cart";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ item }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 max-w-xs mx-auto flex flex-col h-full">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {item.description}
        </p>

        {/* Price and Availability */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              Rs: {item.price?.toLocaleString("en-IN")}
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.availability
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-6">
          <div className="text-gray-500">
            <span className="font-medium">Category:</span> {item.category}
          </div>
          <div className="text-gray-500">
            <span className="font-medium">Size:</span> {item.dimension}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-3">
          <Link
            to={`/product/${item.key}`}
            className="flex-grow bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg 
                     text-center font-medium transition-colors duration-200 shadow-sm"
          >
            View Details
          </Link>

          <button
            onClick={() => {
              if (item.availability) {
                addToCart(item.key, 1);
                toast.success(`${item.name} added to cart!`, {
                  icon: "🛒",
                });
              }
            }}
            disabled={!item.availability}
            className={`p-3 rounded-lg flex items-center justify-center 
              ${
                item.availability
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                  : "text-gray-400 bg-gray-100 cursor-not-allowed"
              } transition-colors duration-200`}
            aria-label={`Add ${item.name} to cart`}
          >
            <FaShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
