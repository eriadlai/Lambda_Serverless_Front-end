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
  const [calificacion, setCalificacion] = React.useState([]);

  React.useEffect(() => {
    BaseApiUrl.get("/Calificacion").then((calificacion) =>
      setCalificacion(calificacion.data[0])
    );
  }, []);

  const handleEdit = (data) => {
    navigate("/Calificacion/Editar-Calificacion/" + data.ID, { state: data });
  };

  const handleDelete = (id) => {
    console.log(id);
    BaseApiUrl.delete("/Calificacion", { data: { oID: id } })
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
    {
      field: "Evaluacion",
      headerName: "Evaluacion",
      width: 300,
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
              styles={{marginRight:2, borderColor:"#d32f2f", color:"#d32f2f", '&:hover': {
                backgroundColor: '#d32f2f',
                color: 'black',
            }}}
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
      <CustomSimpleTitle titulo={"Calificaciones"} mb={2} />{" "}
      <Stack direction={"row"}>
        <CustomButton
          texto={"Agregar Calificacion"}
          onClick={() => navigate("/Calificacion/Agregar-Calificacion")}
          styles={{
            marginLeft: "30px",
          }}
        />
      </Stack>
      <div style={{ height: 600, width: "100%", padding: 30 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={calificacion}
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
