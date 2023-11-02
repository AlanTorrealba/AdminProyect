import { useNavigate } from "react-router-dom";
import { FaPowerOff} from "react-icons/fa";
function Home() {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    window.localStorage.removeItem("user"), navigate("/");
  };
  return (
    <div className="basis-full">
    <h1>Home</h1>
    </div>
  );
}
export default Home;
