import React from "react";
import { useNavigate } from "react-router-dom";
import {AsideBar, SidebarItem} from "./AsideBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
function Home() {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    window.localStorage.removeItem("user"), navigate("/");
  };
  return (
    
    <div>
      <div className="grid grid-cols-12">
        <div className="bg-cyan-500 col-span-2 h-screen"><AsideBar><SidebarItem  icon={<FontAwesomeIcon icon={icon({name: 'coffee', style: 'regular'})} /> } text="Inicio"/></AsideBar></div>
       <div className="col-start-12 mt-2">
       <button
            className=" w-34 justify-center rounded-md bg-teal-500 text-white px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none "
            onClick={handleClickLogout}
          >
            Logout
          </button>
       </div>
      </div>
    </div>
  );
}
export default Home;
