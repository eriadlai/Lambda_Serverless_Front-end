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

const AgregarCalificaciones = () => {
  const navigate = useNavigate();
  const { onChange, oEvaluacion } = useForm({
    oEvaluacion: "",
  });

  const guardarUsuario = async () => {
    try {
      if (oEvaluacion < 0) {
        MySwal.fire({
          title: "Error",
          text: "Llene todos los campos con valores mayores o iguales a 0!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        await BaseApiUrl.post("/Calificacion", {
          oEvaluacion: oEvaluacion,
        }).then(() =>
          MySwal.fire({
            title: "Calificacion creada",
            text: "La calificacion ha sido creada con éxito",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => window.location.replace("/Calificaciones"))
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
      <CustomSimpleTitle titulo={"Agregar Calificacion"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Calificacion"}
          type="number"
          value={oEvaluacion}
          onChange={({ target }) => onChange(target.value, "oEvaluacion")}
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

export default AgregarCalificaciones;
