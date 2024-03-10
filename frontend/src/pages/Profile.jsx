import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userslice";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { BACKEND_URL } from "../config";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Avatar, Button } from "flowbite-react";
axios.defaults.withCredentials = true;

function Profile() {
  const { user, isLoading, isError } = useSelector((state) => state.user);
  const [username,setUsername]=useState(user?.username);
  const [email,setEmail]=useState(user?.email);
  const [password,setPassword]=useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteDialog = useRef();
  const signoutDialog = useRef();
  const updateDialog = useRef();
  


  async function handleSubmit() {
    try {
      dispatch(userActions.signInStarted());
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/update/${user.id}`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const resData = await response.data;
      dispatch(userActions.updateSuccess(resData));
      navigate("/");
    } catch (error) {
      dispatch(userActions.updateFailed());
      setTimeout(() => {
        dispatch(userActions.reset());
      }, 2000);
    }
  }

  function handleDeleteClick() {
    deleteDialog.current.open();
  }

  function handleSignOutClick() {
    signoutDialog.current.open();
  }

  async function handleDelete() {
    try {
      dispatch(userActions.deleteStarted());
      const response = await axios.get(
        `${BACKEND_URL}/api/auth/delete/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(userActions.deleteSuccess());
      navigate("/signup");
    } catch (error) {
      dispatch(userActions.deleteFailed());
      setTimeout(() => {
        dispatch(userActions.reset());
      }, 2000);
    }
  }

  async function handleSignOut() {
    try {
      localStorage.removeItem("token");
      dispatch(userActions.signOutSuccess());
      navigate("/signup");
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpdateClick(){
    updateDialog.current.open();
  }

  return (
    <>
      <Modal
        onProceed={handleDelete}
        text="You want to delete the user"
        ref={deleteDialog}
      />
      <Modal
        onProceed={handleSignOut}
        text="You want to Log out"
        ref={signoutDialog}
      />
        <Modal
        onProceed={handleSubmit}
        text="You want to update your information"
        ref={updateDialog}
      />

      <div className="dark:bg-black h-screen py-12 px-8 md:px-0 md:py-0">
        <div className="p-3 max-w-lg  mx-auto">
          <h1 className="text-3xl font-semibold text-center mt-7 mb-2 dark:text-white">
            Profile
          </h1>
          <div className="flex flex-col gap-4">
            <img
              src={user.profilePicture || "https://ih1.redbubble.net/image.1046392292.3346/st,small,507x507-pad,600x600,f8f8f8.jpg"}
              alt="profile"
              className="h-24 2-24 self-center cursor-pointer rounded-full object-cover mt-2 "
            />
            {/* <div className="h-24 2-24 mt-2 ">
              <Avatar
                placeholderInitials={user?.username[0]}
                rounded
                size="lg"
                color={"black"}
              />
            </div> */}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="bg-white border border-gray-500 rounded-md p-3 "
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-white border border-gray-500 rounded-md p-3 "
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="bg-white border border-gray-500 rounded-md p-3 "
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <Button
              size={"xl"}
              color="dark"
              className="hover:scale-105 duration-300"
              onClick={handleUpdateClick}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
            <div className="flex justify-between mt-1">
              <span
                className="cursor-pointer hover:scale-110 text-2xl dark:text-white"
                onClick={handleDeleteClick}
              >
                <MdDeleteOutline />
              </span>
              <span
                className=" cursor-pointer hover:scale-110 text-xl dark:text-white"
                onClick={handleSignOutClick}
              >
                <FaSignOutAlt />
              </span>
            </div>

            {isError && <p className="text-red-500">An error occured!</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
