import React from "react";
import { MenuItem, Select } from "@mui/material";

const CustomSelect = ({ label, value, style, onChange,data }) => {

  return (
    <div>
      <Select
            label={label}
            id="controllable-states-demo"
            value={value}
            onChange={onChange}
            variant="outlined"
            sx={{...style}}
          >
            {data?.map((oCarrera) => (
            <MenuItem value={oCarrera.ID}>{oCarrera.Nombre}</MenuItem>
          ))}
            
          </Select>
      
    </div>
  );
};

export default CustomSelect;