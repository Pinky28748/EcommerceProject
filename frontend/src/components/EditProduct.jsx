import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // ✅ FORM STATE
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    rating: "",
    stock: "",
    brand: "",
  });

  // ✅ FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);

        

        const data = await res.data;

        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          rating: data.rating || "",
          stock: data.stock || "",
          brand: data.brand || "",
        });

        setLoading(false);
      } catch (err) {
        toast.error(err.message || "Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
      `http://localhost:3001/products/${id}`,
      {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating),
        stock: Number(formData.stock),
      }
    );
      const data =  res.data;
      toast.success("Product updated successfully ");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
     toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-3"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Title"
        />

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Description"
        />

        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Price"
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Category"
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Rating"
        />

        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Stock"
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-2 border"
          placeholder="Brand"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;