import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import "./signup.css";

function Signup() {

  const navigate = useNavigate();



  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  
  const validateEmail = (email) => {

    return /\S+@\S+\.\S+/
      .test(email);
  };


 
  const handleSubmit =
    async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");



    if (!name.trim()) {

      setError(
        "Name is required"
      );

      return;
    }



    if (!email.trim()) {

      setError(
        "Email is required"
      );

      return;
    }

    if (!validateEmail(email)) {

      setError(
        "Enter a valid email"
      );

      return;
    }


  
    if (!password) {

      setError(
        "Password is required"
      );

      return;
    }

    if (password.length < 6) {

      setError(
        "Password must be at least 6 characters"
      );

      return;
    }



    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;
    }


    try {

      await API.post(
        "/auth/signup",
        {
          name,
          email,
          password
        }
      );

      setSuccess(
        "Signup successful!"
      );


    
      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch (error) {

      setError(

        error.response?.data?.message ||

        "Signup failed"
      );
    }
  };


  return (

    <div className="signup-container">

      <div className="signup-card">

        <div className="gif-container">

          <iframe
            src="https://tenor.com/embed/5834748043498907593"
            className="signup-gif"
            allowFullScreen
          ></iframe>

        </div>


   
        <h1 className="signup-title">
          Create Account
        </h1>

        <p className="signup-subtitle">
          Signup to manage your tasks
        </p>


  
        {error && (

          <p className="error-text">
            {error}
          </p>
        )}


     
        {success && (

          <p className="success-text">
            {success}
          </p>
        )}


   
        <form onSubmit={handleSubmit}>

 
          <input
            type="text"
            placeholder="Enter your name"
            className="signup-input"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />


       
          <input
            type="email"
            placeholder="Enter your email"
            className="signup-input"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


 
          <input
            type="password"
            placeholder="Enter your password"
            className="signup-input"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


       
          <input
            type="password"
            placeholder="Confirm password"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />


        
          <button
            className="signup-btn"
          >
            Signup
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;