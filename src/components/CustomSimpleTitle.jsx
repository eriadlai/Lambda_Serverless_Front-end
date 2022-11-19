import { Typography } from "@mui/material";
import React from "react";

const CustomSimpleTitle = ({ titulo, mb }) => {
  return (
    <Typography
      variant="h5"
      sx={{ marginLeft: "30px", marginTop: "40px" }}
      mb={mb}
    >
      {titulo}
    </Typography>
  );
};

export default CustomSimpleTitle;