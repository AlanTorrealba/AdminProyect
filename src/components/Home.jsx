import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
function Home() {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    window.localStorage.removeItem("user"), navigate("/");
  };
  const items = []; // Aquí creamos un array para almacenar los elementos que deseamos generar

  for (let index = 0; index < 25; index++) {
    items.push(
      <div key={index} className="m-1 w-40 h-12 text-center justify-center bg-sky-800 rounded-t">
         {index}
      </div>
    );
  }
  return (
    <div className="flex ">
      <div className="flex flex-wrap justify-around">

    {items}
      </div>
    </div>
  );
}
export default Home;
