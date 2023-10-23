import { useState } from "react";
import { UseloginValidation } from "../hooks/UseloginValidation";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/authStore";

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
    try {
      const loginResult = await UseloginValidation({ userName, password });
      loginResult
        ? (login(),
          window.localStorage.setItem("user", JSON.stringify("true")),
          navigate("/home"),
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "exito",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,
            background: "#ffff",
          }))
        : Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Los datos son incorrectos",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            background: "#ffff",
          });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              <button className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ">
                Iniciar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
