import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/userslice";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth.jsx";
import { BACKEND_URL } from "../config.js";

function Login() {
  const { user, isLoading, isError } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const email = formdata.get("email");
    const password = formdata.get("password");

    try {
      dispatch(userActions.signInStarted());

      const response = await axios.post(
        `${BACKEND_URL}/api/auth/signin`,
        {
          email,
          password,
        }
      );

      if (response.status != 200) {
        dispatch(userActions.signInFailed());
        return;
      }
      const data = await response.data;
      localStorage.setItem("token",data.jwt);
      dispatch(userActions.signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(userActions.signInFailed());
      setTimeout(() => {
        dispatch(userActions.reset());
      }, 2000);
    }
  };

  return (
    <div className="dark:bg-black p-12 h-screen">
      <div className=" max-w-md mx-auto ">
        <h1 className="text-center text-3xl font-bold my-8 dark:text-white text-gray-700">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {isLoading ? "Signing In" : "Sign In"}{" "}
          </button>
          <OAuth />
          <div className="flex gap-2 my-1">
            <p className="dark:text-white">Dont have an account?</p>
            <Link to={"/signup"} className="text-blue-900 font-normal dark:text-teal-500">
              Sign Up
            </Link>
          </div>
          {isError && (
            <p className="text-red-400">
              An Error Occured, Please Provide Correct Credentials
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
