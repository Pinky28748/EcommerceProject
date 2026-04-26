import { useEffect, useState, useRef } from "react";
import Product from "./Product";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setcategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const topRef = useRef(null);

  const limit = 12;

  // 1. Extract values
  const page = Number(searchParams.get("page") || 1);
  const category = searchParams.get("category") || "";
  const rating = searchParams.get("rating") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "DESC";

  // 2. Fetch Products
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/products", {
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          ...(category && { category }),
          ...(rating && { rating }),
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice }),
        },
      });

      const data = res.data;

      setProducts(data.data || []);
      setTotal(data.total || 0);

    } catch (err) {
      console.error("API Error:", err);
      toast.error(err.response?.data?.message || "Failed to load products");
    }
  };

  fetchProducts();
}, [page, category, rating, minPrice, maxPrice, sortBy, sortOrder]);

  // 3. Fetch Categories
  /*useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setcategories(data))
      .catch((err) => console.log(err));
  }, []); */
  useEffect ( () => {
  const fetchCategories = async () => {
    try{
      const result = await axios.get("http://localhost:3001/categories");
      setcategories(result.data);

  }
  catch(error){
  console.log(error);
 }
};
fetchCategories();
 
},[])
  //
  // 4. Auto-scroll
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  // 5. Update Logic (Removes key if value is empty)
  const updateFilters = (key, value) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      if (key !== "page") {
        newParams.set("page", "1");
      }
      return newParams;
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/products/${id}`);
      
      toast.success("Product removed");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const totalPages = Math.ceil(total / limit);
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPaginationGroup = () => {
    let pages = [];
    let start = Math.max(1, page - 4);
    let end = Math.min(totalPages, page + 5);
    for (let i = start; i <= end; i++) { pages.push(i); }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-gray-800">
      <div ref={topRef} className="mb-6 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Catalog</h1>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md text-sm font-semibold"
          >
            + New Product
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold">{startItem} – {endItem}</span> of <span className="font-bold">{total}</span> items
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-6 mb-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm items-end">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
          <select
            value={category}
            onChange={(e) => updateFilters("category", e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none min-w-[140px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rating</label>
          <select
            value={rating}
            onChange={(e) => updateFilters("rating", e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => updateFilters("minPrice", e.target.value)}
              className="border border-gray-200 px-2 py-2 rounded-md bg-white text-sm w-20 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => updateFilters("maxPrice", e.target.value)}
              className="border border-gray-200 px-2 py-2 rounded-md bg-white text-sm w-20 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 border-l pl-6 border-gray-100">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort By</label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => updateFilters("sortBy", e.target.value)}
              className="border border-gray-200 px-3 py-2 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="createdAt">Date Added</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="title">Alphabetical</option>
            </select>
            <button
              onClick={() => updateFilters("sortOrder", sortOrder === "ASC" ? "DESC" : "ASC")}
              className="px-3 py-2 border border-gray-200 rounded-md bg-white text-blue-600 hover:bg-gray-50 transition"
            >
              <i className={`fa-solid ${sortOrder === "ASC" ? "fa-arrow-up-short" : "fa-arrow-down-short"}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* NEW: ACTIVE FILTERS AREA */}
      {(category || rating || minPrice || maxPrice) && (
        <div className="flex flex-wrap items-center gap-2 mb-8 animate-fadeIn">
          <span className="text-xs font-bold text-gray-400 uppercase mr-2">Active Filters:</span>
          
          {category && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              Category: {category}
              <button onClick={() => updateFilters("category", "")} className="hover:text-blue-900 font-bold">✕</button>
            </div>
          )}

          {rating && (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
              Rating: {rating}+ Stars
              <button onClick={() => updateFilters("rating", "")} className="hover:text-yellow-900 font-bold">✕</button>
            </div>
          )}

          {minPrice && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              Min: ${minPrice}
              <button onClick={() => updateFilters("minPrice", "")} className="hover:text-green-900 font-bold">✕</button>
            </div>
          )}

          {maxPrice && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              Max: ${maxPrice}
              <button onClick={() => updateFilters("maxPrice", "")} className="hover:text-green-900 font-bold">✕</button>
            </div>
          )}

          <button
            onClick={() => setSearchParams({ page: 1 })}
            className="text-xs font-bold text-red-500 hover:text-red-700 ml-2 underline underline-offset-4"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Display */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium italic">No products match your current filters.</p>
          <button 
             onClick={() => setSearchParams({ page: 1 })}
             className="mt-4 text-blue-600 font-semibold hover:underline"
          >
            Show all products
          </button>
        </div>
      )}

      {/* PAGINATION */}
      {total > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => updateFilters("page", (page - 1).toString())}
              disabled={page === 1}
              className="px-4 py-2 text-blue-600 font-bold text-xs uppercase hover:bg-blue-50 rounded-md disabled:text-gray-300 disabled:hover:bg-transparent transition-all"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {getPaginationGroup().map((p) => (
                <button
                  key={p}
                  onClick={() => updateFilters("page", p.toString())}
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    page === p 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => updateFilters("page", (page + 1).toString())}
              disabled={page >= totalPages}
              className="px-4 py-2 text-blue-600 font-bold text-xs uppercase hover:bg-blue-50 rounded-md disabled:text-gray-300 disabled:hover:bg-transparent transition-all"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductList;