import { Stack } from "@mui/material";
import CustomSimpleTitle from "../../components/CustomSimpleTitle";
import CustomTextField from "../../components/CustomTextField";
import CustomSelectAddAlumno from "../../components/CustomSelectAddAlumno";
import { useForm } from "../../hooks/useForms.tsx";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BaseApiUrl } from "../../api/ApiUrl";
import React, { useState, useEffect } from "react";
const MySwal = withReactContent(Swal);

const AgregarAlumno = () => {
  const navigate = useNavigate();
  const {
    onChange,
    oNombre,
    oApellido,
    oMatricula,
    oFecha_Nacimiento,
    oSemestre,
    oCarreraID,
  } = useForm({
    oNombre: "",
    oApellido: "",
    oMatricula: "",
    oFecha_Nacimiento: "",
    oSemestre: "",
    oCarreraID: "",
  });
  const [carrera, setCarreras] = useState([]);

  useEffect(() => {
    BaseApiUrl.get("/Carrera").then((carrera) => setCarreras(carrera.data[0]));
  }, []);

  const guardarUsuario = async (carrera) => {
    try {
      if (
        oNombre.length <= 3 ||
        oApellido.length <= 3 ||
        oMatricula.length <= 3 ||
        oFecha_Nacimiento.length <= 3 ||
        oSemestre.length <= 3 ||
        !Number.isInteger(oCarreraID)
      ) {
        MySwal.fire({
          title: "Error",
          text: "Llene todos los campos!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        await BaseApiUrl.post("/Alumno", {
          oNombre: oNombre,
          oApellido: oApellido,
          oMatricula: oMatricula,
          oFecha_Nacimiento: oFecha_Nacimiento,
          oSemestre: oSemestre,
          oCarreraID: oCarreraID,
        }).then(() =>
          MySwal.fire({
            title: "Alumno creado",
            text: "El alumno ha sido creado con éxito",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => window.location.replace("/Alumnos"))
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
      <CustomSimpleTitle titulo={"Agregar Alumno"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Nombre"}
          type="text"
          value={oNombre}
          onChange={({ target }) => onChange(target.value, "oNombre")}
          required={true}
        />
        <CustomTextField
          label={"Apellidos"}
          type="text"
          value={oApellido}
          onChange={({ target }) => onChange(target.value, "oApellido")}
          required={true}
        />

        <CustomTextField
          label={"Matricula"}
          type="text"
          value={oMatricula}
          onChange={({ target }) => onChange(target.value, "oMatricula")}
          required={true}
        />
        <CustomTextField
          type="date"
          value={oFecha_Nacimiento}
          onChange={({ target }) => onChange(target.value, "oFecha_Nacimiento")}
          required={true}
        />
        <CustomTextField
          label={"Semestre"}
          type="text"
          value={oSemestre}
          onChange={({ target }) => onChange(target.value, "oSemestre")}
          required={true}
        />

        <CustomSelectAddAlumno
          label={"Carrera"}
          value={oCarreraID}
          onChange={({ target }) => onChange(target.value, "oCarreraID")}
          required={true}
          data={carrera}
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
          onClick={guardarUsuario}
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

export default AgregarAlumno;
