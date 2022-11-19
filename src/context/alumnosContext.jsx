import { createContext, useState, useEffect, useContext } from "react";
import { BaseApiUrl } from "../api/ApiUrl";

const AlumnosContext = createContext({});

const AlumnoContextProvider = ({ children }) => {
  const [alumno, setAlumno] = useState([]);

  useEffect(() => {
    BaseApiUrl.get("/Alumno").then((alumno) =>
      setAlumno(alumno.data[0])
    );
  }, []);
  return (
    <AlumnosContext.Provider
      value={{alumno}}
    >
      {children}
    </AlumnosContext.Provider>
  );
};

export default AlumnoContextProvider;

export const useAlumnoContext = () => useContext(AlumnosContext);