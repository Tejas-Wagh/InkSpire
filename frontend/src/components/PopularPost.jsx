import React from "react";
import { MdOutlineReadMore } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";

function PopularPost({ mostPopularPost }) {
  const formattedDesc = mostPopularPost.description.slice(0, 300);

  return (
    <div className="w-full space-y-5 md:space-y-8 px-4 md:px-20 sm:px-12">
      <div className="text-2xl text-slate-500 font-semibold dark:text-white">
        Most Popular
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-6 md:space-y-0">
        <div>
          <img
            className="w-[770px] md:w-[70rem] rounded-md object-cover shadow-md dark:border dark:border-slate-50"
            src={mostPopularPost.image}
            alt={mostPopularPost.title}
          />
        </div>
        <div className="md:space-y-6 space-y-2 ">
          <div className="flex justify-between">
            <div className="text-2xl font-semibold dark:text-white">
              {mostPopularPost.title}
            </div>
            <div className="flex gap-2">
              <Avatar
                placeholderInitials={mostPopularPost?.author?.["username"][0].toUpperCase()}
                rounded
                size="sm"
              />
              <div className="font-thin dark:text-white">
                {mostPopularPost.author?.["username"]}
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: formattedDesc }}
            className="text-gray-400 md:pb-10 pb-6 dark:text-gray-200"
          ></div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center dark:text-white">
              <FaRegEye className="text-lg" />
              {mostPopularPost.views}
            </div>
            <div className="flex gap-2 items-center dark:text-white">
              <Link to={"/details/" + mostPopularPost.id} className="">
                <MdOutlineReadMore className="text-2xl hover:scale-110 duration-150" />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularPost;
