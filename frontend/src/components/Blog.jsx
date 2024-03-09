import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

import { Card } from 'flowbite-react';

function Blog({ image, title, description, author, date, id }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/details/${id}`);
  }

  const desc = description.trim();
  const formattedDesc=   desc.length > 50
  ? desc.trim().slice(0, 120) + "..."
  : desc;
  

  return (
    // <div className="flex flex-col bg-white border-2 border-teal-100  shadow-md dark:border-gray-800 rounded-lg px-2 py-2 gap-4 dark:bg-black dark:text-white">
    //   <div className="h-full">
    //     <img src={image} alt="Blog-Image" className="w-full h-full object-cover hover:scale-105 transition hover:duration-200 " />
    //   </div>

    //   <div className="px-2 h-full">
    //     <h1 className=" text-2xl font-bold text-gray-700  mt-1 dark:text-white">{title}</h1>
    //     <div className="text-slate-400 mt-2 dark:text-white" dangerouslySetInnerHTML={{__html:formattedDesc}}></div>
    //     <p className="mt-3 text-gray-700 font-bold">By {author}</p>
    //     <p className="mt-1 text-slate-400">{new Date(date).toLocaleString()}</p>
    //     <button className="order-2 my-3 w-full bg-gray-800  dark:bg-slate-900 px-2 py-4 rounded-md text-white hover:bg-gray-950 hover:text-white  dark:hover:text-white dark:hover:bg-slate-800" onClick={handleClick}>Read More</button>
    //   </div>
    // </div>

    <Card
      className="max-w-sm"
      renderImage={() => (
        <img
          width={500}
          height={500}
          src={image}
          alt="image 1"
          className="hover:scale-105 duration-150 transition rounded-md"
        />
      )}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       {title}
      </h5>
      <p className="font-normal text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{__html:formattedDesc}}>
      </p>
      <p className="font-normal text-black dark:text-gray-400 text-sm" >
        {new Date(date).toLocaleString()}
      </p>
      <button className=" w-full bg-gray-800  dark:bg-slate-900 px-2 py-4 rounded-md text-white hover:bg-gray-950 hover:text-white  dark:hover:text-white dark:hover:bg-slate-800 " onClick={handleClick}>Read More</button>

    </Card>
  );
}

export default Blog;
