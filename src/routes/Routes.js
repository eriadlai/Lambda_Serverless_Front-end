import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "../components/Feed";
import Academico from '../pages/Academico';
import Enlaces from '../pages/Enlaces';
import Evaluacion from '../pages/Evaluacion';
import Financiero from '../pages/Financiero';
import Inscripciones from '../pages/Inscripciones';
import Portafolio from '../pages/Portafolio';
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/Academico" element={<Academico />} />
          <Route path="/Enlaces" element={<Enlaces />} />
          <Route path="/Evaluacion" element={<Evaluacion />} />
          <Route path="/Financiero" element={<Financiero />} />
          <Route path="/Inscripciones" element={<Inscripciones />} />
          <Route path="/Portafolio" element={<Portafolio />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;