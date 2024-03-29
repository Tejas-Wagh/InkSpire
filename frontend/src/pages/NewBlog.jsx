import React, { useState } from "react";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../config";
function NewBlog() {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  function handleCancel() {
    navigate("/");
  }
  async function handleSave(title,type,image) {
    const response = await axios.post(
      `${BACKEND_URL}/api/blog/new`,
      {
        title: title,
        image: image,
        author: user.username,
        description: description,
        type:type,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const resData = await response.data;
    console.log(resData);
    navigate("/");
  }

  return (
    <BlogForm
      description={description}
      setDescription={setDescription}
      label={"Save"}
      handleCancel={handleCancel}
      handleUpdate={handleSave}
    />
  );
}

export default NewBlog;
