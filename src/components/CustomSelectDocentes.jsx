import React from "react";
import { MenuItem, Select, Stack } from "@mui/material";

const CustomSelectDocentes = ({ label, value, style, onChange, data }) => {
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
          {data?.map((oDocente) => (
            <MenuItem value={oDocente.ID} key={oDocente.ID}>
              {oDocente.nombre + " " + oDocente.apellido}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
};

export default CustomSelectDocentes;
