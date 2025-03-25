import React from "react";
import "./productCard.css";
// Import custom CSS file for styling
import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all max-w-xs mx-auto">
      {/* Product Image */}
      <img
        src={item.image[0]} // Display the first image from the image array
        alt={item.name}
        className="w-full h-32 object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold text-gray-900 mt-4">{item.name}</h2>
      <p className="text-gray-700 text-sm mt-2">{item.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="font-bold text-sm text-blue-600">Rs:{item.price}</p>
        <span
          className={`${
            item.availability
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } text-xs font-semibold px-2 py-1 rounded-full`}
        >
          {item.availability ? "Available" : "Out of stock"}
        </span>
      </div>
      <p className="text-gray-500 text-xs mt-2">Category: {item.category}</p>
      <p className="text-gray-500 text-xs">Dimensions: {item.dimension}</p>

      {/* View Details Button */}
      <div className="mt-4">
        <Link to={"/Product/" + item.key} 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => alert(`Viewing details for ${item.name}`)} // Replace with actual navigation or modal logic
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
