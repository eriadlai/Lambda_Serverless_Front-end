import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import TableAlumnos from "../pages/Alumnos/TableAlumnos";
import EditarAlumno from "../pages/Alumnos/EditarAlumno";
import AgregarAlumno from "../pages/Alumnos/AgregarAlumno";
import Calificaciones from "../pages/Calificaciones/Calificaciones";
import AgregarCalificaciones from "../pages/Calificaciones/AgregarCalificaciones";
import EditarCalificaciones from "../pages/Calificaciones/EditarCalificaciones";
import Carreras from "../pages/Carreras/Carreras";
import AgregarCarreras from "../pages/Carreras/AgregarCarreras";
import EditarCarreras from "../pages/Carreras/EditarCarreras";
import Docentes from "../pages/Docentes/Docentes";
import AgregarDocentes from "../pages/Docentes/AgregarDocentes";
import EditarDocente from "../pages/Docentes/EditarDocentes";
import Grupos from "../pages/Grupos/Grupos";
import Materias from "../pages/Materias/Materias";
import AgregarMaterias from "../pages/Materias/AgregarMaterias";
import EditarMaterias from "../pages/Materias/EditarMaterias";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/Alumnos" element={<TableAlumnos />} />
          <Route path="/Alumnos/Editar-Alumno/:id" element={<EditarAlumno />} />
          <Route path="/Alumno/Agregar-Alumno" element={<AgregarAlumno />} />
          <Route path="/Calificaciones" element={<Calificaciones />} />
          <Route
            path="/Calificacion/Agregar-Calificacion"
            element={<AgregarCalificaciones />}
          />
          <Route
            path="/Calificacion/Editar-Calificacion/:id"
            element={<EditarCalificaciones />}
          />
          <Route path="/Carreras" element={<Carreras />} />
          <Route
            path="/Carrera/Agregar-Carrera"
            element={<AgregarCarreras />}
          />
          <Route
            path="/Carrera/Editar-Carrera/:id"
            element={<EditarCarreras />}
          />
          <Route path="/Docentes" element={<Docentes />} />
          <Route
            path="/Docente/Agregar-Docente"
            element={<AgregarDocentes />}
          />
          <Route
            path="/Docentes/Editar-Docente/:id"
            element={<EditarDocente />}
          />
          <Route path="/Grupos" element={<Grupos />} />
          <Route path="/Materias" element={<Materias />} />
          <Route
            path="/Materia/Agregar-Materia"
            element={<AgregarMaterias />}
          />
          <Route
            path="/Materia/Editar-Materia/:id"
            element={<EditarMaterias />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
