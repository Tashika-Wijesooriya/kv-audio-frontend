import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css"; // Import custom CSS file for styling

export default function ProductCard({ item }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all max-w-xs mx-auto">
      {/* Product Image */}
      <img
        src={item.image[0]} // Display the first image from the image array
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Product Name */}
      <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>

      {/* Product Description */}
      <p className="text-gray-700 text-sm mt-2">{item.description}</p>

      {/* Price and Availability */}
      <div className="flex justify-between items-center mt-4">
        <p className="font-bold text-lg text-blue-600">Rs:{item.price}</p>
        <span
          className={`${
            item.availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } text-xs font-semibold px-3 py-1 rounded-full uppercase`}
        >
          {item.availability ? "Available" : "Out of stock"}
        </span>
      </div>

      {/* Category and Dimensions */}
      <p className="text-gray-500 text-xs mt-2">Category: {item.category}</p>
      <p className="text-gray-500 text-xs">Dimensions: {item.dimension}</p>

      {/* View Details Button */}
      <div className="mt-6">
        <Link
          to={"/Product/" + item.key}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
