import { Box, Card, CardContent, Typography } from "@mui/material";
import Table from "./TableCarreras";
import React from "react";
const Carrera = () => {
  return (
    <Box flex={4} p={2}>
      <Card sx={{ margin: 10 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Table />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Carrera;
