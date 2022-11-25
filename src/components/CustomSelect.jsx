import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CustomSelect = ({ label, data, style, onChange }) => {
  const [value, setValue] = React.useState(data[0]);
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue, label);
  };

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={data}
        sx={{ ...style }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
};

export default CustomSelect;