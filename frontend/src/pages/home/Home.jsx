import React, { useEffect, useState } from "react";
import "./home.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import { toast } from "react-toastify";

const Home = () => {
  const [userDetails, setUserDetails] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const API = "https://e-commerce-by-priyanshu.onrender.com";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  }
  return (
    <div style={{ backgroundColor: "#f1f2f4" }}>
      {/* small device size */}
      <header className="header">
        <div className="searchBox">
          <div className="search">
            <div className="mob-logo">
              <img src="/images/logo.png" alt="logo-mob" />
            </div>
            <SearchBar />
          </div>
          <div className="icons">
            <div className="profile" onClick={() => setUserDetails(!userDetails)}>
              <i className="fa fa-user icon"></i>
              <div className={userDetails ? "profile-menu" : "profile-menu-hide"}>
                <div onClick={()=>navigate('/editProfile')}><span><i class="fa-regular fa-user"></i> Edit Profile</span></div>
                <div onClick={handleLogout}><span><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</span></div>
              </div>
            </div>
            <div className="cart">
              <Link to={"/cart"}>
                <i className="fa fa-shopping-cart icon"></i>
              </Link>
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
        <nav className="navigations">
          <ul>
            <li>
              <Link to="/home">
                <i
                  style={{ color: "black", fontSize: "20px" }}
                  className="fa-solid fa-house"
                ></i>
              </Link>
            </li>
            <li>
              <Link to="/searched/men">
                <img className="nav-icons" src="/images/men.jpg" alt="" />
                <span>Men</span>
              </Link>
            </li>
            <li>
              <Link to="/searched/women">
                <img className="nav-icons" src="/images/women.jpg" alt="" />
                <span>Women</span>
              </Link>
            </li>
            <li>
              <Link to="/searched/kid">
                <img className="nav-icons" src="/images/kids.jpg" alt="" />
                <span>Kids</span>
              </Link>
            </li>
            <li>
              <Link to="/searched/trending">
                <img className="nav-icons" src="/images/trending.jpg" alt="" />
                <span>Trending</span>
              </Link>
            </li>
            <li>
              <Link to="/searched/home">
                <img className="nav-icons" src="/images/home.jpg" alt="" />
                <span>Home</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section className="banner">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={2800}
            transitionTime={500}
            stopOnHover={false}
          >
            <div>
              <img src="/images/banner1.avif" alt="Banner1" />
            </div>
            <div>
              <img src="/images/banner2.avif" alt="Banner2" />
            </div>
            <div>
              <img src="/images/banner3.avif" alt="Banner3" />
            </div>
            <div>
              <img src="/images/banner4.avif" alt="Banner4" />
            </div>
            <div>
              <img src="/images/banner5.avif" alt="Banner5" />
            </div>
            <div>
              <img src="/images/banner6.avif" alt="Banner6" />
            </div>
            <div>
              <img src="/images/banner7.avif" alt="Banner7" />
            </div>
          </Carousel>
        </section>
        <section className="bestOfMen">
          <h1 className="collection-heading">Best of Men's Collection</h1>
          <div className="bestOfMenList">
            {products.length === 0 ? (
              <div className="spinner"></div>
            ) : (
              products
                .filter((product) => product.category.toLowerCase() === "men")
                .slice(0, 8)
                .map((product) => (
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div key={product._id} className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h3 className="product-title">
                        {product.name.length > 20
                          ? product.name.slice(0, 20) + "..."
                          : product.name}
                      </h3>
                      <p className="product-description">₹{product.price}</p>
                    </div>
                  </Link>
                ))
            )}
          </div>
        </section>
        <section className="bestOfWomen">
          <h1 className="collection-heading">Best of Women's Collection</h1>
          <div className="bestOfWomenList">
            {products.length === 0 ? (
              <div className="spinner"></div>
            ) : (
              products
                .filter((product) => product.category.toLowerCase() === "women")
                .slice(0, 8)
                .map((product) => (
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div key={product._id} className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h3 className="product-title">
                        {product.name.length > 20
                          ? product.name.slice(0, 20) + "..."
                          : product.name}
                      </h3>
                      <p className="product-description">₹{product.price}</p>
                    </div>
                  </Link>
                ))
            )}
          </div>
        </section>
        <section className="bestOfKids">
          <h1 className="collection-heading">Best of Kid's Collection</h1>
          <div className="bestOfKidsList">
            {products.length === 0 ? (
              <div className="spinner"></div>
            ) : (
              products
                .filter((product) => product.category.toLowerCase() === "kids")
                .slice(0, 8)
                .map((product) => (
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div key={product._id} className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h3 className="product-title">
                        {product.name.length > 20
                          ? product.name.slice(0, 20) + "..."
                          : product.name}
                      </h3>
                      <p className="product-description">₹{product.price}</p>
                    </div>
                  </Link>
                ))
            )}
          </div>
        </section>
        <section className="bestOfHome">
          <h1 className="collection-heading">Home Collection</h1>
          <div className="bestOfHomeList">
            {products.length === 0 ? (
              <div className="spinner"></div>
            ) : (
              products
                .filter((product) => product.category.toLowerCase() === "home")
                .slice(0, 6)
                .map((product) => (
                  <Link to={`/product/${product._id}`} className="product-link">
                    <div key={product._id} className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h3 className="product-title">
                        {product.name.length > 18
                          ? product.name.slice(0, 18) + "..."
                          : product.name}
                      </h3>
                      <p className="product-description">₹{product.price}</p>
                    </div>
                  </Link>
                ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="logo-mob" />
            </div>
            <p>Bringing you the best products at unbeatable prices.</p>
          </div>
          <div className="links-container">
            {/* Quick Links */}
            <div className="footer-section links-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section links-section">
              <h4>Categories</h4>
              <ul>
                <li>
                  <a href="#">Men</a>
                </li>
                <li>
                  <a href="#">Women</a>
                </li>
                <li>
                  <a href="#">Kids</a>
                </li>
                <li>
                  <a href="#">Home & Living</a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="footer-section links-section">
              <h4>Follow Us</h4>
              <ul>
                <li>
                  <a href="#">
                    <i className="facebook"></i> Facebook
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="twitter"></i> Twitter
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="linkedin"></i> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@fabricfusion.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: New Delhi, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} FabricFusion. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
