import {Box, Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'

const Portafolio = () => {
  return (
    <Box flex={4} p={2}>
   <Box flex={4} p={2}>
    <Card sx={{margin:10}}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
       ACADEMICO
      </Typography>
    </CardContent>
  </Card>
   </Box>
   </Box>
  )
}

export default Portafolio