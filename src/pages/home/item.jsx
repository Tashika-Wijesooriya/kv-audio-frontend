import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProductCard from "../../assets/components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [state, setState] = useState("loading");

  // Fetching product data on component mount
  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          setProducts(res.data);
          setState("loaded");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setError("Failed to fetch products");
          setState("error");
        });
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Explore Our products
      </h1>

      {state === "error" && (
        <div className="text-center text-red-600 font-semibold mb-6">
          {error}
        </div>
      )}

      {state === "loading" ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="container mx-auto">
          {products.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.key} item={product} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl text-gray-500 font-medium">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
