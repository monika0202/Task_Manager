import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

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

    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-80"
      >

        <h1 className="text-2xl font-bold mb-4">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

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
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;