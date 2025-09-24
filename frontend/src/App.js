import './App.css';
import {Routes, Route} from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import First from './pages/first/First';
import Home from './pages/home/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Product from './pages/details/Product';
import Cart from './pages/cart/Cart';
import SearchedProducts from './pages/searched/SearchedProducts';
import ProtectedRoute from './pages/ProtectedRoute';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from './pages/editProfile/Edit';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<First />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/searched/:keyword' element={<SearchedProducts />} />
        <Route path='/editProfile' element={<ProtectedRoute><Edit /></ProtectedRoute>} />
      </Routes>
      <ToastContainer  position="top-right" autoClose={3000} theme='colored'/>
    </div>
  );
}

export default App;
