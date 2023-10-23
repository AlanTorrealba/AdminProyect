
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
       <Route exact path="/" element={<Login />} />
      <Route element={<PrivateRoute/>}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
