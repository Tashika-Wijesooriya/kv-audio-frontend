import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import mediaUploaded from "../../utils/mediaUpload";

import {
  FiUploadCloud,
  FiDollarSign,
  FiBox,
  FiX,
  FiImage,
} from "react-icons/fi";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [productKey, setProductKey] = useState(product?.key || "");
  const [productName, setProductName] = useState(product?.name || "");
  const [productPrice, setProductPrice] = useState(product?.price || "");
  const [productCategory, setProductCategory] = useState(product?.category || "audio");
  const [productDimension, setProductDimension] = useState(product?.dimension || "");
  const [productDescription, setProductDescription] = useState(product?.description || "");
  const [productImage, setProductImage] = useState([]);

  useEffect(() => {
    if (!product) {
      toast.error("No product data found.");
      navigate("/admin/items");
    }
  }, [product, navigate]);

  async function handleUpdateProduct() {
    let updatingImages = product?.image || []; // Default to the existing images if no new ones are uploaded

    if (productImage.length > 0) {
      const promises = [];
      for (let i = 0; i < productImage.length; i++) {
        const promise = mediaUploaded(productImage[i]);
        promises.push(promise);
      }

      try {
        updatingImages = await Promise.all(promises);
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    try {
      await axios.put(
        `${backendUrl}/api/products/${productKey}`,
        {
          name: productName,
          price: productPrice,
          category: productCategory,
          dimension: productDimension,
          description: productDescription,
          image: updatingImages,
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

  const removeImage = (indexToRemove) => {
    setProductImage((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Update Product
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Modify the details below to update this product listing
            </p>
          </div>

          <div className="space-y-6 divide-y divide-gray-200">
            {/* Product Information Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Key
                  </label>
                  <input
                    type="text"
                    value={productKey}
                    readOnly
                    className="block w-full px-4 py-3 border border-blue-500 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="block w-full px-4 py-3 border border-blue-500 rounded-lg focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (Rs) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="block w-full px-4 py-3 border border-blue-500 rounded-lg focus:ring-1 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="block w-full px-4 py-3 border border-blue-500 rounded-lg focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="audio">Audio Equipment</option>
                      <option value="lights">Lighting Systems</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiBox className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  value={productDimension}
                  onChange={(e) => setProductDimension(e.target.value)}
                  className="block w-full px-4 py-3 border border-blue-500 rounded-lg focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., 10x20x30 cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows="4"
                  className="block w-full px-4 py-3 border border-blue-500 rounded-lg focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Image Management Section */}
            <div className="pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Product Images (Max 5)
              </label>

              {/* Existing Images */}
              {product?.image?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Current Images
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {product.image.map((imgUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imgUrl}
                          alt={`Product preview ${index}`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Image Upload */}
              <div className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 transition hover:border-blue-500">
                <FiUploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Drag and drop new images here, or{" "}
                    <span className="text-blue-600 font-medium">
                      click to browse
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG up to 5MB
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setProductImage(Array.from(e.target.files))}
                  className="hidden"
                  id="file-upload-update"
                />
                <label
                  htmlFor="file-upload-update"
                  className="cursor-pointer mt-4 bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Add New Images
                </label>
              </div>

              {/* New Image Previews */}
              {productImage.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {productImage.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-4">
            <button
              onClick={() => navigate("/admin/items")}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProduct}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
