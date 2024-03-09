import React from "react";
import { Button } from "flowbite-react";
import BlogsSkeleton from "./BlogsSkeleton";

function HomeLoading() {
  return (
    <>
      <div className="text-2xl text-slate-500 font-semibold dark:bg-black px-20 pb-5 ">
        Most Popular
      </div>

      <div>
        <div
          role="status"
          className="space-y-8  md:space-y-0 md:space-x-10 rtl:space-x-reverse md:flex md:items-center px-20 dark:bg-black"
        >
          <div class="flex items-center justify-center md:w-[61rem] h-[15rem] bg-gray-300 rounded sm:w-96 w-full dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div class="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div className="w-full  pt-14 flex flex-col md:gap-11 gap-8 dark:bg-black">
        <div className="text-2xl font-semibold md:ml-24 ml-3 text-slate-500 dark:text-white">
          Categories
        </div>

        <div className="grid md:grid-cols-12 grid-cols-2 md:gap-52 gap-4 md:pl-36 px-8 dark:bg-black">
          <Button gradientMonochrome="info" className="md:w-40 w-44 py-3">
            Entertainment
          </Button>
          <Button color="dark" className="md:w-40 w-44 py-3">
            Sports
          </Button>
          <Button color="gray" className="md:w-40 py-3 w-44">
            Finance
          </Button>
          <Button className="md:w-40 w-44 py-3">Failure</Button>
          <Button gradientMonochrome="purple" className="md:w-40 w-44 py-3">
            Coding
          </Button>
          <Button gradientMonochrome="pink" className="md:w-40 w-44 py-3">
            Lime
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 pt-28 md:grid-cols-1 lg:grid-cols-4 sm:grid-cols-1  gap-20 dark:bg-black dark:text-white md:px-14 md:pb-24 px-14">
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
      </div>
    </>
  );
}

export default HomeLoading;