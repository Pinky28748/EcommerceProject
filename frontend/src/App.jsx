import { Route,Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
import ProductDetail from './components/ProductDetail'
import SearchPage from './components/SearchPage'


function App() {


  return (
   <Routes>
    <Route path="/" element={<Layout />}>
       <Route index element={<ProductList />} />
       <Route path="add-product" element={<AddProduct />} ></Route>
       <Route path="edit-product/:id" element={<EditProduct />} />
       <Route path="product/:id" element={<ProductDetail />} />
       <Route path="search" element={<SearchPage />} />
    </Route>
   </Routes>
  )
}

export default App
