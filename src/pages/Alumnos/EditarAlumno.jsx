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
import CustomSelect from "../../components/CustomSelect";
const MySwal = withReactContent(Swal);

const EditarAlumno = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { state: data } = useLocation();
  const [carrera, setCarreras] = React.useState([]);

  React.useEffect(() => {
    BaseApiUrl.get("/Carrera").then((carrera) => setCarreras(carrera.data[0]));
  }, []);

  const {
    oNombre,
    oApellido,
    oMatricula,
    oFecha_Nacimiento,
    oSemestre,
    oCarreraID,
  } = useForm({
    oNombre: location?.state.nombre,
    oApellido: location?.state.apellido,
    oMatricula: location?.state.matricula,
    oFecha_Nacimiento: location?.state.fecha_nacimiento,
    oSemestre: location?.state.semestre,
    oCarreraID: location?.state.carreras_id,
  });

  const [alumno, setAlumno] = useState({
    oNombre: oNombre,
    oApellido: oApellido,
    oMatricula: oMatricula,
    oFecha_Nacimiento: oFecha_Nacimiento,
    oSemestre: oSemestre,
    oCarreraID: oCarreraID,
  });

  const onChange = (value, campo) => {
    setAlumno({
      ...alumno,
      [campo]: value,
    });
  };

  const guardarAlumno = async () => {
    try {
      await BaseApiUrl.put("/Alumno", {
        oID: id,
        oNombre: alumno.oNombre == null ? data.Nombre : alumno.oNombre,
        oApellido: alumno.oApellido == null ? data.Apellido : alumno.oApellido,
        oMatricula:
          alumno.oMatricula == null ? data.Matricula : alumno.oMatricula,
        oFecha_Nacimiento:
          alumno.oFecha_Nacimiento == null
            ? data.Fecha_Nacimiento
            : alumno.oFecha_Nacimiento,
        oSemestre: alumno.oSemestre == null ? data.Semestre : alumno.oSemestre,
        oCarreraID:
          alumno.oCarreraID == null ? data.Carreras_ID : alumno.oCarreraID,
      }).then(() =>
        MySwal.fire({
          title: "Registro Editado",
          text: "El registro ha sido Editado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        })
          .then(() => window.location.replace("/Alumnos"))
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
      <CustomSimpleTitle titulo={"Editar Alumno"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Nombre"}
          type="text"
          value={alumno.oNombre}
          onChange={({ target }) => onChange(target.value, "oNombre")}
          required={true}
        />
        <CustomTextField
          label={"Apellido"}
          type="text"
          value={alumno.oApellido}
          onChange={({ target }) => onChange(target.value, "oApellido")}
          required={true}
        />
        <CustomTextField
          label={"Matricula"}
          type="number"
          value={alumno.oMatricula}
          onChange={({ target }) => onChange(target.value, "oMatricula")}
          required={true}
        />
        <CustomTextField
          type="date"
          value={alumno.oFecha_Nacimiento}
          onChange={({ target }) => onChange(target.value, "oFecha_Nacimiento")}
          required={true}
        />
        <CustomTextField
          label={"Semestre"}
          type="text"
          value={alumno.oSemestre}
          onChange={({ target }) => onChange(target.value, "oSemestre")}
          required={true}
        />
        <CustomSelect
          label={data.Carreras_ID}
          value={alumno.oCarreraID}
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
          onClick={guardarAlumno}
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

export default EditarAlumno;
