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
  const [grupo, setGrupo] = React.useState([]);
  const oToken = React.useContext(TokenContext);
  React.useEffect(() => {
    BaseApiUrl.get("/Grupos").then((grupo) => setGrupo(grupo.data[0]));
  }, []);

  const handleEdit = (data) => {
    navigate("/Grupos/Editar-Grupo/" + data.ID, { state: data });
  };

  const handleDelete = (id) => {
    BaseApiUrl.delete("/Grupo", { data: { oID: id } })
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
    { field: "salon", headerName: "Salon", width: 300 },
    {
      field: "Materia_id",
      headerName: "Materia_id",
      width: 150,
    },
    {
      field: "docente_id",
      headerName: "docente_id",
      width: 150,
    },
    {
      field: "Alumno_id",
      headerName: "Alumno_id",
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
      <CustomSimpleTitle titulo={"Grupos"} mb={2} />{" "}
      <Stack direction={"row"}>
        <CustomButton
          texto={"Agregar Grupo"}
          onClick={() => navigate("/Grupo/Agregar-Grupo")}
          styles={{
            marginLeft: "30px",
          }}
        />
      </Stack>
      <div style={{ height: 600, width: "100%", padding: 30 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={grupo}
            columns={columns}
            rowsPerPageOptions={[10]}
            getRowId={(grupo) => grupo.ID}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};
export default Table;
