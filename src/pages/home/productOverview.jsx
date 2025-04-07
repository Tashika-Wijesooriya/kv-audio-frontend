import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImagesSlider from "../../assets/components/imagesSlider";
import { toast } from "react-hot-toast";
import { addToCart } from "../../utils/cart.jsx";

export default function ProductOverview() {
  const { key } = useParams();
  const [loadingStatus, setLoadingStatus] = useState("Loading...");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingStatus("Loaded");
      })
      .catch(() => {
        setLoadingStatus("Error loading product details");
      });
  }, [key]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loadingStatus === "Loading..." ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : loadingStatus === "Error loading product details" ? (
        <p className="text-red-500 text-center text-lg font-semibold">
          {loadingStatus}
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg p-6">
          {/* Left Section - Product Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow-md">
              <ImagesSlider images={product.image} />
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="md:w-1/2 flex flex-col justify-between space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Description:</span>{" "}
              {product.description}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Dimensions:</span>{" "}
              {product.dimension}
            </p>
            <p className="text-2xl font-bold text-blue-600">
              Rs: {product.price}
            </p>

            {/* Add to Cart Button */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              onClick={() => {
                addToCart(product.key, 1); // Add product to cart
                toast.success(`${product.name} added to cart!`, {
                  icon: '🛒'
                }); 
                
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
