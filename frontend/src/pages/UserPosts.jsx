import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import BlogCard from "../components/BlogCard";
import TypeSkeleton from "../components/TypeSkeleton";
import { MdErrorOutline } from "react-icons/md";
import FooterSection from "../components/Footer";

function UserPosts() {
  const params = useParams();
  const navigate= useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => loadPosts(params.id),
  });

  if(isLoading ){
    return  <TypeSkeleton type={"Your Posts"}/>
   }
   

  return (
    <>
      <div className="space-y-12 md:space-y-24 px-4 py-12 md:px-20 md:pt-24 md:pb-48 dark:bg-black dark:text-white">
        <div className="text-3xl text-slate-700 text-center font-bold dark:text-white ">
          Your Posts
        </div>
        {data?.length > 0 ? (
          data.map((post) => <BlogCard post={post} key={post.id} />)
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-10 h-full">
            <MdErrorOutline className="text-4xl" />
            <p className="text-center text-xl text-slate-700">
              No posts yet, go ahead and{" "}
              <button
                className="text-cyan-700 font-semibold  underline"
                onClick={()=>navigate("/new")}
              >
                Add One
              </button>
            </p>
          </div>
        )}
      </div>
      <FooterSection />
    </>
  );
}

export default UserPosts;

async function loadPosts(id) {
  const response = await axios.get(`${BACKEND_URL}/api/blog/userposts/${id}`);
  const resData = await response.data;
  return resData;
}
