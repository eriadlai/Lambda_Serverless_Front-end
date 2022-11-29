import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BaseApiUrl } from "../../api/ApiUrl";
import CustomSimpleTitle from "../../components/CustomSimpleTitle";
import CustomTextField from "../../components/CustomTextField";
import { useForm } from "../../hooks/useForms.tsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CustomButton from "../../components/CustomButton";
import CustomSelectMateria from "../../components/CustomSelectMateria";
import CustomSelectDocentes from "../../components/CustomSelectDocentes";
import CustomSelectAlumnos from "../../components/CustomSelectAlumnos";
const MySwal = withReactContent(Swal);

const EditarGrupos = () => {
  const at =
    "eyJraWQiOiJPZVR2RkZSeEZFd2cyazJmSWlUd0ZtY041OXErenFKVFwvNnNnYnFTSHI0bz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzZWY3NDdlZC1kYjBiLTQ0OTMtYjY5Ni00NzQ3ZWU3OTIzNTIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjY5NjkyNzUzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMV9TWHpCUkRadlEiLCJleHAiOjE2Njk3NzkxNTMsImlhdCI6MTY2OTY5Mjc1MywidmVyc2lvbiI6MiwianRpIjoiZjUzYmQ5NzQtYTdjMC00NDI0LTg5ZDctYjdkYTAzYzYwODQ2IiwiY2xpZW50X2lkIjoiN3NoamgwOXVwdGltMTUyZ2tkbmlib2QzN2wiLCJ1c2VybmFtZSI6ImVyaWFkbGFpIn0.p26pdvPznyS5aoHViSKsvgidP3l55HFtAHx98Kd_-5vKsxlvAhKVPgs-mkJ1xUpecRMW4MC2lvxeghlGA9f1Re8wVlKQ3jpvNxT9r-HDgLB70c-QHKPgNISUvVelwSVqW1tM2bjW5VnuOjwYKPzxnnCPvdgUasTODbqy46_2LZxTArP9lyhKjGJ4UAxX1_SBxLKMuvPlirMXl1z7i3hCEyNIqFYloL7OppUG4Fm_ac9Fh4qW5DIUoLl58pusaPCpYLO01PHWGrBmrMzx2vF5YANZJIOkIVhYyVYDE4DOh5VSIjFkInTl0Ox74qaGGdL-CwSSdoN_JR2CeChBi1c4pQ";
  const config = {
    headers: {
      Authorization: `${at}`,
    },
  };
  const [materia, setMateria] = useState([]);
  const [docente, setDocente] = useState([]);
  const [alumno, setAlumno] = useState([]);
  useEffect(() => {
    BaseApiUrl.get("/Materia").then((materia) => setMateria(materia.data[0]));
    BaseApiUrl.get("/Docentes", config).then((docente) =>
      setDocente(docente.data.docentes)
    );
    BaseApiUrl.get("/Alumno").then((alumno) => setAlumno(alumno.data[0]));
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { state: data } = useLocation();

  const { salon, materia_id, docente_id, alumno_id } = useForm({
    salon: location?.state.salon,
    materia_id: location?.state.materia_id,
    docente_id: location?.state.docente_id,
    alumno_id: location?.state.alumno_id,
  });

  const [grupo, setGrupo] = useState({
    salon: salon,
    materia_id: materia_id,
    docente_id: docente_id,
    alumno_id: alumno_id,
  });

  const onChange = (value, campo) => {
    setGrupo({
      ...grupo,
      [campo]: value,
    });
  };

  const guardarGrupo = async () => {
    const oDatos = JSON.stringify({
      salon: grupo.salon == null ? data.salon : grupo.salon,
      materia_id: grupo.materia_id == null ? data.materia_id : grupo.materia_id,
      docente_id: grupo.docente_id == null ? data.docente_id : grupo.docente_id,
      alumno_id: grupo.alumno_id == null ? data.alumno_id : grupo.alumno_id,
    });
    try {
      await BaseApiUrl.put("/Grupos?id=" + id, oDatos).then(() =>
        MySwal.fire({
          title: "Registro Editado",
          text: "El registro ha sido Editado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        })
          .then(() => window.location.replace("/Grupos"))
          .catch((err) => {
            console.log(err.response.data);
          })
      );
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <CustomSimpleTitle titulo={"Editar Grupo"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Salon"}
          type="text"
          value={grupo.salon}
          onChange={({ target }) => onChange(target.value, "salon")}
          required={true}
        />
        <CustomSelectMateria
          label={"Materia"}
          value={grupo.materia_id}
          onChange={({ target }) => onChange(target.value, "materia_id")}
          required={true}
          data={materia}
        />
        <CustomSelectDocentes
          label={"Docente"}
          value={grupo.docente_id}
          onChange={({ target }) => onChange(target.value, "docente_id")}
          required={true}
          data={docente}
        />
        <CustomSelectAlumnos
          label={"Alumno"}
          value={grupo.alumno_id}
          onChange={({ target }) => onChange(target.value, "alumno_id")}
          required={true}
          data={alumno}
        />
      </Stack>
      <Stack direction={"row"} justifyContent="space-evenly" mt={"64px"}>
        <CustomButton
          texto={"Aceptar"}
          styles={{
            width: "183px",
            height: "46px",
            alignSelf: "center",
            mb: "30px",
          }}
          onClick={guardarGrupo}
        />
        <CustomButton
          texto={"Cancelar"}
          styles={{
            width: "183px",
            height: "46px",
            alignSelf: "center",
            mb: "30px",
          }}
          onClick={() => navigate(-1)}
        />
      </Stack>
    </>
  );
};

export default EditarGrupos;
