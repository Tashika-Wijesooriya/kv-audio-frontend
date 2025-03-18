import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;

  const [productKey, setProductKey] = useState(product?.key || "");
  const [productName, setProductName] = useState(product?.name || "");
  const [productPrice, setProductPrice] = useState(product?.price || "");
  const [productCategory, setProductCategory] = useState(
    product?.category || "audio"
  );
  const [productDimension, setProductDimension] = useState(
    product?.dimension || ""
  );
  const [productDescription, setProductDescription] = useState(
    product?.description || ""
  );

  useEffect(() => {
    if (!product) {
      toast.error("No product data found.");
      navigate("/admin/items");
    }
  }, [product, navigate]);

  async function handleUpdateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3600/api/products/${productKey}`,
        {
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
      toast.success("Product updated successfully");
      navigate("/admin/items");
    } catch (error) {
      toast.error(error.response?.data.error || "Failed to update product");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden p-8 border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Update Product
        </h1>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Key
          </label>
          <input
            type="text"
            value={productKey}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (Rs: )
          </label>
          <input
            type="number"
            placeholder="Price (Rs)"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="audio">Audio</option>
            <option value="lights">Lights</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions
          </label>
          <input
            type="text"
            placeholder="e.g., 10x20x30 cm"
            value={productDimension}
            onChange={(e) => setProductDimension(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
          />
        </div>

        <button
          onClick={handleUpdateProduct}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
