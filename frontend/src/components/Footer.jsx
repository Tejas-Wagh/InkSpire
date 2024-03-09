import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function FooterSection() {
  return (
    <Footer container className="bg-slate-100 rounded-none dark:bg-slate-900 ">
      <div className="w-full text-center ">
        <div className="w-full flex sm:items-center justify-between px-4 md:px-12 py-2">
          <h2 className="text-2xl text-gray-800 font-semibold dark:text-white">
            InkSpire
          </h2>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            {/* <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} /> */}
            <Footer.Icon href="https://github.com/Tejas-Wagh" icon={BsGithub} />
          </div>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="TejasWagh" year={2024} />
      </div>
    </Footer>
  );
}
