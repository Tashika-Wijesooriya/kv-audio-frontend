const sampleArray = [
  {
    key: "P001",
    name: "Product 1",
    price: 100,
    category: "electronics",
    dimension: "10x10x10 cm",
    description: "A high-quality electronic product.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P002",
    name: "Product 2",
    price: 150,
    category: "home appliances",
    dimension: "15x15x15 cm",
    description: "A reliable home appliance.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P003",
    name: "Product 3",
    price: 200,
    category: "furniture",
    dimension: "100x50x30 cm",
    description: "A comfortable and stylish chair.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P004",
    name: "Product 4",
    price: 80,
    category: "sports",
    dimension: "5x5x5 cm",
    description: "A durable sports accessory.",
    availability: false,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P005",
    name: "Product 5",
    price: 120,
    category: "electronics",
    dimension: "30x20x10 cm",
    description: "A smart gadget with advanced features.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P006",
    name: "Product 6",
    price: 75,
    category: "kitchen",
    dimension: "25x20x10 cm",
    description: "A set of high-quality kitchen tools.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P007",
    name: "Product 7",
    price: 250,
    category: "furniture",
    dimension: "200x80x70 cm",
    description: "A luxurious and comfortable sofa.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P008",
    name: "Product 8",
    price: 50,
    category: "toys",
    dimension: "10x10x10 cm",
    description: "A fun and educational toy for children.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P009",
    name: "Product 9",
    price: 350,
    category: "outdoor",
    dimension: "100x100x50 cm",
    description: "A high-end outdoor tent.",
    availability: false,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
  {
    key: "P010",
    name: "Product 10",
    price: 400,
    category: "electronics",
    dimension: "10x10x10 cm",
    description: "A top-of-the-line smartphone.",
    availability: true,
    image: [
      "https://i.pinimg.com/474x/8c/60/98/8c609895a1b9783451cac96f3ee5af0a.jpg",
    ],
  },
];

import { useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
  const [items, setItems] = useState(sampleArray);

  return (
    <div className="w-full h-full relative">
      <table>
        <thead>
          <th>Key</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Dimensions</th>
          <th>Availability</th>
        </thead>
        <tbody>
          {items.map((product) => {
            console.log(product);

            return (
              <tr key={product.key}>
                <td className="border p-2">{product.key}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.dimension}</td>
                <td className="border p-2">
                  {product.availability ? "Available" : "Out of Stock"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link to="/admin/items/add">
        <LuCirclePlus className="text-[50px] absolute right-4 bottom-4 hover:text-blue-700 cursor-pointer" />
      </Link>
    </div>
  );
}
