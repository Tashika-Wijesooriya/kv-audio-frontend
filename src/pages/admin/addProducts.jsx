import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUploaded from "../../utils/mediaUpload";

export default function AddProduct() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState([]);

  const navigate = useNavigate();
  const bachendUrl = import.meta.env.VITE_BACKEND_URL;

  async function handleAddProduct() {
    console.log(productImage);
    const promises = [];
    for (let i = 0; i < productImage.length; i++) {
      console.log(productImage[i]);
      const promise = mediaUploaded(productImage[i]);
      promises.push(promise);

      // if (i == 5) {
      //   toast.error("You can only upload 5 images at a time")
      //   break;
      // }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    try {
      // promise.all(promises).then((results) => {
      //   console.log(results)
      // }).catch((error) => {
      //   console.log(error)
      // })

      const imageUrls = await Promise.all(promises);

      const result = await axios.post(
        bachendUrl + "/api/products",
        {
          key: productKey,
          name: productName,
          price: parseFloat(productPrice),
          category: productCategory,
          dimension: productDimension,
          description: productDescription,
          image: imageUrls,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(result.data.message);
      clearFields();
      navigate("/admin/items"); // Navigate only after success
    } catch (error) {
      toast.error(
        error.response?.data.error || "An unexpected error occurred."
      );
    }
  }

  const clearFields = () => {
    setProductKey("");
    setProductName("");
    setProductPrice("");
    setProductCategory("audio");
    setProductDimension("");
    setProductDescription("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden p-8 border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Add New Product
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Key
            </label>
            <input
              type="text"
              placeholder="PRD-12345"
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (Rs: )
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="audio">Audio</option>
                <option value="lights">Lights</option>
              </select>
            </div>
          </div>

          <div>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Images
            </label>
            <input
              type="file"
              multiple
             // onChange={(e) => setProductImage(e.target.files)}
              onChange={(e) => setProductImage(Array.from(e.target.files))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleAddProduct}
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Add Product
          </button>
          <button
            onClick={() => navigate("/admin/items")}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
