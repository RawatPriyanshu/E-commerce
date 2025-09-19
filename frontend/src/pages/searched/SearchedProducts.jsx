import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./searched.css"
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";


const SearchedProducts = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);
    const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();

  const searchTerm = keyword?.toLowerCase() || "";

  const API = "https://e-commerce-by-priyanshu.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
      if (keyword.trim()) {
        navigate(`/searched/${keyword}`);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm)
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="searchedProducts">
       <header className="header">
              <div className="searchBox">
              <div className="search">
                <SearchBar />
                <div className="mob-logo"><img src="/images/logo.png" alt="logo-mob" /></div>
              </div>
              <div className="icons">
              <div className="profile">
                <i className="fa fa-user icon"></i>
                <div className="profile-menu"></div>
              </div>
              <div className="cart">
                <Link to={'/cart'}><i className="fa fa-shopping-cart icon"></i></Link>
                  {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-3px",
                  right: "-3px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                }}
              ></span>
            )}
              </div>
              </div>
              </div>
              <nav className='navigations'>
                <ul>
                  <li><a href="#"><i style={{color:"black", fontSize:"20px"}} className="fa-solid fa-house"></i></a></li>
                  <li><a href="#"><img className='nav-icons' src="/images/men.jpg" alt="" /><span>Men</span></a></li>
                  <li><a href="#"><img className='nav-icons' src="/images/women.jpg" alt="" /><span>Women</span></a></li>
                  <li><a href="#"><img className='nav-icons' src="/images/kids.jpg" alt="" /><span>Kids</span></a></li>
                  <li><a href="#"><img className='nav-icons' src="/images/trending.jpg" alt="" /><span>Trending</span></a></li>
                  <li><a href="#"><img className='nav-icons' src="/images/home.jpg" alt="" /><span>Home</span></a></li>
                </ul>
              </nav>
            </header>
      <h2>Results for "{searchTerm}"</h2>
      {filtered.length > 0 ? (
        <div className="results-grid">
          {filtered.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No products found.</p>
      )}
    </div>
  );
};

export default SearchedProducts;
