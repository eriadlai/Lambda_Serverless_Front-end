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
  const [materia, setMateria] = React.useState([]);
  const [docente, setDocente] = React.useState([]);
  const [alumno, setAlumno] = React.useState([]);
  const oToken = React.useContext(TokenContext);
  const config = {
    headers: {
      Authorization: `${oToken}`,
    },
  };
  React.useEffect(() => {
    BaseApiUrl.get("/Grupos").then((grupo) => setGrupo(grupo.data.docentes));
    BaseApiUrl.get("/Materia").then((materia) => setMateria(materia.data[0]));
    BaseApiUrl.get("/Docentes", config).then((docente) =>
      setDocente(docente.data.docentes)
    );
    BaseApiUrl.get("/Alumno").then((alumno) => setAlumno(alumno.data[0]));
  }, []);
  const handleEdit = (data) => {
    navigate("/Grupos/Editar-Grupo/" + data.id, { state: data });
  };

  const handleDelete = (id) => {
    BaseApiUrl.delete("/Grupos", { data: { oID: id } })
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
      field: "id",
      headerName: "ID",
      width: 150,
    },
    { field: "salon", headerName: "Salon", width: 300 },
    {
      field: "materia_id",
      headerName: "Materia_id",
      width: 150,
      renderCell: (cellValues) => {
        materia?.map((oDato) => {
          if (oDato.ID === cellValues.row.materia_id) {
            return <>{oDato.Nombre}</>;
          }
        });
      },
    },
    {
      field: "docente_id",
      headerName: "docente_id",
      width: 150,
      renderCell: (cellValues) => {
        docente?.map((oDato) => {
          if (oDato.ID === cellValues.row.docente_id) {
            return <>{oDato.nombre + " " + oDato.apellido}</>;
          }
        });
      },
    },
    {
      field: "alumno_id",
      headerName: "Alumno_id",
      width: 150,
      renderCell: (cellValues) => {
        alumno?.map((oDato) => {
          if (oDato.ID === cellValues.row.alumno_id) {
            return <>{oDato.Nombre}</>;
          }
        });
      },
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
              onClick={() => handleDelete(cellValues.row.id)}
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
          onClick={() => navigate("/Grupos/Agregar-Grupo")}
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
            getRowId={(grupo) => grupo.id}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};
export default Table;
