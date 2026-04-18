import { useNavigate } from "react-router-dom";

const Product = ({ product, onDelete }) => {
  const navigate = useNavigate();

  // 1. Define the Mapping
  // You can add more categories here as you create them in your DB
  const categoryImages = {
    Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&h=300&auto=format&fit=crop",
    Books: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&h=300&auto=format&fit=crop",
    Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400&h=300&auto=format&fit=crop",
    Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=300&auto=format&fit=crop",
    Clothing: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&h=300&auto=format&fit=crop",
    Groceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&h=300&auto=format&fit=crop",
    Default: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&h=300&auto=format&fit=crop" // A neutral gradient
  };

  // 2. Select the image based on category (Case-insensitive check)
  const productImage = categoryImages[product.category] || categoryImages.Default;

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      
      {/* IMAGE SECTION */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)} 
        className="cursor-pointer relative group"
      >
        <img
          src={productImage}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
          {product.category || "General"}
        </span>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
            {product.title}
          </h2>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
             <i className="fa-solid fa-star"></i>
             <span className="text-gray-600 font-medium">{product.rating || "N/A"}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="mt-auto">
          <p className="text-2xl font-black text-blue-600 mb-4">
            ₹{product.price}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add your cart logic here
              }}
              className="flex-grow bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-cart-shopping text-sm"></i>
              Add
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit-product/${product.id}`);
              }}
              className="p-2 px-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-all"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product.id);
                }}
                className="p-2 px-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;