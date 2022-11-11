import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Post = () => {
  return (
    <Card sx={{margin:10}}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor:"red"}} aria-label="recipe">
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
       PAGINA PRINCIPAL
      </Typography>
    </CardContent>
  </Card>
  )
}
export default Post