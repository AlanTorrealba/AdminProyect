import { useState } from "react";
import { UseloginValidation } from "../hooks/UseloginValidation";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/authStore";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";

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
    if (!userName || !password) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Por favor ingrese los datos",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        background: "#ffff",
      });
      return;
    }
    try {
      const loginResult = await UseloginValidation({ userName, password });
      if (!loginResult || loginResult.length === 0) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Los datos son incorrectos",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          background: "#ffff",
        });
        return;
      }
      const user_id = loginResult[0].usuario_id;
      loginResult;
      login();
      window.localStorage.setItem("user", JSON.stringify(user_id));
      navigate("/home");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "exito",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        toast: true,
        background: "#ffff",
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Los datos son incorrectos",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        background: "#ffff",
      });
    }
  };

  return (
    <div className="overflow-hidden min-h-screen">
    <div className="flex items-center justify-center min-h-screen backdrop-blur-sm  ">
      <div className="flex min-h-lg w-96  flex-col justify-center px-6 py-12 lg:px-8 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] bg-gradient-to-r from-cyan-500 to-blue-500 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
            Login
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div className="mt-2">
              <input
                className="appearance-none bg-transparent border-b-2 w-full text-white mr-3 placeholder:text-white py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Usuario"
                onChange={handleChangeUser}
              />
            </div>

            <div className="mt-2">
              <input
                className="appearance-none bg-transparent border-b-2 w-full text-white mr-3 placeholder:text-white py-1 px-2 leading-tight focus:outline-none "
                type="password"
                placeholder="Contraseña"
                onChange={handleChangePassword}
              />
            </div>

            <div className="">
              <Button
                type="submit"
                className="flex w-full justify-center bg-white px-3 py-1.5 text-sm font-bold leading-6 text-white overflow-visible rounded-full hover:-translate-y-1  shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              >
                Iniciar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
