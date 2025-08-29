import { useState } from 'react';
import '../first/first.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from 'react-router-dom';


const First = () => {
  
   const [show, setShow] = useState(false);
   const [isActive, setIsActive] = useState(false);

   const navigate = useNavigate();
   const handleSubmit = (e)=>{
    e.preventDefault();
    navigate('/home');
   }
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
      <div className="logo"><img src="/images/logo.png" alt="logo" /></div>
    </div>
    <div className="welcome">
      <h2>Welcome to FabricFusion</h2>
    </div>
    <div className="login-register">
    <Link to={'/register'} className='register'>Register Here</Link>
    <Link to={'/login'} className='login'>Already Registered? Login</Link>
    </div>
    <div className="loginRegister" style={{
    background: `url("/images/background.jpg") no-repeat center center`,
    backgroundSize: "cover",
    height: "100vh"}}>
      {/* <div className="loginRegister-container">
      <div className="login-section"></div>
      <div className="slider-section"></div>
      <div className="register-section"></div>
    </div> */}
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      {/* Register Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fab fa-github"></i></a>
            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" name='username' required/>
          <input type="email" placeholder="Email" name='email' required/>
           <div className="password" style={{width:'100%', position:'relative'}}>
            <input type={show ? 'text' : 'password'} name='password' placeholder="Password" required/>
             <i
    className={`fa ${show ? 'fa-eye-slash' : 'fa-eye'}`}
    onClick={() => setShow(!show)}
    style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
  ></i>
          </div>
          <button>Sign Up</button>
        </form>
      </div>

      {/* Login Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fab fa-github"></i></a>
            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email and password</span>
          <input type="email"  name='email' placeholder="Email" required/>
          <div className="password" style={{width:'100%', position:'relative'}}>
            <input type={show ? 'text' : 'password'} name='password' placeholder="Password" required/>
             <i
    className={`fa ${show ? 'fa-eye-slash' : 'fa-eye'}`}
    onClick={() => setShow(!show)}
    style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
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
            <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
     
    </div>
  );
};

export default First;
