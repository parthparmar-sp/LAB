import React, { useState } from "react";
import ht from "../../assets/hitman.jpeg";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="h-screen bg-gray-100 flex items-center justify-center">
     
      <img src={ht}></img>
    </main>
  );
}

export default ImageUpload;
