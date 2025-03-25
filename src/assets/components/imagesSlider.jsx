import { useState } from "react";

export default function ImagesSlider({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Main Image */}
      <div className="w-full max-w-lg h-[450px] bg-gray-100 rounded-lg overflow-hidden">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected product"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3 overflow-x-auto max-w-lg p-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${
              selectedImage === image
                ? "border-blue-500 scale-110"
                : "border-transparent hover:scale-105 hover:border-gray-400"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
}
