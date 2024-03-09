import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import TypeSkeleton from "../components/TypeSkeleton";
import FooterSection from "../components/Footer";
function PostsByType() {
  const params = useParams();
  const type = params.type;
  const user = useSelector((state)=>state.user.user);
  const navigate=useNavigate();

  const { data, isLoading,isFetching } = useQuery({
    queryKey: ["posts", type],
    queryFn: () => loadPosts(type),
  });

  function handleSubmit(){
    if(user?.email){
        navigate("/new")
    }else{
        navigate("/login")
    }
  }

  if(isLoading ){
   return  <TypeSkeleton type={type}/>
  }

  return (
    <>
    <div className="space-y-12 md:space-y-24 px-4 py-12 md:px-20 md:pt-24 md:pb-48 dark:bg-black dark:text-white">
      <div className="text-3xl text-slate-700 text-center font-bold dark:text-white ">
        {type}
      </div>
      {data?.length > 0 ? (
        data.map((post) => <BlogCard post={post} key={post.id} />)
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-10 h-full">
            <MdErrorOutline className="text-4xl"/>
             <p className="text-center text-xl text-slate-700">No posts yet, go ahead and <button className="text-cyan-700 font-semibold  underline" onClick={handleSubmit}>Add One</button></p>
        </div>
       
      )}
    </div>
    <FooterSection/>
    </>
  );
}

export default PostsByType;

const loadPosts = async (type) => {
  const response = await axios.get(`${BACKEND_URL}/api/blog/posts/${type}`);
  const resData = await response.data;
  return resData;
};





