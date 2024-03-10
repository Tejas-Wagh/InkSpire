import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "flowbite-react";
function BlogForm({
  handleUpdate,
  handleCancel,
  title,
  type,
  author,
  disabledTrue,
  description,
  setDescription,
  image,
  label,
}) {
  console.log(description);
  return (
    <div className="w-screen dark:bg-black flex items-center md:px-36 px-3 justify-center">
      <form
        className="flex flex-col items-center border md:px-36  md:py-16 rounded-md border-pink-300  justify-center  mt-20 md:mx-36 sm:p-14 p-8 space-y-10 w-[500px] md:w-full  dark:bg-gray-950 shadow-2xl  "
        onSubmit={handleUpdate}
      >
        <div>
          <h1 className="text-3xl text-cyan-600 font-semibold dark:text-white">
            {label == "Save" ? "New" : "Update"} Blog
          </h1>
        </div>
        <div className="space-y-4 flex flex-col items-center justify-center">
          <input
            defaultValue={title || ""}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            className="bg-gray-100  rounded-lg py-3 px-4 w-full md:w-[650px] placeholder:text-lg placeholder:text-gray-700 focus:outline-none"
          />
          <select
            defaultValue={type || ""}
            name="type"
            id="type"
            className="w-full md:w-[650px] py-3 px-4 bg-gray-100 rounded-lg"
          >
            <option disabled={disabledTrue}>Select Blog Type</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Coding">Coding</option>
            <option value="Sports">Sports</option>
            <option value="Medical">Medical</option>
            <option value="Fitness">Fitness</option>
            <option value="Finance">Finance</option>

          </select>
          {/* <input
            type="file"
            className="w-full md:w-[550px] px-4 py-3 bg-gray-100 rounded-lg"
          /> */}
          <input
            defaultValue={image || ""}
            type="text"
            id="image"
            name="image"
            placeholder="Image Link :"
            className="bg-gray-100  rounded-lg py-3 px-4 w-full md:w-[650px] placeholder:text-lg placeholder:text-gray-700 focus:outline-none"
          />
          <ReactQuill
            className="md:w-[650px] md:h-[250px]  text-gray-700 text-lg mb-6 dark:text-white"
            theme="snow"
            defaultValue={description}
            value={description}
            onChange={(value) => setDescription(value)}
            preserveWhitespace={true}
          />
          ;
        </div>

        <div className="flex flex-row justify-between md:justify-end md:gap-6 w-full md:w-[650px]">
          <Button outline gradientDuoTone="purpleToPink" onClick={handleCancel} size={"md"}>
            Cancel
          </Button>
          <Button outline gradientDuoTone="pinkToOrange" size={"md"}>
            {label == "Save" ? "Save" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
