import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Productdetails from './pages/Productdetails'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import PrivateRouter from './components/PrivateROuter'
import Login from './pages/Login'
import Signup from './pages/Signup'


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/product/:id' element={<Productdetails />} />
        <Route path='/cart' element={<CartPage />} />
        <Route element={<PrivateRouter />}>
        <Route path='/checkout' element={<CheckoutPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App

