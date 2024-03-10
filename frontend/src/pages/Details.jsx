import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit, FaRegEye, FaUnderline } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { BACKEND_URL } from "../config";
import UpdatedCommentSection from "../components/UpdatedCommentsSection";
import DetailsSkeleton from "../components/DetailsSkeleton";
import { Avatar } from "flowbite-react";

function Details() {
  const params = useParams();
  const dialog = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const id = params.id;

  const { data, isError, isLoading,isFetching } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => loadPost(params.id),
  });

  const alreadyLiked =
    data?.post?.likes.find((e) => e == user?.email) != undefined;
  const [liked, setLiked] = useState(alreadyLiked);
  const formattedDate = new Date(data?.post?.date).toLocaleString();
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(data?.post?.totalLikes);
  }, [data?.post]);

  if (isError) {
    return <p>An error occured!</p>;
  }

  function handleDelete() {
    dialog.current.open();
  }

  async function deleteBlog() {
    const response = await axios.delete(
      `
      ${BACKEND_URL}/api/blog/delete/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const resData = await response.data;
    navigate("/");
  }

  function handleEdit() {
    navigate(`/details/${params.id}/edit`);
  }

  async function handleLike() {
    const amount = liked ? -1 : 1;
    setLikes((prev) => prev + amount);
    setLiked((prev) => !prev);
    const response = await axios.put(
      `${BACKEND_URL}/api/blog/post/like/${params.id}`,
      {
        amount: amount,
        email: user?.email,
      }
    );

    const resData = await response.data;
    console.log(resData);
  }

  if (isLoading || isFetching) {
    return <DetailsSkeleton />;
  }

  return (
    <>
      <Modal
        ref={dialog}
        onProceed={deleteBlog}
        text="You want to delete the blog."
      />
      <div className="w-screen bg-slate-[25] ">
        <div className="flex flex-col items-center justify-center bg-white  px-14 py-10 md:px-24 md:py-20 space-y-8 dark:bg-black dark:text-white ">
          <div className="flex justify-between flex-row  gap-12">
            <div className="md:-ml-96">
              <div className="flex gap-2 items-center mb-3">
                <Avatar
                  placeholderInitials={data?.post?.author?.["username"][0].toUpperCase()}
                  rounded
                  size="sm"
                />
                <h3 className="text-xl md:text-left text-cyan-600">
                  {data?.post?.author?.["username"]}
                </h3>
              </div>

              <p>{formattedDate}</p>
            </div>
            <div className="md:-mr-96 sm:space-x-5 space-y-2 space-x-3">
              <button
                className="sm:text-lg text-sm bg-gray-700 sm:px-6 sm:py-2 px-2 py-1 text-white rounded-lg hover:bg-gray-600 hover:scale-105 duration-200 disabled:bg-gray-600"
                onClick={handleEdit}
                disabled={user?.id != data?.post?.authorId}
              >
                <FaRegEdit />
              </button>
              <button
                className="sm:text-lg text-sm bg-red-700 sm:px-5 sm:py-2 px-2 py-1 text-white rounded-lg hover:bg-red-600 hover:scale-105 duration-200 disabled:bg-gray-600"
                onClick={handleDelete}
                disabled={user?.id != data?.post?.authorId}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
          <h1 className="text-5xl text-center md:w-[700px] leading-snug">
            {data?.post?.title}
          </h1>
          <img
            src={data?.post?.image}
            alt=""
            className="w-[550px] md:w-[850px] rounded-lg object-contain shadow-xl"
          />
          <div className="flex w-full justify-between md:w-[830px]">
            <div className="flex gap-4">
              <h3>{likes}</h3>
              <button
                onClick={handleLike}
                className="flex gap-2"
                disabled={!user}
              >
                {liked ? (
                  <AiFillLike size={"1.5em"} />
                ) : (
                  <AiOutlineLike size={"1.5em"} />
                )}
              </button>
              {/* <FaRegCommentDots size={"1.5em"} /> */}
            </div>
            <div className="flex gap-4">
              <div>
                <FaRegEye size="1.5em" />
              </div>
              <p>{data?.post?.views}</p>
            </div>
          </div>

          <hr className="h-1 border-t-2 w-full md:w-[850px] border-solid" />

          <div
            className=" md:w-[850px] mt-3 post-content"
            dangerouslySetInnerHTML={{ __html: data?.post?.description }}
          ></div>

          <UpdatedCommentSection postComments={data?.postComments} />
        </div>
      </div>
    </>
  );
}

export default Details;

const loadPost = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/blog/post/${id}`);
  const resData = await response.data;
  return resData;
};
