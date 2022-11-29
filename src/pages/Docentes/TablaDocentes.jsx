import * as React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DataGrid } from "@mui/x-data-grid";
import { BaseApiUrl } from "../../api/ApiUrl";
import { Box } from "@mui/system";
import CustomButton from "../../components/CustomButton";
import CustomSimpleTitle from "../../components/CustomSimpleTitle";
import { Stack } from "@mui/material";
import TokenContext from "../../context/TokenContext";
const MySwal = withReactContent(Swal);
const Table = () => {
  const navigate = useNavigate();
  const [docente, setDocente] = React.useState([]);
  const oToken = React.useContext(TokenContext);
  const at =
    "eyJraWQiOiJPZVR2RkZSeEZFd2cyazJmSWlUd0ZtY041OXErenFKVFwvNnNnYnFTSHI0bz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzZWY3NDdlZC1kYjBiLTQ0OTMtYjY5Ni00NzQ3ZWU3OTIzNTIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjY5NjkyNzUzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMV9TWHpCUkRadlEiLCJleHAiOjE2Njk3NzkxNTMsImlhdCI6MTY2OTY5Mjc1MywidmVyc2lvbiI6MiwianRpIjoiZjUzYmQ5NzQtYTdjMC00NDI0LTg5ZDctYjdkYTAzYzYwODQ2IiwiY2xpZW50X2lkIjoiN3NoamgwOXVwdGltMTUyZ2tkbmlib2QzN2wiLCJ1c2VybmFtZSI6ImVyaWFkbGFpIn0.p26pdvPznyS5aoHViSKsvgidP3l55HFtAHx98Kd_-5vKsxlvAhKVPgs-mkJ1xUpecRMW4MC2lvxeghlGA9f1Re8wVlKQ3jpvNxT9r-HDgLB70c-QHKPgNISUvVelwSVqW1tM2bjW5VnuOjwYKPzxnnCPvdgUasTODbqy46_2LZxTArP9lyhKjGJ4UAxX1_SBxLKMuvPlirMXl1z7i3hCEyNIqFYloL7OppUG4Fm_ac9Fh4qW5DIUoLl58pusaPCpYLO01PHWGrBmrMzx2vF5YANZJIOkIVhYyVYDE4DOh5VSIjFkInTl0Ox74qaGGdL-CwSSdoN_JR2CeChBi1c4pQ";
  const config = {
    headers: {
      Authorization: `${at}`,
    },
  };
  React.useEffect(() => {
    BaseApiUrl.get("/Docentes", config).then((docente) =>
      setDocente(docente.data.docentes)
    );
  }, []);
  const handleEdit = (data) => {
    navigate("/Docentes/Editar-Docente/" + data.ID, { state: data });
  };

  const handleDelete = (id) => {
    BaseApiUrl.delete("/Docentes?id=" + id, config)
      .then((res) => {
        console.log(res);
        MySwal.fire({
          title: "Accion exitosa",
          text: "El registro ha sido eliminado con exito",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          window.location.reload();
        });
      })
      .catch((error) => {
        MySwal.fire({
          title: "Error",
          text: "No se pudo eliminar el componente: " + error,
          icon: "error",
        });
      });
  };
  const columns = [
    {
      field: "ID",
      headerName: "ID",
      width: 150,
    },
    { field: "nombre", headerName: "Nombre", width: 300 },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 150,
    },
    {
      field: "matricula",
      headerName: "Matricula",
      width: 150,
    },
    {
      field: "titulo",
      headerName: "Titulo",
      width: 150,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 150,
    },
    {
      field: "correo",
      headerName: "Correo",
      width: 150,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 300,
      renderCell: (cellValues) => {
        return (
          <>
            <CustomButton
              variant="contained"
              onClick={() => handleDelete(cellValues.row.ID)}
              texto="Eliminar"
              styles={{
                marginRight: 2,
                borderColor: "#d32f2f",
                color: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                  color: "black",
                },
              }}
            >
              Borrar
            </CustomButton>
            <CustomButton
              variant="contained"
              onClick={() => handleEdit(cellValues.row)}
              texto="EDITAR"
            >
              Borrar
            </CustomButton>
          </>
        );
      },
    },
  ];
  return (
    <>
      <CustomSimpleTitle titulo={"Docentes"} mb={2} />{" "}
      <Stack direction={"row"}>
        <CustomButton
          texto={"Agregar Docente"}
          onClick={() => navigate("/Docente/Agregar-Docente")}
          styles={{
            marginLeft: "30px",
          }}
        />
      </Stack>
      <div style={{ height: 600, width: "100%", padding: 30 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={docente}
            columns={columns}
            rowsPerPageOptions={[10]}
            getRowId={(docente) => docente.ID}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};
export default Table;
