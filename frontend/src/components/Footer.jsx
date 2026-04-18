const Footer = () => {
    return (
        <>
        <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        
        <div>
          <h2 className="text-xl font-bold mb-3">MyShop</h2>
          <p className="text-gray-400">
            Your one-stop shop for all your needs. Quality products at the best prices.
          </p>
        </div>

        
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Products</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-xl font-bold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <i className="fa-brands fa-facebook hover:text-gray-400"></i>
            <i className="fa-brands fa-instagram hover:text-gray-400"></i>
            <i className="fa-brands fa-twitter hover:text-gray-400"></i>
            <i className="fa-brands fa-linkedin hover:text-gray-400"></i>
          </div>
        </div>

      </div>

      
      <div className="text-center border-t border-gray-700 py-4 text-gray-400">
        © 2026 MyShop. All rights reserved.
      </div>
    </footer>
        </>
    )

}

export default Footer;