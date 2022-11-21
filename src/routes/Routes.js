import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import TableAlumnos from "../pages/Alumnos/TableAlumnos";
import EditarAlumno from "../pages/Alumnos/EditarAlumno";
import Calificaciones from "../pages/Calificaciones/Calificaciones";
import Carreras from "../pages/Carreras/Carreras";
import Docentes from "../pages/Docentes/Docentes";
import Grupos from "../pages/Grupos/Grupos";
import Materias from "../pages/Materias/Materias";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/Alumnos" element={<TableAlumnos />} />
          <Route path="/Alumnos/Editar-Alumno/:id" element={<EditarAlumno />} />
          <Route path="/Calificaciones" element={<Calificaciones />} />
          <Route path="/Carreras" element={<Carreras />} />
          <Route path="/Docentes" element={<Docentes />} />
          <Route path="/Grupos" element={<Grupos />} />
          <Route path="/Materias" element={<Materias />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
