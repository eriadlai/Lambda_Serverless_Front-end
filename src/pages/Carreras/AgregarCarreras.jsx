import { Stack } from "@mui/material";
import CustomSimpleTitle from "../../components/CustomSimpleTitle";
import CustomTextField from "../../components/CustomTextField";
import { useForm } from "../../hooks/useForms.tsx";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BaseApiUrl } from "../../api/ApiUrl";
import React from "react";
const MySwal = withReactContent(Swal);

const AgregarCarreras = () => {
  const navigate = useNavigate();
  const { onChange, oNombre } = useForm({
    oNombre: "",
  });

  const guardarCarrera = async () => {
    try {
      if (oNombre.length <= 3) {
        MySwal.fire({
          title: "Error",
          text: "Llene todos los campos!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        await BaseApiUrl.post("/Carrera", {
          oNombre: oNombre,
        }).then(() =>
          MySwal.fire({
            title: "Carrera creada",
            text: "La Carrera ha sido creada con éxito",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => window.location.replace("/Carreras"))
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
      <CustomSimpleTitle titulo={"Agregar Carrera"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Nombre de Carrera"}
          type="text"
          value={oNombre}
          onChange={({ target }) => onChange(target.value, "oNombre")}
          required={true}
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
          onClick={guardarCarrera}
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

export default AgregarCarreras;
