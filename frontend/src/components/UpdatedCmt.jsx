import React, { useState, useRef } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import Modal from "./Modal";
import { BACKEND_URL } from "../config";

function UpdatedCmt({
  deleteComment,
  content,
  email,
  id,
  likes,
  isLiked,
  userId,
}) {
  const user = useSelector((state) => state.user.user);
  const [editable, setEditable] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);
  const [liked, setLiked] = useState(isLiked);
  const [updatedDescription, setUpdatedDescription] = useState(content);
  const dialog = useRef();

  async function handleLike(id) {
    setLiked((prev) => !prev);
    const newLiked = !liked;
    const amount = newLiked == true ? 1 : -1;
    setNumLikes((prevCount) => prevCount + amount);
    const response = await axios.post(
      `${BACKEND_URL}/api/blog/post/comment/${id}`,
      {
        amount: amount,
        email: user.email,
      }
    );
  }
  function handleChange(e) {
    setUpdatedDescription(e.target.value);
  }

  async function updateHandler() {
    setEditable((prev) => !prev);
    const response = await axios.put(
      `${BACKEND_URL}/api/blog/post/comment/${id}`,
      {
        content: updatedDescription,
      }
    );
    const resData = await response.data;
    console.log(resData);
  }

  function handleCancel() {
    setEditable((prev) => !prev);
  }

  function handleDelete() {
    dialog.current.open();
  }
  return (
    <>
      <Modal
        text="You want to delete the comment"
        onProceed={deleteComment}
        ref={dialog}
      />
      <div className="p-3  dark:bg-gray-500  border border-gray-300 flex-col rounded-lg shadow-sm  space-y-2 mb-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center justify-center">
            <div class="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-600 dark:text-gray-300">
                {email[0]}
              </span>
            </div>
            <p className="text-sm">{email}</p>
          </div>

          {userId == user?.id && (
            <div className="flex gap-4">
              <button
                className="hover:scale-110 duration-150 transition"
                onClick={() => setEditable((prev) => !prev)}
              >
                <FaRegEdit />
              </button>
              <button
                className="hover:scale-110 duration-150 transition"
                onClick={handleDelete}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          )}
        </div>

        {!editable && <div className="text-lg">{updatedDescription}</div>}
        {editable && (
          <div className="flex flex-col gap-4">
            {" "}
            <input
              type="text"
              id="content"
              name="content"
              defaultValue={updatedDescription}
              className="bg-gray-200 dark:text-black border-none focus:outline-none  rounded-lg py-3 px-4 w-full md:w-[750px] placeholder:text-lg placeholder:text-gray-700 "
              onChange={handleChange}
            />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <p>{numLikes}</p>
            <button
              disabled={!user}
              className="hover:scale-110 transition duration-150"
              onClick={() => handleLike(id)}
            >
              {liked ? <AiFillLike /> : <AiOutlineLike width={50} />}
            </button>
          </div>
          {editable && (
            <div className="flex gap-3">
              <Button
                outline
                gradientDuoTone="pinkToOrange"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                outline
                gradientDuoTone="purpleToBlue"
                onClick={updateHandler}
              >
                Update
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdatedCmt;
