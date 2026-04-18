import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [search,setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if(e.key === "Enter")
    {
      if(!search.trim()){
        return;
      }
      navigate({
        pathname : "/search",
        search : `?q=${encodeURIComponent(search)}`
      });
      
    }
  }

    return (
        <>
        <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <h1 className="text-2xl font-bold text-blue-600">
          MyShop
        </h1>

      
        <div className="flex-1 mx-6 relative">
          
        
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          
        
          <input 
            type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearch}
            placeholder="Search products..." 
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
        <nav className="space-x-6">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Products</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </nav>

      </div>
    </header>
        </>
    )

}

export default Header;