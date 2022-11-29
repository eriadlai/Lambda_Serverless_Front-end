import React from "react";
import { MenuItem, Select, Stack } from "@mui/material";

const CustomSelectAlumnos = ({ label, value, style, onChange, data }) => {
  return (
    <>
      <Stack direction={"column"} margin={"20px"} spacing={4}>
        <Select
          label={label}
          id="controllable-states-demo"
          value={value}
          onChange={onChange}
          variant="outlined"
          sx={{ ...style }}
        >
          {data?.map((oAlumno) => (
            <MenuItem value={oAlumno.ID} key={oAlumno.ID}>
              {oAlumno.Nombre + " " + oAlumno.Apellido}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
};

export default CustomSelectAlumnos;
