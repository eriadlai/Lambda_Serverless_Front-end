import { useState } from "react";
import { useEffect } from "react";
const rows = [];
function GetInfo(){
  const urlAlumnos="https://3ls4od9od7.execute-api.us-west-1.amazonaws.com/dev/Alumno";
  const [oData, setData] = useState();
 
      useEffect(() => {
          fetch(urlAlumnos)
              .then(response => response.json())
              .then(data => setData(data));
      }, []);
  
  oData.map((elemento)=>{
    rows.push(elemento);
  })
}
GetInfo();
export default rows;