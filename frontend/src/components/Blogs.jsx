import React from "react";
import { useQuery } from "@tanstack/react-query";
import Blog from "./Blog";
import axios from "axios";
import PopularPost from "./PopularPost";
import { Button } from "flowbite-react";
import { BACKEND_URL } from "../config";
import HomeLoading from "./HomeLoading";
import { useNavigate } from "react-router-dom";
import FooterSection from "./Footer";
function Blogs() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Posts"],
    queryFn: getPosts,
  });
  const navigate = useNavigate();

  const MostPopularPost = data?.sort((a, b) => b["views"] - a["views"]);

  if (isLoading) {
    return <HomeLoading />;
  }

  if (isError) {
    return <p>An error occured!</p>;
  }

  if (data.length == 0) {
    return <p>No posts available</p>;
  }

  function handleSubmit(slug) {
    navigate("/posts/" + slug);
  }

  return (
    <div className="dark:bg-black">
      <PopularPost mostPopularPost={MostPopularPost[0]} />
      <div className="w-full  md:mt-24 mt-20 flex flex-col md:gap-11 gap-8 sm:px-12 md:px-0">
        <div className="text-2xl font-semibold md:ml-24 ml-3 text-slate-500 dark:text-white">
          Categories
        </div>

        <div className="grid lg:grid-cols-12 sm:grid-cols-3 grid-cols-2 md:gap-52 gap-4 md:pl-32 px-8">
          <Button
            color="dark"
            className="md:w-40 w-44 py-3"
            onClick={() => handleSubmit("Sports")}
          >
            Sports
          </Button>
          <Button
            color="gray"
            className="md:w-40 py-3 w-44"
            onClick={() => handleSubmit("Finance")}
          >
            Finance
          </Button>
          <Button
            gradientMonochrome="pink"
            className="md:w-40 w-44 py-3"
            onClick={() => handleSubmit("Medical")}
          >
            Medical
          </Button>
          <Button
            gradientMonochrome="info"
            className="md:w-40 w-44 py-3"
            onClick={() => handleSubmit("Entertainment")}
          >
            Entertainment
          </Button>
          <Button
            className="md:w-40 w-44 py-3"
            onClick={() => handleSubmit("Fitness")}
          >
            Fitness
          </Button>
          <Button
            gradientMonochrome="purple"
            className="md:w-40 w-44 py-3"
            onClick={() => handleSubmit("Coding")}
          >
            Coding
          </Button>
        </div>
      </div>

      {/* <div className=" pb-7 text-2xl font-semibold  text-slate-500 md:ml-24 ml-3 ">All Posts</div> */}
      <div className="grid grid-cols-1 pt-28 md:grid-cols-1 lg:grid-cols-4 sm:grid-cols-1  gap-20 dark:bg-black dark:text-white md:px-16 md:pb-24 sm:px-36 px-14 md:mt-8">
        {data?.map((post) => (
          <Blog
            image={post.image}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
            key={post.id}
            id={post.id}
          />
        ))}
      </div>
      <div className="bg-slate-200">
        <FooterSection />
      </div>
    </div>
  );
}

export default Blogs;

export async function getPosts() {
  const response = await axios.get(`${BACKEND_URL}/api/blog/posts`);
  const resData = await response.data;

  return resData;
}
