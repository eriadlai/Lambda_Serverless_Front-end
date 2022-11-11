import {Box,Card, CardContent, Typography } from '@mui/material'
import Table from "../utilities/Table"
import React from 'react'
const Academico = () => {
  return (
    <Box flex={4} p={2}>
    <Card sx={{margin:10}}>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
      
      </Typography>
       <Table/>
    </CardContent>
  </Card>
   </Box>
  )
}

export default Academico