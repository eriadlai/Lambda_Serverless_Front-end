import { Stack } from "@mui/material";
import CustomSimpleTitle from "../../components/CustomSimpleTitle";
import CustomTextField from "../../components/CustomTextField";
import { useForm } from "../../hooks/useForms.tsx";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BaseApiUrl } from "../../api/ApiUrl";
import React, { useEffect, useState } from "react";
import CustomSelectMateria from "../../components/CustomSelectMateria";
import CustomSelectDocentes from "../../components/CustomSelectDocentes";
import CustomSelectAlumnos from "../../components/CustomSelectAlumnos";
const MySwal = withReactContent(Swal);

const AgregarGrupos = () => {
  const at ="eyJraWQiOiJPZVR2RkZSeEZFd2cyazJmSWlUd0ZtY041OXErenFKVFwvNnNnYnFTSHI0bz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzZWY3NDdlZC1kYjBiLTQ0OTMtYjY5Ni00NzQ3ZWU3OTIzNTIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMV9TWHpCUkRadlEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI3bWg4ZmI3aHFxNDdpNm9jcW9vcHFsZ3F2NSIsImV2ZW50X2lkIjoiNDBhNTU2OGMtZDI1OC00NjgwLTgwNWUtYWNmNzIxZjliNDVjIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY2OTc4MTg3NiwiZXhwIjoxNjY5ODY4Mjc2LCJpYXQiOjE2Njk3ODE4NzYsImp0aSI6IjQyYzg2Yjk1LTA2MjktNDJkZS1hYzg1LWNhZmRmM2Y1Y2Q3MCIsInVzZXJuYW1lIjoiZXJpYWRsYWkifQ.aOeK4Vi6u5q_2kjEz8uw1vhw-waZDLOReKjSD3MzZvywJctwpJQotqEBK96RWdm4TJwl1oCwlvOsMqmHvYmamZWsaLZ5WpvNqA5PHWnEHMqblCwRg8vvKG3Mm0l5LelvHPmPY7JdxYTpzrJN3oYFiH0lFnpbvDdxxu-PPYz3Ybn5DALjnGxq_cFj_XDRbXMVdZ2IrBGwvaI1EvEg8F_nv9AMUa8hMnuLRgq6ebGGokGfufKVhdVLx5YChKae1zOfyTVEJrJ5DhbC9t0uAx-j4KMJTi66zk2uSpkXSM8lL0msC6U30FhFYo2gaYf5lluk7IQ9iFhW138terqRZnGmlA"
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
  const { onChange, salon, materia_id, docente_id, alumno_id } = useForm({
    salon: "",
    materia_id: "",
    docente_id: "",
    alumno_id: "",
  });

  const guardarGrupo = async () => {
    const oDatos = {
      salon: salon,
      materia_id: materia_id,
      docente_id: docente_id,
      alumno_id: alumno_id,
    };
    try {
      if (
        salon.length <= 3 ||
        materia_id === null ||
        docente_id === null ||
        alumno_id === null
      ) {
        MySwal.fire({
          title: "Error",
          text: "Llene todos los campos!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        await BaseApiUrl.post("/Grupos", oDatos, config).then(() =>
          MySwal.fire({
            title: "Grupo creado",
            text: "El grupo ha sido creado con éxito",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => window.location.replace("/Grupos"))
        );
      }
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
      <CustomSimpleTitle titulo={"Agregar Docente"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Nombre del Salon"}
          type="text"
          value={salon}
          onChange={({ target }) => onChange(target.value, "salon")}
          required={true}
        />
        <CustomSelectMateria
          label={"Materia"}
          value={materia_id}
          onChange={({ target }) => onChange(target.value, "materia_id")}
          required={true}
          data={materia}
        />
        <CustomSelectDocentes
          label={"Docente"}
          value={docente_id}
          onChange={({ target }) => onChange(target.value, "docente_id")}
          required={true}
          data={docente}
        />
        <CustomSelectAlumnos
          label={"Alumno"}
          value={alumno_id}
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

export default AgregarGrupos;
