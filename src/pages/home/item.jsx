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
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      {state === "error" && (
        <div className="text-center text-red-600 mb-4">{error}</div>
      )}

      {state === "loading" ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.key} item={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </ul>
      )}
    </div>
  );
}
