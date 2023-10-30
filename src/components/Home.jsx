import { useNavigate } from "react-router-dom";
import { FaPowerOff} from "react-icons/fa";
function Home() {
  const navigate = useNavigate();
  const handleClickLogout = () => {
    window.localStorage.removeItem("user"), navigate("/");
  };
  return (
    <div className="col-start-12  mt-2">
    <h1>Home</h1>
    </div>
  );
}
export default Home;
