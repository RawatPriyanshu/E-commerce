import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, decreaseQuantity, addToCart, clearCart } from '../../store/cartSlice';
import { useNavigate } from "react-router-dom";
import './cart.css';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className='cart-container'>

      {/* ── Header ── */}
      <div className="myCart">
        <h2>My Cart ({cartItems.length})</h2>
        {cartItems.length > 0 && (
          <i
            onClick={() => {
              dispatch(clearCart());
              toast.success("Cart cleared successfully!");
            }}
            className="fa-solid fa-trash-can"
          />
        )}
      </div>

      {/* ── Empty state ── */}
      {cartItems.length === 0 ? (
        <div className='empty-cart-box'>
          <div><img src="/images/empty-cart.webp" alt="empty cart" /></div>
          <span onClick={() => navigate('/home')}>Shop Now</span>
        </div>
      ) : (
        <>
          <div className='cart-wrap'>
            {cartItems.map((item) => (
              <div className="container" key={item._id}>

                {/* top: image + details */}
                <div className="container-top">
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="container3">
                    <div>
                      <h4>{item.name}</h4>
                      <p className='rating-stars'>
                        &#9733;&#9733;&#9733;&#9733;
                        <span style={{ color: "#bab2b2" }}>&#9733;</span>
                        <span>4 star rating</span>
                      </p>
                      <p className='pricing'>
                        ₹{item.price}
                        <span className='actual-value'>₹{Math.round(item.price / (1 - 15 / 100))}</span>
                        <span className='discount-tag'>15% OFF</span>
                      </p>
                    </div>

                    {/* quantity */}
                    <div className="quantity">
                      <button onClick={() => dispatch(decreaseQuantity(item._id))}>−</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => dispatch(addToCart(item))}>+</button>
                    </div>
                  </div>
                </div>

                {/* bottom: actions */}
                <div className='remove-buy'>
                  <button className='remove-btn' onClick={() => dispatch(removeFromCart(item._id))}>
                    <i className="fa-solid fa-trash-can"></i> Remove
                  </button>
                  <button className='buy-btn'>
                    <i className="fas fa-bolt"></i> Buy Now
                  </button>
                </div>

                {/* sticky order bar — rendered once per card but only last one shows due to fixed pos */}
                <div className="place-order">
                  <span>Total: ₹{totalAmount}</span>
                  <button>Place Order</button>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;