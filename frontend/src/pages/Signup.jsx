import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import "./signup.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",
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

      await API.post(
        "/auth/signup",
        formData
      );

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      alert(error.response.data.message);
    }
  };


  return (

    <div className="signup-container">

      <div className="signup-card">

        {/* GIF */}
        <div className="gif-container">

          <iframe
            src="https://tenor.com/embed/5834748043498907593"
            className="signup-gif"
            allowFullScreen
          ></iframe>

        </div>


        {/* TITLE */}
        <h1 className="signup-title">
          Create Account ✨
        </h1>

        <p className="signup-subtitle">
          Signup to manage your tasks
        </p>


        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="signup-input"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="signup-input"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="signup-input"
            onChange={handleChange}
          />

          <button className="signup-btn">
            Signup
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;
