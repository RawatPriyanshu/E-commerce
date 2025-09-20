import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState(false);
  const API = "https://e-commerce-by-priyanshu.onrender.com";
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/users/register`, form);
      alert("registered success");
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <div className="background">
      <div className="registraition">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Full Name<span className="required">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your name here"
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email<span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your gmail"
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="password">
              Password<span className="required">*</span>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              minlength="8"
              className="form-input"
              onChange={handleChange}
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
          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <span className="login-link">
          Already have an Account? <Link to={"/login"}>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
