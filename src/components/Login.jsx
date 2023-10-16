import { useState } from "react";
import { UseloginValidation } from "../hooks/UseloginValidation";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/authStore";
import "./login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();
  const handleChangeUser = (event) => {
    const newUser = event.target.value;
    setUserName(newUser);
  };
  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResult = await UseloginValidation({ userName, password });
      loginResult ? (login(), navigate("/home")) : console.log("Error");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formLogin">
      <h1>Login</h1>
      <div>
        <form action="" className="formBody" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            onChange={handleChangeUser}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={handleChangePassword}
          />
          <button>Iniciar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
