import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser, toggleLoginPopup } from "../store/slice/UserSlice";


const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const user = JSON.parse(decodeURIComponent(params.get("user")));

    if (token && user) {
      localStorage.setItem("token", token); 
      dispatch(setUser(user)); 
      dispatch(toggleLoginPopup());
      toast.success("Successfully Logged In!");
      navigate("/");
    } else {
      toast.error("Google login failed!");
      navigate("/");
    }
  }, [dispatch , navigate , location]);

  return <div className="text-center mt-20 text-xl">Logging you in...</div>;
};

export default OAuthSuccess;
