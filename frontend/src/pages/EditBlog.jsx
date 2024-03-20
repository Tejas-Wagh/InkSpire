import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BlogForm from "../components/BlogForm";
import { BACKEND_URL } from "../config";

function EditBlog() {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => loadPost(params.id),
  });
  useEffect(() => {
    setDescription(data?.description);
  }, [data?.description]);
  const disabledTrue = data?.type ? "" : "disabled";

  function handleCancel() {
    navigate("/details/"+params.id);
  }
  async function handleUpdate(title,type,image) {
    const response = await axios.post(
      `${BACKEND_URL}/api/blog/edit/${params.id}`,
      {
        title: title,
        image:image,
        description: description,
        type: type,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    navigate("/details/"+params.id);
  }
  const [description, setDescription] = useState(data?.description || "");
  return (
    <BlogForm
      handleUpdate={handleUpdate}
      handleCancel={handleCancel}
      title={data?.title}
      author={data?.author}
      description={description}
      type={data?.type}
      image={data?.image}
      label={"Update"}
      disabledTrue={disabledTrue}
      setDescription={setDescription}
    />
  );
}

export default EditBlog;

const loadPost = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/blog/post/${id}`);
  const resData = await response.data;
  console.log(resData.post);
  return resData.post;
};
