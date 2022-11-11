import { useMemo } from "react";

export default function useColumns() {
 const columns = useMemo(
   () => [
     {
       Header: "ID",
       accessor: "ID"
     },
     {
       Header: "Nombre",
       accessor: "nombre"
     },
     {
       Header: "Apellido",
       accessor: "apellido"
     },
     {
       Header: "Matricula",
       accessor: "matricula"
     },
     {
       Header: "Semestre",
       accessor: "semestre"
     }
   ],
   []
 );

 return columns;
}