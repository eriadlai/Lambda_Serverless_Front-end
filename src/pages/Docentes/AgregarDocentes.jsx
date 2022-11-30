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
  const at ="eyJraWQiOiJPZVR2RkZSeEZFd2cyazJmSWlUd0ZtY041OXErenFKVFwvNnNnYnFTSHI0bz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzZWY3NDdlZC1kYjBiLTQ0OTMtYjY5Ni00NzQ3ZWU3OTIzNTIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMV9TWHpCUkRadlEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI3bWg4ZmI3aHFxNDdpNm9jcW9vcHFsZ3F2NSIsImV2ZW50X2lkIjoiNDBhNTU2OGMtZDI1OC00NjgwLTgwNWUtYWNmNzIxZjliNDVjIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImF1dGhfdGltZSI6MTY2OTc4MTg3NiwiZXhwIjoxNjY5ODY4Mjc2LCJpYXQiOjE2Njk3ODE4NzYsImp0aSI6IjQyYzg2Yjk1LTA2MjktNDJkZS1hYzg1LWNhZmRmM2Y1Y2Q3MCIsInVzZXJuYW1lIjoiZXJpYWRsYWkifQ.aOeK4Vi6u5q_2kjEz8uw1vhw-waZDLOReKjSD3MzZvywJctwpJQotqEBK96RWdm4TJwl1oCwlvOsMqmHvYmamZWsaLZ5WpvNqA5PHWnEHMqblCwRg8vvKG3Mm0l5LelvHPmPY7JdxYTpzrJN3oYFiH0lFnpbvDdxxu-PPYz3Ybn5DALjnGxq_cFj_XDRbXMVdZ2IrBGwvaI1EvEg8F_nv9AMUa8hMnuLRgq6ebGGokGfufKVhdVLx5YChKae1zOfyTVEJrJ5DhbC9t0uAx-j4KMJTi66zk2uSpkXSM8lL0msC6U30FhFYo2gaYf5lluk7IQ9iFhW138terqRZnGmlA"
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
            title: "Docente creado",
            text: "El docente ha sido creado con éxito",
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
