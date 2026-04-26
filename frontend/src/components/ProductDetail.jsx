import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // 1. Image Mapping Logic (Consistent with Product Card)
  const categoryImages = {
    Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    Books: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop",
    Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop",
    Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    Clothing: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
    Groceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
    Default: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop"
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        
        setProduct(res.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 text-lg font-medium">Loading product details...</p>
      </div>
    );
  }

  const productImage = categoryImages[product.category] || categoryImages.Default;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${
          i < Math.floor(rating || 0) ? "text-yellow-400" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fadeIn">
      {/* Navigation Header */}
      <button
        onClick={() => navigate(-1)}
        className="group mb-8 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
      >
        <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
        Back to Products
      </button>

      <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left: Image Section */}
          <div className="relative bg-gray-50 flex items-center justify-center p-4">
            <img
              src={productImage}
              alt={product.title}
              className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl shadow-inner"
            />
            {product.stock <= 5 && (
              <span className="absolute top-8 left-8 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                Low Stock
              </span>
            )}
          </div>

          {/* Right: Details Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2 block">
                {product.category || "General"}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1 text-lg">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-400 font-medium">
                  | &nbsp; {product.rating || 0} Customer Rating
                </span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-blue-600">₹{product.price}</span>
                <span className="text-gray-400 line-through text-lg">₹{Math.floor(product.price * 1.2)}</span>
              </div>
              <p className="text-green-600 text-sm font-bold mt-1">Inclusive of all taxes</p>
            </div>

            {/* Specifications Box */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Brand</p>
                <p className="text-gray-800 font-semibold">{product.brand || "Authentic"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Availability</p>
                <p className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 active:scale-95">
                <i className="fa-solid fa-bag-shopping"></i>
                Add to Cart
              </button>
              <button className="p-4 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-gray-400 hover:text-red-500">
                <i className="fa-regular fa-heart text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;