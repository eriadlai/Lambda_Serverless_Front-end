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

const EditarDocente = () => {
  const at =
    "eyJraWQiOiJPZVR2RkZSeEZFd2cyazJmSWlUd0ZtY041OXErenFKVFwvNnNnYnFTSHI0bz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzZWY3NDdlZC1kYjBiLTQ0OTMtYjY5Ni00NzQ3ZWU3OTIzNTIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjY5NjkyNzUzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMV9TWHpCUkRadlEiLCJleHAiOjE2Njk3NzkxNTMsImlhdCI6MTY2OTY5Mjc1MywidmVyc2lvbiI6MiwianRpIjoiZjUzYmQ5NzQtYTdjMC00NDI0LTg5ZDctYjdkYTAzYzYwODQ2IiwiY2xpZW50X2lkIjoiN3NoamgwOXVwdGltMTUyZ2tkbmlib2QzN2wiLCJ1c2VybmFtZSI6ImVyaWFkbGFpIn0.p26pdvPznyS5aoHViSKsvgidP3l55HFtAHx98Kd_-5vKsxlvAhKVPgs-mkJ1xUpecRMW4MC2lvxeghlGA9f1Re8wVlKQ3jpvNxT9r-HDgLB70c-QHKPgNISUvVelwSVqW1tM2bjW5VnuOjwYKPzxnnCPvdgUasTODbqy46_2LZxTArP9lyhKjGJ4UAxX1_SBxLKMuvPlirMXl1z7i3hCEyNIqFYloL7OppUG4Fm_ac9Fh4qW5DIUoLl58pusaPCpYLO01PHWGrBmrMzx2vF5YANZJIOkIVhYyVYDE4DOh5VSIjFkInTl0Ox74qaGGdL-CwSSdoN_JR2CeChBi1c4pQ";
  const config = {
    headers: {
      Authorization: `${at}`,
    },
  };
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { state: data } = useLocation();

  const {
    nombre,
    apellido,
    matricula,
    fecha_nacimiento,
    titulo,
    correo,
    telefono,
  } = useForm({
    nombre: location?.state.nombre,
    apellido: location?.state.apellido,
    matricula: location?.state.matricula,
    fecha_nacimiento: location?.state.Fecha_nacimiento,
    titulo: location?.state.titulo,
    correo: location?.state.correo,
    telefono: location?.state.telefono,
  });

  const [docente, setDocente] = useState({
    nombre: nombre,
    apellido: apellido,
    matricula: matricula,
    fecha_nacimiento: fecha_nacimiento,
    titulo: titulo,
    correo: correo,
    telefono: telefono,
  });

  const onChange = (value, campo) => {
    setDocente({
      ...docente,
      [campo]: value,
    });
  };

  const guardarDocente = async () => {
    const oDatos = JSON.stringify({
      nombre: docente.nombre == null ? data.nombre : docente.nombre,
      apellido: docente.apellido == null ? data.apellido : docente.apellido,
      matricula: docente.matricula == null ? data.matricula : docente.matricula,
      fecha_nacimiento:
        docente.fecha_nacimiento == null
          ? data.fecha_nacimiento
          : docente.fecha_nacimiento,
      titulo: docente.titulo == null ? data.titulo : docente.titulo,
      correo: docente.correo == null ? data.correo : docente.correo,
      telefono: docente.telefono == null ? data.correo : docente.telefono,
    });
    console.log(oDatos);
    console.log(BaseApiUrl);
    try {
      await BaseApiUrl.put("/Docentes?id=" + id, oDatos, config).then(() =>
        MySwal.fire({
          title: "Registro Editado",
          text: "El registro ha sido Editado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        })
          .then(() => window.location.replace("/Docentes"))
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
      <CustomSimpleTitle titulo={"Editar Docente"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"Nombre"}
          type="text"
          value={docente.nombre}
          onChange={({ target }) => onChange(target.value, "nombre")}
          required={true}
        />
        <CustomTextField
          label={"Apellido"}
          type="text"
          value={docente.apellido}
          onChange={({ target }) => onChange(target.value, "apellido")}
          required={true}
        />
        <CustomTextField
          label={"Matricula"}
          type="number"
          value={docente.matricula}
          onChange={({ target }) => onChange(target.value, "matricula")}
          required={true}
        />
        <CustomTextField
          type="date"
          inputFormat="dd.MM.yyyy"
          value={docente.fecha_nacimiento}
          onChange={({ target }) => onChange(target.value, "fecha_nacimiento")}
          required={true}
        />
        <CustomTextField
          label={"Titulo"}
          type="text"
          value={docente.titulo}
          onChange={({ target }) => onChange(target.value, "titulo")}
          required={true}
        />
        <CustomTextField
          label={"Telefono"}
          value={docente.telefono}
          type="number"
          onChange={({ target }) => onChange(target.value, "telefono")}
          required={true}
        />
        <CustomTextField
          label={"Correo"}
          value={docente.correo}
          onChange={({ target }) => onChange(target.value, "correo")}
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
          onClick={guardarDocente}
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

export default EditarDocente;