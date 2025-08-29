import React, { useState } from 'react'
import axios from 'axios';
import './login.css'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
   const [show, setShow] = useState(false);
  const navigate = useNavigate();
    const [form, setForm] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        setForm({...form,[e.target.name] : e.target.value})
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const res =  await axios.post("http://localhost:5000/api/users/login",form);
            alert("login successfully");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate('/home')
        } catch (error) {
            alert("something went wrong");
        }
    }
  return (
    <div className='background'>
      <div className="login-page">
        <h1>Login</h1>
       <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email<span>*</span></label>
        <input type="email" name='email' placeholder='Enter gmail' className='form-input' onChange={handleChange} required />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password<span>*</span></label>
        <input type={show ? 'text' : 'password'} name='password' placeholder='Enter password' minLength={8} className='form-input' onChange={handleChange} required />
         <i
    className={`fa ${show ? 'fa-eye-slash' : 'fa-eye'}`}
    onClick={() => setShow(!show)}
    style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
  ></i>
        </div>
        <button type='submit' className='btn'>Login</button>
      </form>
      <span className='register-link'>Do not have an Account? <Link to={'/register'}>Register</Link></span>
      </div>
    </div>
  )
}

export default Login
