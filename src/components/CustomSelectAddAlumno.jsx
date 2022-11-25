import React from "react";
import { MenuItem, Select, Stack } from "@mui/material";

const CustomSelectAddAlumno = ({ label, value, style, onChange, data }) => {
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
          {data?.map((oCarrera) => (
            <MenuItem value={oCarrera.ID} key={oCarrera.ID}>
              {oCarrera.Nombre}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
};

export default CustomSelectAddAlumno;
