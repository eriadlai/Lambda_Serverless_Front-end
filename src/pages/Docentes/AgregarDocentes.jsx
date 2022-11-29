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

const AgregarDocentes = () => {
  const at =
    "eyJraWQiOiJPZVR2RkZSeEZFd2cyazJmSWlUd0ZtY041OXErenFKVFwvNnNnYnFTSHI0bz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzZWY3NDdlZC1kYjBiLTQ0OTMtYjY5Ni00NzQ3ZWU3OTIzNTIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjY5NjkyNzUzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMV9TWHpCUkRadlEiLCJleHAiOjE2Njk3NzkxNTMsImlhdCI6MTY2OTY5Mjc1MywidmVyc2lvbiI6MiwianRpIjoiZjUzYmQ5NzQtYTdjMC00NDI0LTg5ZDctYjdkYTAzYzYwODQ2IiwiY2xpZW50X2lkIjoiN3NoamgwOXVwdGltMTUyZ2tkbmlib2QzN2wiLCJ1c2VybmFtZSI6ImVyaWFkbGFpIn0.p26pdvPznyS5aoHViSKsvgidP3l55HFtAHx98Kd_-5vKsxlvAhKVPgs-mkJ1xUpecRMW4MC2lvxeghlGA9f1Re8wVlKQ3jpvNxT9r-HDgLB70c-QHKPgNISUvVelwSVqW1tM2bjW5VnuOjwYKPzxnnCPvdgUasTODbqy46_2LZxTArP9lyhKjGJ4UAxX1_SBxLKMuvPlirMXl1z7i3hCEyNIqFYloL7OppUG4Fm_ac9Fh4qW5DIUoLl58pusaPCpYLO01PHWGrBmrMzx2vF5YANZJIOkIVhYyVYDE4DOh5VSIjFkInTl0Ox74qaGGdL-CwSSdoN_JR2CeChBi1c4pQ";
  const config = {
    headers: {
      Authorization: `${at}`,
    },
  };
  const navigate = useNavigate();
  const {
    onChange,
    nombre,
    apellido,
    matricula,
    fecha_nacimiento,
    titulo,
    correo,
    telefono,
  } = useForm({
    nombre: "",
    apellido: "",
    matricula: "",
    fecha_nacimiento: "",
    titulo: "",
    correo: "",
    telefono: "",
  });

  const guardarDocente = async () => {
    try {
      if (
        nombre.length <= 3 ||
        apellido.length <= 3 ||
        matricula.length <= 3 ||
        fecha_nacimiento.length <= 3 ||
        titulo.length <= 3
      ) {
        MySwal.fire({
          title: "Error",
          text: "Llene todos los campos!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        await BaseApiUrl.post(
          "/Docentes",
          {
            nombre: nombre,
            apellido: apellido,
            matricula: matricula,
            fecha_nacimiento: fecha_nacimiento,
            titulo: titulo,
            correo: correo,
            telefono: telefono,
          },
          config
        ).then(() =>
          MySwal.fire({
            title: "Alumno creado",
            text: "El alumno ha sido creado con éxito",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => window.location.replace("/Docentes"))
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
          label={"Nombre"}
          type="text"
          value={nombre}
          onChange={({ target }) => onChange(target.value, "nombre")}
          required={true}
        />
        <CustomTextField
          label={"Apellidos"}
          type="text"
          value={apellido}
          onChange={({ target }) => onChange(target.value, "apellido")}
          required={true}
        />

        <CustomTextField
          label={"Matricula"}
          type="text"
          value={matricula}
          onChange={({ target }) => onChange(target.value, "matricula")}
          required={true}
        />
        <CustomTextField
          type="date"
          inputFormat="dd.MM.yyyy"
          value={fecha_nacimiento}
          onChange={({ target }) => onChange(target.value, "fecha_nacimiento")}
          required={true}
        />
        <CustomTextField
          label={"Titulo"}
          type="text"
          value={titulo}
          onChange={({ target }) => onChange(target.value, "titulo")}
          required={true}
        />
        <CustomTextField
          label={"Telefono"}
          type="phone"
          value={telefono}
          onChange={({ target }) => onChange(target.value, "telefono")}
          required={true}
        />
        <CustomTextField
          label={"Correo"}
          type="email"
          value={correo}
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

export default AgregarDocentes;
