import "./App.css";
import ProductCard from "./assets/components/ProductCard";

function App() {
  return (
    <>
      <ProductCard
        photoUrl="https://i.pinimg.com/736x/de/82/09/de8209bcd84518226d28b7ed0a31d1e1.jpg"
        name="Dram"
        price="800"
        description="A high-quality product with great value."
      />
      <br />
      <ProductCard
        photoUrl="https://i.pinimg.com/736x/c6/5b/6a/c65b6ade69a4cae103c07b69449a5549.jpg"
        name="Dram Premium"
        price="1200"
        description="An enhanced version of the original product."
      />
      <br />
      <ProductCard
        photoUrl="https://i.pinimg.com/736x/4d/3c/2a/4d3c2a4b3e2f5abbb247ea8fae0a046a.jpg"
        name="Dram Exclusive"
        price="1500"
        description="Top-tier quality for the best experience."
      />
    </>
  );
}

export default App;
