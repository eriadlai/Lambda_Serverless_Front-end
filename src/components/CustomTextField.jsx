import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      value={value}
      variant="outlined"
      onChange={onChange}
      sx={styles.mobile.textField}
      {...props}
     

    />
  );
};

const styles = {
  mobile: {
    textField: {
      marginLeft: "20px",
      marginRight: "20px",
      marginBottom: "20px",
      height: "54px",
      borderRadius: "5px",
    },
  },
};
export default CustomTextField;