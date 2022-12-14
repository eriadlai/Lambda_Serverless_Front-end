import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
const Feed = () => {
  return (
    <Box flex={4} p={2}>
      <Box flex={4} p={2}>
        <Card sx={{ margin: 10 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              PANTALLA PRINCIPAL
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Feed;
