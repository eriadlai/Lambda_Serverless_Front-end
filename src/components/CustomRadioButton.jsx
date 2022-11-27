import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const CustomRadioButton = ({ label, value, onChange }) => {
  return (
    <Stack sx={styles.mobile.textField}>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onChange}
      >
        <FormControlLabel value={1} control={<Radio />} label="Si" />
        <FormControlLabel value={0} control={<Radio />} label="No" />
      </RadioGroup>
    </Stack>
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
export default CustomRadioButton;
