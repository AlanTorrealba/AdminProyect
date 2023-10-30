import { useLocation } from "react-router-dom";
import MyRoutes from "./routers/MyRoutes";
import { AsideBar, SidebarItem } from "./components/AsideBar";
import ItemsSideBar from "./components/ItemsSideBar";

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/";
  return (
    <div>
      <div className={`${!isLogin ? "grid grid-cols-12 " : ""}`}>
        {isLogin ? null : (
          <div className="col-span-1">
            <div className="inline-block">
              <AsideBar>
                <ItemsSideBar />
              </AsideBar>
            </div>
          </div>
        )}
        <MyRoutes />
      </div>
    </div>
  );
}

export default App;
