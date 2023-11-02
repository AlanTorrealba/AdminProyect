import { useLocation } from "react-router-dom";
import MyRoutes from "./routers/MyRoutes";
import { AsideBar } from "./components/AsideBar";
import ItemsSideBar from "./components/ItemsSideBar";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/";
  const navigate = useNavigate();
  const handleClickLogout = () => {
    window.localStorage.removeItem("user"), navigate("/");
  };
  return (
    <div className="">
      <div className={`${!isLogin ? "flex " : ""}`}>
        {isLogin ? null : (
          <div className="inline-block ">
            <AsideBar>
              <ItemsSideBar />
            </AsideBar>
          </div>
        )}
        <div className="flex-row flex-1 ">
          {isLogin ? null : (
            <div className="transition-all h-10 flex justify-between items-center p-5">
              <input
                className="w-60 appearance-none bg-transparent border-2 border-sky-500 rounded-r-lg  focus:outline-none"
                type="input"
                placeholder="Buscar"
              />
              <span>
                <FaPowerOff
                  className="h-6 w-6 justify-center leading-6  hover:text-red-500 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                  onClick={handleClickLogout}
                />
              </span>
            </div>
          )}

          <div id="4"
            className={`${
              !isLogin ? "flex justify-center h-5/6 bg-indigo-400" : ""
            }`}
          >
            <div className={`${!isLogin ? "container " : ""}`}>
              <div
                className={`${
                  !isLogin ? "grid grid-cols-12 grid-rows-6 h-full " : ""
                }`}
              >
                <MyRoutes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
