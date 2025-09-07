import { Link } from "react-router-dom";
import { SidebarItem } from "./AsideBar";
import { FaHome, FaChartBar, FaList } from "react-icons/fa";
function ItemsSideBar() {
  return (
    <>
        <Link to="/home">
      <SidebarItem
        icon={<FaHome icon={{ name: "coffee", style: "regular" }} />}
        text="Inicio"
        />
        </Link>
        <Link to="/pedidos">
      <SidebarItem
        icon={<FaList icon={{ name: "coffee", style: "regular" }} />}
        text="Pedidos"
        />
        </Link>

        <Link to="/grafic">

      <SidebarItem
        icon={<FaChartBar icon={{ name: "coffee", style: "regular" }} />}
        text="Graficas"
        />
        </Link>
      <SidebarItem
        icon={<FaList icon={{ name: "coffee", style: "regular" }} />}
        text="Reportes"
      />
      <SidebarItem
        icon={<FaHome icon={{ name: "coffee", style: "regular" }} />}
        text="Inicio"
      />
    
    </>
  );
}

export default ItemsSideBar;
