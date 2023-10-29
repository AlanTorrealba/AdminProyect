import React from "react";
import { useNavigate } from "react-router-dom";
import { AsideBar, SidebarItem } from "./AsideBar";
import { FaPowerOff, FaHome, FaChartBar, FaList } from "react-icons/fa";
function Home() {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    window.localStorage.removeItem("user"), navigate("/");
  };
  return (
    <div>
      <div className="grid grid-cols-12 ">
        <div className="col-span-1">
          <div className="inline-block">
            <AsideBar>
              <SidebarItem
                icon={<FaHome icon={{ name: "coffee", style: "regular" }} />}
                text="Inicio"
              />
              <SidebarItem
                icon={<FaChartBar icon={{ name: "coffee", style: "regular" }} />}
                text="Graficas"
              />
              <SidebarItem
                icon={<FaList icon={{ name: "coffee", style: "regular" }} />}
                text="Reportes"
              />
              <SidebarItem
                icon={<FaHome icon={{ name: "coffee", style: "regular" }} />}
                text="Inicio"
              />
            </AsideBar>
          </div>
        </div>
        <div className="col-start-12  mt-2">
          <FaPowerOff
            className="h-6 w-6 justify-center leading-6  hover:text-red-500 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            onClick={handleClickLogout}
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
