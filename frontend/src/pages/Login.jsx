import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

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

    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-80"
      >

        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <button
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;