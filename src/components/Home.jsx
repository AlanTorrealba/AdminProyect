import { useState, useEffect } from "react";
import CardBar from "./CardBar";


function Home() {
  
  return (
    <div className="flex flex-wrap justify-evenly overflow-hidden">
      <CardBar valor="100" tiempo="200" />
      <CardBar valor="100" tiempo="300"/>
      <CardBar valor="100"  tiempo="100"/>
    </div>
  );
}
export default Home;
