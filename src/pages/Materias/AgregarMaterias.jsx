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
import CustomRadioButton from "../../components/CustomRadioButton";
const MySwal = withReactContent(Swal);

const AgregarMaterias = () => {
  const navigate = useNavigate();
  const { onChange, oNombre, oIsTroncoComun } = useForm({
    oNombre: "",
    oIsTroncoComun: "",
  });

  const guardarMateria = async () => {
    try {
      if (oNombre.length <= 3 || oIsTroncoComun === null) {
        MySwal.fire({
          title: "Error",
          text: "Llene todos los campos!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        await BaseApiUrl.post("/Materia", {
          oNombre: oNombre,
          oIsTroncoComun: oIsTroncoComun,
        }).then(() =>
          MySwal.fire({
            title: "Materia creada",
            text: "La materia ha sido creada con éxito",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => window.location.replace("/Materias"))
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
      <CustomSimpleTitle titulo={"Agregar Materia"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Nombre"}
          type="text"
          value={oNombre}
          onChange={({ target }) => onChange(target.value, "oNombre")}
          required={true}
        />
        <CustomRadioButton
          label={"¿Es de Tronco Comun?"}
          onChange={({ target }) => onChange(target.value, "oIsTroncoComun")}
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
          onClick={guardarMateria}
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

export default AgregarMaterias;
