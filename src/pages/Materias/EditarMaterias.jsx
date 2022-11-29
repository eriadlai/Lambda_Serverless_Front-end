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
import CustomRadioButton from "../../components/CustomRadioButton";
const MySwal = withReactContent(Swal);

const EditarMaterias = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { state: data } = useLocation();

  const { oNombre, oIsTroncoComun } = useForm({
    oNombre: location?.state.nombre,
    oIsTroncoComun: location?.state.apellido,
  });

  const [materia, setMateria] = useState({
    oNombre: oNombre,
    oIsTroncoComun: oIsTroncoComun,
  });

  const onChange = (value, campo) => {
    setMateria({
      ...materia,
      [campo]: value,
    });
  };

  const guardarMateria = async () => {
    try {
      await BaseApiUrl.put("/Materia", {
        oID: id,
        oNombre: materia.oNombre == null ? data.Nombre : materia.oNombre,
        oIsTroncoComun:
          materia.oIsTroncoComun == null
            ? data.oIsTroncoComun
            : materia.oIsTroncoComun,
      }).then(() =>
        MySwal.fire({
          title: "Registro Editado",
          text: "El registro ha sido Editado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        })
          .then(() => window.location.replace("/Materias"))
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
      <CustomSimpleTitle titulo={"Editar Materia"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Nombre"}
          type="text"
          value={materia.oNombre}
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

export default EditarMaterias;
