import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Avatar, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "flowbite-react";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../store/themeslice";
function MainNavigation() {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <Navbar className="flex justify-between items-center mb-0 p-4 bg-slate-[25] text-black  border-b  border-gray-100 shadow-sm bg-slate-[25] dark:bg-gray-900 dark:text-white">
      <h1 className="font-semibold  sm:text-2xl text-xl md:text-3xl  hover:scale-105 transition duration-150 md:ml-8">
       <Link to={"/"}> <span className="text-cyan-800">Ink</span>Spire</Link>
      </h1>

      <div className="flex sm:space-x-6 space-x-3  md:order-2">
        <Button
          className="w-12 h-10  sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme == "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Link to="/login">
          <Button gradientDuoTone="purpleToBlue" outline >
            Sign In
          </Button>
        </Link>

        {user?.email && (
          <NavLink to={"/profile"} className={"flex items-center"}>
            {/* <img
              src={user.profilePicture}
              alt="Profile"
              className="sm:w-10 sm:h-10 h-7 w-7 object-cover rounded-full hover:scale-110 hover:duration-150 transition"
            /> */}
             <Avatar
                  placeholderInitials={user?.username[0]}
                  rounded
                  size="md"
                  className="text-black font-extrabold text-lg"
                />
          </NavLink>
        )}

        <Navbar.Toggle />
      </div>

      {/* <div>
        <ul className="flex md:gap-8 gap-4 md:mr-6"></ul>
        <Navbar.Toggle />
      </div> */}

      <Navbar.Collapse>
        <Navbar.Link as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        {user?.email && (
          <Navbar.Link as={"div"}>
            <Link to="/new">New Blog</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavigation;
