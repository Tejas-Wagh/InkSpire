import { Button } from "flowbite-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Modal = forwardRef(function Modal({ onProceed, text }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog
      ref={dialog}
      className="pt-8 pb-7 rounded-lg shadow-2xl w-[450px] dark:bg-gray-800 dark:border-none dark:text-white border-2 border-gray-300"
    >
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
      <p className="mt-4 text-gray-700 text-opacity-85 text-lg dark:text-white text-center">
        Are you sure {text.toLowerCase()}?
      </p>
      <form method="dialog" className="mt-10 space-x-6 flex pr-6 justify-end">
        <Button color="dark" className="" onClick={onProceed}>
          {"Yes, I'm sure"}
        </Button>

        <button className="bg-white dark:text-black dark:hover:bg-slate-300 text-gray-800 border hover:bg-slate-100 border-gray-600 px-4 rounded-md">
          No, cancel
        </button>
      </form>
    </dialog>
  );
});

export default Modal;
