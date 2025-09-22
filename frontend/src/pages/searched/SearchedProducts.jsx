import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./searched.css";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";

const SearchedProducts = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const searchTerm = keyword?.toLowerCase() || "";
  const [sortOrder, setSortOrder] = useState("");
  const [userDetails, setUserDetails] = useState(false);
  const navigate = useNavigate();

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

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase() === searchTerm
  );

  if (loading) return <p>Loading...</p>;

  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    }
    return 0; // default (no sorting)
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <div className="searchedProducts">
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
              <div
                className={userDetails ? "profile-menu" : "profile-menu-hide"}
              >
                <div>
                  <span>
                    <i class="fa-regular fa-user"></i> Edit Profile
                  </span>
                </div>
                <div onClick={handleLogout}>
                  <span>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out
                  </span>
                </div>
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
      <div className="searched-container">
        <h2>Results for "{searchTerm}"</h2>
        <div className="sort-section">
          <span>Sort by:</span>{" "}
          {/*  {sortOrder === "" ? 'Default' : sortOrder} */}
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          {/* <div className="sortBy">
            <span onClick={()=>setSortOrder("lowToHigh")}>Price: Low to High</span>
            <span onClick={()=>setSortOrder("highToLow")}>Price: High to Low</span>
          </div> */}
        </div>
        {sortedProducts.length > 0 ? (
          <div className="results-grid">
            {sortedProducts.map((product) => (
              <Link
                className="product-card"
                to={`/product/${product._id}`}
                key={product._id}
              >
                <div>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchedProducts;
