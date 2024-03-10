import React from "react";

function About() {
  return (
    <>
      <div className="pt-20 px-6 sm:px-20 mx-auto md:h-screen h-full dark:bg-black pb-4 dark:text-white">
        <h1 className="text-3xl font-semibold text-center">About</h1>
        <div className="my-5 p-3 opacity-95 md:w-[950px] mx-auto">
          {" "}
          Welcome to our blogging website! We provide a platform for passionate
          writers and avid readers to connect, share ideas, and explore a wide
          range of topics. Our website is designed with functionality that
          enhances your blogging experience, including:
          <ul className="mt-2">
            <li className="mb-2">
            <span className="font-semibold">1. Authentication </span>: Create a personalized account to unlock access to
              exclusive features, interact with other users, and manage your own
              blog posts.
            </li>
            <li className="mb-2">
            <span className="font-semibold">2. Dark and Light Mode </span>: Customize your reading experience with our
              dynamic theme options. Switch between dark and light modes to suit
              your preferences and reduce eye strain during extended reading
              sessions.
            </li>
            <li className="mb-2">
            <span className="font-semibold">3. Loading Skeleton </span>: Enjoy a seamless browsing experience with our
              loading skeleton feature, which provides a smooth transition
              between pages and ensures faster load times for a more responsive
              user interface.
            </li>
            <li className="mb-2">
            <span className="font-semibold">4. Comment Section</span> : Engage with fellow readers and authors by
              leaving comments on blog posts. Share your thoughts, ask
              questions, and participate in discussions to connect with
              like-minded individuals from around the world.
            </li>
            <li className="mb-2">
              <span className="font-semibold">5. Filter Blogs by Categories</span> : Explore our diverse collection of
              blog posts organized into categories for easy navigation. Filter
              content based on your interests and discover new topics to inspire
              your writing or expand your knowledge.
            </li>
            <li >
             <span className="font-semibold">6. Create, Update, and Delete Blogs </span>: Take control of your blogging
              journey by creating, editing, and deleting your own blog posts.
              Share your thoughts, experiences, and expertise with our community
              and showcase your unique perspective on the world. Whether you're
              a seasoned blogger looking to share your insights or a curious
              reader eager to explore new ideas, our blogging website provides
              the perfect platform to connect, learn, and grow. Join us today
              and become part of our vibrant community of writers and readers
              passionate about the power of words.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
