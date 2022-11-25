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
const MySwal = withReactContent(Swal);
const Table = () => {
  const navigate = useNavigate();
  const [alumno, setAlumno] = React.useState([]);

  React.useEffect(() => {
    BaseApiUrl.get("/Alumno").then((alumno) => setAlumno(alumno.data[0]));
  }, []);

  const handleEdit = (data) => {
    navigate("/Alumnos/Editar-Alumno/" + data.ID, { state: data });
  };

  const handleDelete = (id) => {
    console.log(id);
    BaseApiUrl.delete("/Alumno", { data: { oID: id } })
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
    { field: "Nombre", headerName: "Nombre", width: 300 },
    {
      field: "Apellido",
      headerName: "Apellido",
      width: 150,
    },
    {
      field: "Matricula",
      headerName: "Matricula",
      width: 150,
    },
    {
      field: "Semestre",
      headerName: "Semestre",
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
      <CustomSimpleTitle titulo={"Alumnos"} mb={2} />{" "}
      <Stack direction={"row"}>
        <CustomButton
          texto={"Agregar Alumno"}
          onClick={() => navigate("/Alumno/Agregar-Alumno")}
          styles={{
            marginLeft: "30px",
          }}
        />
      </Stack>
      <div style={{ height: 600, width: "100%", padding: 30 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={alumno}
            columns={columns}
            rowsPerPageOptions={[10]}
            getRowId={(alumno) => alumno.ID}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};
export default Table;
