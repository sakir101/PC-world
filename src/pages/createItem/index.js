import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import RootLayout from "@/components/Layouts/RootLayout";

const CreateItem = () => {
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    img: "",
    category: "",
    status: "",
    price: "",
    description: "",
    feature: ["", "", "", "", ""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.feature];
    updatedFeatures[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      feature: updatedFeatures,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tech-world-server-psi.vercel.app/api/v1/products/create-product",
        formData
      );
      console.log(response.data);
      if (response.statusCode === 200 || response.data.success) {
        toast.success("Product added successfully");
        e.target.reset();
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Product addition failed");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="text-lg font-semibold my-7 text-center text-blue-500">
        Create New Product
      </h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Product ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="input input-bordered w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="input input-bordered w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Image URL:</label>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              className="input input-bordered w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input input-bordered w-full border px-3 py-2 rounded"
            >
              <option value="">Select a category</option>{" "}
              <option value="CPU">CPU</option>
              <option value="GPU">RAM</option>
              <option value="Motherboard">Power Supply Unit</option>
              <option value="RAM">Motherboard</option>
              <option value="Storage">Storage Device</option>
              <option value="Power Supply">Monitor</option>
              <option value="Cooling">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input input-bordered w-full border px-3 py-2 rounded"
            >
              <option value="">Select a staus</option>{" "}
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Price (e.g., &quot;12,200 Tk&quot;):
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="input input-bordered w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full border px-3 py-2 rounded"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Features (Enter 5):
            </label>
            {formData.feature.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="input input-bordered w-full border px-3 py-2 mb-2 rounded"
                placeholder={`Feature ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateItem;

CreateItem.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
