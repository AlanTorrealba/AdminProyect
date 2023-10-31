import { useLocation } from "react-router-dom";
import MyRoutes from "./routers/MyRoutes";
import { AsideBar, SidebarItem } from "./components/AsideBar";
import ItemsSideBar from "./components/ItemsSideBar";
import useSidebarStore from "./context/sideBarExpanden";
function App() {
  const expanded = useSidebarStore((state) => state.expanded);
  const location = useLocation();
  const isLogin = location.pathname === "/";
  return (
    <div>
      <div className={`${!isLogin ? "grid grid-cols-12 grid-rows-6 row-span-6 " : ""}`}>
        {isLogin ? null : (
          <div className={`row-span-6 ${expanded ? "col-span-2" : "col-span-1" }` }>
            <div className="inline-block">
              <AsideBar>
                <ItemsSideBar />
              </AsideBar>
            </div>
          </div>
        )}
        <div className={`transition-all ${expanded ? "col-start-3 " : "col-start-2 "}h-10 col-span-full bg-indigo-700`}>
        </div>
        <MyRoutes/>
      </div>
    </div>
  );
}

export default App;
