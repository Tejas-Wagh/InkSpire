import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userslice.js";
import { BACKEND_URL } from "../config.js";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sendSignUpReq = async (username, email, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        username,
        email,
        password,
      });
      const resData = await response.data;
      localStorage.setItem("token", resData.jwt);
      dispatch(userActions.signInSuccess(resData.user));
    } catch (error) {
      dispatch(userActions.signInFailed());
      setTimeout(() => {
        dispatch(userActions.reset());
      }, 2000);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const email = formdata.get("email");
    const username = formdata.get("username");
    const password = formdata.get("password");
    sendSignUpReq(username, email, password).then(() => navigate("/"));
  }
  return (
    <div className="dark:bg-black p-12  h-screen">
      <div className=" max-w-md mx-auto ">
        <h1 className="text-center text-3xl font-bold my-8 dark:text-white text-gray-700">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="bg-white border border-gray-500 p-3 rounded-md outline-none"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="bg-white border border-gray-500 p-3 rounded-md outline-none"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-white border border-gray-500 p-3 rounded-md "
          />
          <button className="bg-gray-900  dark:hover:bg-opacity-85 hover:scale-105 duration-200 text-white text-xl hover:opacity-90 p-3 rounded-md disabled:placeholder-opacity-80">
            Sign Up
          </button>
          <OAuth />
          <div className="flex gap-2 my-1">
            <p className="dark:text-white">have an account?</p>
            <Link to={"/login"} className="text-blue-900 font-normal dark:text-teal-500">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
