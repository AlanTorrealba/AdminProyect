import { useNavigate } from "react-router-dom";
import { FaPowerOff} from "react-icons/fa";
function Home() {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    window.localStorage.removeItem("user"), navigate("/");
  };
  return (
    <div className="col-start-12  mt-2">
      <FaPowerOff
        className="h-6 w-6 justify-center leading-6  hover:text-red-500 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
        onClick={handleClickLogout}
      />
    </div>
  );
}
export default Home;
