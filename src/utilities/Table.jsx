import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'Nombre', width: 130 },
  { field: 'apellido', headerName: 'Apellido', width: 130 },
  {
    field: 'matricula',
    headerName: 'Matricula',
    type: 'number',
    width: 90,
  },
  {
    field: 'semestre',
    headerName: 'Semestre',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

const rows = []

export default function DataTable() {
  const urlAlumnos="https://3ls4od9od7.execute-api.us-west-1.amazonaws.com/dev/Alumno";
  const [oData, setData] = React.useState();

    React.useEffect(() => {
        fetch(urlAlumnos)
            .then(response => response.json())
            .then(data => 
              data[0].map((element)=>(
                console.log(element)
              )));
    }, []);
    console.log(oData)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}