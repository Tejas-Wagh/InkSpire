import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLogoGoogle } from "react-icons/bi";
import { BACKEND_URL } from "../config";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${BACKEND_URL}/api/auth/google`,
        {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );
      const data = await response.data;
      localStorage.setItem("token",data.jwt);
      dispatch(userActions.signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      console.log("Couldn't login with google", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-white hover:scale-105 duration-200  hover:bg-slate-50 p-3 text-black border border-black uppercase rounded-md flex items-center justify-center gap-2"
    >
      <BiLogoGoogle className="text-xl"/>Continue with Google
    </button>
  );
}

export default OAuth;
