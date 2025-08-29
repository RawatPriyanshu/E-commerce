import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decreaseQuantity, addToCart, clearCart } from '../../store/cartSlice';
import { useNavigate } from "react-router-dom";
import './cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='cart-container'>
      <div className="myCart">
        <h2>My Cart</h2>
        {cartItems.length > 0 && (
          <i  onClick={() => dispatch(clearCart())} class="fa-solid fa-trash-can"></i>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <div className='empty-cart-box'><div><img src="/images/empty-cart.webp" alt="" /></div>
        <span onClick={()=>{navigate('/home')}}>Shop now</span>
        </div>
      ) : (
        <div className='cart-wrap' >
        {cartItems.map((item) => (
            <div className="container" key={item._id}>
              <div className="container2">
            <div className="product-image"><img src={item.image} alt={item.name} /></div> 
            <div className="quantity">
            <button onClick={() => dispatch(decreaseQuantity(item._id))}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => dispatch(addToCart(item))}>+</button>
            </div>
            </div>
            <div className="container3">
            <h4>{item.name}</h4>
            <p className='pricing'><span style={{color:'green'}}>&#11015;<b>15%</b></span><span className='actual-value'><s>₹{Math.round(item.price / (1 - 15/100))}</s></span>₹{item.price}</p>
            <button onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};


export default Cart

