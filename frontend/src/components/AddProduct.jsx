import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const ratingRef = useRef();
  const stockRef = useRef();
  const brandRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      title: titleRef.current.value,
      description: descRef.current.value,
      price: Number(priceRef.current.value),
      category: categoryRef.current.value,
      rating : Number(ratingRef.current.value) ,
      stock : Number(stockRef.current.value), 
      brand: brandRef.current.value,
    };

    // 🔍 Validation
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.rating ||
      !product.stock ||
      !product.brand
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }

      toast.success("Product added successfully! ");

      // Clear fields
      titleRef.current.value = "";
      descRef.current.value = "";
      priceRef.current.value = "";
      categoryRef.current.value = "";
      ratingRef.current.value = "";
      stockRef.current.value = "";
      brandRef.current.value = "";

      // Redirect to home
      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      toast.error("Server error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            ref={titleRef}
            placeholder="Product Title"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            ref={descRef}
            placeholder="Description"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            ref={priceRef}
            type="number"
            placeholder="Price"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            ref={categoryRef}
            placeholder="Category (Electronics, Books...)"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
  ref={ratingRef}
  type="number" step="0.1" min="0" max="5"
  placeholder="Rating"
  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none no-spinner"
/>

<input
  ref={stockRef}
  type="number"
  placeholder="Stock"
  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none no-spinner"
/>

          <input
            ref={brandRef}
            placeholder="Brand"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus-ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;