import {CircularProgress, Card, CardBody} from "@nextui-org/react";
import { useState, useEffect } from "react";

function CardBar({valor, strokeWidth=4, showValueLabel=true, tiempo}) {
    const [value, setValue] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setValue((v) => (v >= valor ? 0 : v + 1));
  }, tiempo);

  return () => clearInterval(interval);
},[]);
    
  return (
    <Card className="w-60 h-48 bg-gradient-to-br from-sky-500 to-purple-700 ml-10 overflow-hidden">
    <CardBody className="justify-center items-center py-0 overflow-hidden">
      <CircularProgress
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          indicator: value < 90 ? "stroke-white" : "stroke-danger",
          track: "stroke-white/10",
          value: "text-3xl font-semibold text-white",
        }}
        className="overflow-hidden"
        value={value}
        strokeWidth={strokeWidth}
        showValueLabel={showValueLabel}
      />
    </CardBody>
  </Card>
  )
}

export default CardBar