import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";


import "./login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",
      password: ""
    });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(error.response.data.message);
    }
  };


  return (

    <div className="login-container">

      <div className="login-card">

       <div className="gif-container">

  <iframe
    src="https://tenor.com/embed/5834748043498907593"
    className="login-gif"
    allowFullScreen
  ></iframe>

</div>

  
        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to manage your tasks
        </p>



        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="login-input"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="login-input"
            onChange={handleChange}
          />

          <button className="login-btn">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;