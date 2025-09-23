import { useState } from "react";
import "../first/first.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const First = () => {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const API = "https://e-commerce-by-priyanshu.onrender.com";

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/users/register`, registerForm);
      alert("Registration successful, please login!");
      setIsActive(false); // Switch to login panel
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/users/login`, loginForm);

      // Save token + user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <div className="firstPage">
      <div className="carousel-container">
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
            <img src="/images/slide1.jpg" alt="Banner 1" />
          </div>
          <div>
            <img src="/images/slide2.jpg" alt="Banner 2" />
          </div>
          <div>
            <img src="/images/slide3.jpg" alt="Banner 3" />
          </div>
          <div>
            <img src="/images/slide5.jpg" alt="Banner 5" />
          </div>
        </Carousel>
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
      </div>
      <div className="welcome">
        <h2>Welcome to FabricFusion</h2>
      </div>
      <div className="login-register">
        <Link to={"/register"} className="register">
          Register Here
        </Link>
        <Link to={"/login"} className="login">
          Already Registered? Login
        </Link>
      </div>
      <div
        className="loginRegister"
        style={{
          background: `url("/images/background.jpg") no-repeat center center`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        {/* pc version */}
        <div className={`first-container ${isActive ? "active" : ""}`} id="container">
      {/* Register Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleRegisterSubmit}>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            name="username"
            value={registerForm.username}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={registerForm.email}
            onChange={handleRegisterChange}
            required
          />
          <div className="password" style={{ width: "100%", position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
            />
            <i
              className={`fa ${show ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShow(!show)}
              style={{
                position: "absolute",
                right: 15,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>
          <button>Sign Up</button>
        </form>
      </div>

      {/* Login Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleLoginSubmit}>
          <h1>Sign In</h1>
          <span>or use your email and password</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleLoginChange}
            required
          />
          <div className="password" style={{ width: "100%", position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
            <i
              className={`fa ${show ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShow(!show)}
              style={{
                position: "absolute",
                right: 15,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={() => setIsActive(false)}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={() => setIsActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default First;
