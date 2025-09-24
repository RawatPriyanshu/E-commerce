import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './product.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import CartToast from '../CartToast';

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [liked, setLiked] = useState(false);
  const API = "https://e-commerce-by-priyanshu.onrender.com";

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;


  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(<CartToast />)
  };

   const isShoe = product.name.toLowerCase().includes("shoes") || 
                 product.name.toLowerCase().includes("sandals");

  const sizes = isShoe ? [7, 8, 9, 10] : ["S", "M", "L", "XL"];

  
const today = new Date();

const futureDate = new Date();
futureDate.setDate(today.getDate() + 5);

const options = { day: 'numeric', month: 'long'};
const formattedDate = futureDate.toLocaleDateString('en-GB', options);


  return (
    <div className='product-details'>
      <div className="product-image"><img src={product.image} alt={product.name} /><div className="like-share"><i className={liked ? "fas fa-heart red-heart" : "far fa-heart heart-icon"} onClick={()=>setLiked(!liked)}></i><i className="fas fa-share share-icon"></i></div></div> 
      <div>
      <div className="details">
      <h1>{product.name}</h1>
      <p className='rating'><span className="star">4.5 <i class="fas fa-star" style={{margin:"0 0 0 5px"}}></i></span>10,000+ Ratings</p>
      <p className='price'>₹{product.price}<span className='actual-price'>MRP <s>₹{Math.round(product.price / (1 - 15/100))}</s> <strong>(15% OFF)</strong></span></p>
      </div>

      <section className='adding-buying'>
        <div className="buy-now"><i class="fas fa-bolt"></i><button>Buy Now</button></div>
        <div className="add-to-cart" onClick={handleAddToCart}><i class="fas fa-cart-plus"></i><button>Add to Cart</button></div>
      </section>

       <section className="size-list">
      <div className="size-list-container"> 
        <h2 className="size">Size</h2>
        <div className="size-wrap">
          {sizes.map((size, index) => (
            <span
              key={index}
              className={`option ${selectedSize === size ? "active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </section>

    <section className="delivery-options">
      <div className="container">
        <div className="delivery-options-list"><i class="fa fa-truck"></i><span>{`Delivery by ${formattedDate}`}</span></div>
        <div className="delivery-options-list"><i class="fa-solid fa-arrow-rotate-left"></i><span>10 days Return Policy</span></div>
        <div className="delivery-options-list"><i class="fa-regular fa-money-bill-1"></i><span>Cash on Delivery Available</span></div>
      </div>
    </section>

    <section className="description">
      <div className="container">
      <h3>Description</h3>
         <p className=''>{product.description}</p>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum minima eligendi assumenda incidunt, quam aperiam ipsa atque aspernatur sint. Facilis unde iste perferendis. Veniam eius excepturi dicta cum iure culpa.</p>
      </div>
         <h5>Assured Quality | 100% Handpicked | Easy Exchange</h5>
    </section>
    </div>
    </div>
  );
};

export default Product;
