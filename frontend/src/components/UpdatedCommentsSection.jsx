import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import UpdatedCmt from "./UpdatedCmt";

function UpdatedCommentsSection({ postComments }) {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const content = useRef();

  async function postComment(e) {
    const response = await axios.post(
      `${BACKEND_URL}/api/blog/post/comments/${id}`,
      {
        content: content.current.value,
        userId: user.id,
        postId: id,
        email: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const resData = await response.data;
    console.log(resData);
    setComments([resData, ...comments]);
  }

  function deleteComment(id) {
    const response = axios.delete(`${BACKEND_URL}/api/blog/post/comment/${id}`);
    // const resData = response.data;
    setComments((prev) => prev.filter((c) => c.id != id));
  }

  useEffect(() => {
    setComments(postComments);
  }, [postComments]);

  return (
    <div className="flex flex-col md:w-[850px] sm:w-[450px] w-[300px] gap-8 py-12 bg-slate-[25]">
      <h2 className="text-2xl font-semibold">Comments Section</h2>
      <div>
        {user && (
          <div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
              <input
                ref={content}
                type="text"
                id="comment"
                name="comment"
                placeholder="Write a Comment"
                className="bg-gray-100  dark:text-black rounded-lg py-3 px-4 w-full md:w-[650px] placeholder:text-lg placeholder:text-gray-700 focus:outline-none"
              />
              <button
                className="px-4 py-2 w-[150px] bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-500 rounded-xl text-white focus:outline-none hover:bg-gray-500 hover:scale-110 duration-150 transition "
                onClick={postComment}
              >
                Post
              </button>
            </div>
          </div>
        )}
        {!user && <div>Sign In to post a comment</div>}
      </div>

      {comments?.length == 0 ? (
        <div>No comments yet</div>
      ) : (
        comments?.map((comment) => (
          <UpdatedCmt
            deleteComment={() => deleteComment(comment?.id)}
            userId={comment.userId}
            key={comment.id}
            content={comment?.content}
            email={comment?.email}
            id={comment.id}
            likes={comment.numberOfLikes}
            isLiked={
              comment.likes.find((e) => e == user?.email) != undefined
                ? true
                : false
            }
          />
        ))
      )}
    </div>
  );
}

export default UpdatedCommentsSection;
