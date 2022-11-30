import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BaseApiUrl } from "../../api/ApiUrl";
import CustomSimpleTitle from "../../components/CustomSimpleTitle";
import CustomTextField from "../../components/CustomTextField";
import { useForm } from "../../hooks/useForms.tsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CustomButton from "../../components/CustomButton";
const MySwal = withReactContent(Swal);

const EditarCalificaciones = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { state: data } = useLocation();

  const { oEvaluacion } = useForm({
    oEvaluacion: location?.state.Evaluacion,
  });

  const [calificacion, setCalificacion] = useState({
    oEvaluacion: oEvaluacion,
  });

  const onChange = (value, campo) => {
    setCalificacion({
      ...oEvaluacion,
      [campo]: value,
    });
  };

  const guardarCalificacion = async () => {
    try {
      await BaseApiUrl.put("/Calificacion", {
        oID: id,
        oEvaluacion:
          calificacion.oEvaluacion < 0
            ? data.Evaluacion
            : calificacion.oEvaluacion,
      }).then(() =>
        MySwal.fire({
          title: "Registro Editado",
          text: "El registro ha sido Editado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        })
          .then(() => window.location.replace("/Calificaciones"))
          .catch((err) => {
            console.log(err);
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
      <CustomSimpleTitle titulo={"Editar Calificacion"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Calificacion"}
          type="number"
          value={calificacion.oEvaluacion}
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
          onClick={guardarCalificacion}
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

export default EditarCalificaciones;
