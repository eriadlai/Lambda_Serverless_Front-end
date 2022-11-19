import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BaseApiUrl } from "../../api/apiUrl";
import CustomSimpleTitle from "../../components/CustomSimpleTitle";
import CustomTextField from "../../components/CustomTextField";
import { useForm } from "../../hooks/useForm.tsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CustomButton from "../../components/CustomButton";
const MySwal = withReactContent(Swal);

const EditarInventario = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

  const { sku, tipo, marca, modelo, cantidad, precio, descripcion } = useForm({
    sku: location?.state.sku,
    tipo: location?.state.tipo,
    marca: location?.state.marca,
    modelo: location?.state.modelo,
    cantidad: location?.state.cantidad,
    precio: location?.state.precio,
    descripcion: location?.state.descripcion,
  });

  const [inventario, setInventario] = useState({
    sku: sku,
    tipo: tipo,
    marca: marca,
    modelo: modelo,
    cantidad: cantidad,
    precio: precio,
    descripcion: descripcion,
  });

  const onChange = (value, campo) => {
    setInventario({
      ...inventario,
      [campo]: value,
    });
  };

  const guardarInventario = async () => {
    try {
      await BaseApiUrl.put("/Componente", {
        id: id,
        sku: inventario.sku,
        tipo: inventario.tipo,
        marca: inventario.marca,
        modelo: inventario.modelo,
        cantidad: inventario.cantidad,
        precio: inventario.precio,
        descripcion: inventario.descripcion,
      }).then(() =>
        MySwal.fire({
          title: "Articulo Editado",
          text: "El articulo ha sido Editado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        })
          .then(() => window.location.replace("/Inventario"))
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
      <CustomSimpleTitle titulo={"Editar Inventario"} mb={5} />
      <Stack direction="column">
        <CustomTextField
          label={"sku"}
          type="text"
          value={inventario.sku}
          onChange={({ target }) => onChange(target.value, "sku")}
          required={true}
        />
        <CustomTextField
          label={"tipo"}
          type="text"
          value={inventario.tipo}
          onChange={({ target }) => onChange(target.value, "tipo")}
          required={true}
        />
        <CustomTextField
          label={"marca"}
          type="text"
          value={inventario.marca}
          onChange={({ target }) => onChange(target.value, "marca")}
          required={true}
        />
        <CustomTextField
          label={"modelo"}
          type="text"
          value={inventario.modelo}
          onChange={({ target }) => onChange(target.value, "modelo")}
          required={true}
        />
        <CustomTextField
          label={"cantidad"}
          type="text"
          value={inventario.cantidad}
          onChange={({ target }) => onChange(target.value, "cantidad")}
          required={true}
        />
        <CustomTextField
          label={"precio"}
          type="text"
          value={inventario.precio}
          onChange={({ target }) => onChange(target.value, "precio")}
          required={true}
        />
        <CustomTextField
          label={"descripcion"}
          type="text"
          value={inventario.descripcion}
          onChange={({ target }) => onChange(target.value, "descripcion")}
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
          onClick={guardarInventario}
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

export default EditarInventario;