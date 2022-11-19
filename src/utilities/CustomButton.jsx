import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

const CustomButton = ({ onClick, texto, styles }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Button
      variant={hovered ? "contained" : "outlined"}
      sx={{ ...styles }}
      onMouseEnter={() => setHovered(!hovered)}
      onMouseLeave={() => setHovered(!hovered)}
      onClick={() => onClick()}
    >
      <Typography variant="body">{texto}</Typography>
    </Button>
  );
};

export default CustomButton;