import { Avatar } from "flowbite-react";
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineReadMore } from "react-icons/md";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  const formattedDesc = post.description.slice(0, 300);
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-x-6 md:space-y-0">
      <div>
        <img
          className="w-[770px] md:w-[70rem] rounded-md  shadow-md dark:border dark:border-slate-50"
          src={post.image}
          alt={post.title}
        />
      </div>
      <div className="md:space-y-6 space-y-2 ">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold dark:text-white">
            {post.title}
          </div>
          <div className="flex gap-2">
            <Avatar
              placeholderInitials={post?.author?.["username"][0]}
              rounded
              size="sm"
            />
            <div className="font-normal dark:text-white">
              {post.author?.["username"]}
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: formattedDesc }}
          className="text-gray-500 md:pb-10 pb-2  dark:text-gray-200"
        ></div>
        <div className="flex justify-between pb-4 md:pb-0">
          <div className="flex gap-2 items-center dark:text-white">
            <FaRegEye className="text-lg" />
            {post.views}
          </div>
          <div className="flex gap-2 items-center dark:text-white">
            <Link to={"/details/" + post.id} className="">
              <MdOutlineReadMore className="text-2xl hover:scale-110 duration-150" />{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
