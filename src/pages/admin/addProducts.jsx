import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const navigate = useNavigate();

  // Function to handle adding product (triggered by button)
  async function handleAddProduct() {
    // Check for token
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:3600/api/products",
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimension: productDimension,
          description: productDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(result.data.message);
      clearFields(); // Clear fields after successful product addition
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  // Function to clear input fields after success
  const clearFields = () => {
    setProductKey("");
    setProductName("");
    setProductPrice("");
    setProductCategory("audio");
    setProductDimension("");
    setProductDescription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Add New Product
        </h1>

        {/* Product Key */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Key
          </label>
          <input
            type="text"
            placeholder="PRD-12345"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 mb-4"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 mb-4"
          />
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (Rs: )
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 mb-4"
            >
              <option value="audio">Audio</option>
              <option value="lights">Lights</option>
            </select>
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensions
          </label>
          <input
            type="text"
            placeholder="e.g., 10x20x30 cm"
            value={productDimension}
            onChange={(e) => setProductDimension(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 mb-4"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 h-32 mb-4"
          />
        </div>

        {/* Buttons to add or cancel */}
        <div className="flex space-x-4 mt-6">
          <button
            type="button"
            onClick={handleAddProduct}
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/admin/items");
            }}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
