import React from "react";
import { MenuItem, Select, Stack } from "@mui/material";

const CustomSelectMateria = ({ label, value, style, onChange, data }) => {
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
          {data?.map((oMateria) => (
            <MenuItem value={oMateria.ID} key={oMateria.ID}>
              {oMateria.Nombre}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
};

export default CustomSelectMateria;
