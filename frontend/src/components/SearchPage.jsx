import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "./Product"; // ✅ IMPORT

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/products?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-xl font-bold mb-4">
        Results for "{query}"
      </h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <Product key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;