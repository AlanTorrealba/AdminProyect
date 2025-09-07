import  Grafics  from "./Grafics";

function Graficas() {
  return (
    <div className="grid grid-cols-12 grid-rows-6 h-full justify-around ml-10 gap-5 mx-auto">
      <div className="bg-sky-500 col-span-4 row-span-3 rounded-lg flex justify-center items-center text-center overflow-hidden">
        <Grafics></Grafics>
      </div>
      <div className="bg-sky-500 col-span-2 row-span-1 rounded-lg flex justify-center items-center text-center">
        2
      </div>
      <div className="bg-sky-500 row-start-2 col-start-5 col-span-2 row-span-2 rounded-lg flex justify-center items-center text-center overflow-hidden"></div>
      <div className="bg-sky-500 rounded-lg flex col-start-7 row-span-1 col-span-2 justify-center items-center text-center">
        2
      </div>
      <div className="bg-sky-500 rounded-lg flex col-start-7 row-span-1 col-span-2 justify-center items-center text-center">
        2
      </div>
      <div className="bg-sky-500 rounded-lg flex col-start-7 row-span-1 col-span-2 justify-center items-center text-center">
        2
      </div>
    </div>
  );
}

export default Graficas;
