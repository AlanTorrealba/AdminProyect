import { useState, useEffect } from "react";
import CardBar from "./CardBar";
import Tabla from "./Tabla";

function Home() {
  return (
    <div className="flex flex-row flex-wrap ml-10 justify-center items-center">
      <div className="flex flex-wrap overflow-hidden">
        <CardBar valor="100" tiempo="100" />
        {/* <CardBar valor="100" tiempo="200" />
        <CardBar valor="100" tiempo="300" /> */}
      </div>
      <div className="m-10 w-full">
        <Tabla  />
      </div>
    </div>
  );
}
export default Home;
