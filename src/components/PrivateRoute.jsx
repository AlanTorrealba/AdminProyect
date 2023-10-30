import {  Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../context/authStore";

function PrivateRoute({ children, ...props }) {
    
    const turnFromLocalStorage = window.localStorage.getItem("user");
  if(!turnFromLocalStorage){
    return <Navigate to="/" replace/>
  }

  return <Outlet/>


    // return isAuthenticated ? (
    //   <Navigate to="/home" replace />
    // ) : (
    //   <Navigate to="/" replace />
    // );
  }
  
  
  export default PrivateRoute;