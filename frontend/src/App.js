import './App.css';
import {Routes, Route} from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import First from './pages/first/First';
import Home from './pages/home/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Product from './pages/details/Product';
import Cart from './pages/cart/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<First />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
