import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Switch,
  Toolbar,
  ListItemIcon,
  Typography,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PagesRoundedIcon from "@mui/icons-material/PagesRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import Brightness2RoundedIcon from "@mui/icons-material/Brightness2Rounded";
import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Icons = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = ({ mode, setMode }) => {
  const [open, setOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          onClick={(e) => setOpenSidebar(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Mi Campus Cetys - Lambda
        </Typography>
        <Icons>
          <Badge badgeContent={2} color="primary">
            <NotificationsRoundedIcon />
          </Badge>
          <Avatar
            sx={{
              width: 30,
              height: 30,
              bgcolor: "red",
            }}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30, bgcolor: "red" }} />
          <Typography variant="span">Adlai</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Perfil</MenuItem>
        <MenuItem>Configuraciones</MenuItem>
        <MenuItem>Cerrar Sesion</MenuItem>
      </Menu>

      <Menu
        id="Sidebar"
        aria-labelledby="sidebar"
        open={openSidebar}
        onClose={(e) => setOpenSidebar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <ListItemButton component="a" href="/">
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </MenuItem>
        <MenuItem>
          <ListItemButton component="a" href="/Pacientes">
            <ListItemIcon>
              <GroupWorkRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Pacientes" />
          </ListItemButton>
        </MenuItem>
        <MenuItem>
          <ListItemButton component="a" href="/Formulario">
            <ListItemIcon>
              <PagesRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Formulario" />
          </ListItemButton>
        </MenuItem>
        <MenuItem>
          <ListItemButton component="a" href="/Graficos">
            <ListItemIcon>
              <SsidChartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Graficos" />
          </ListItemButton>
        </MenuItem>
        <MenuItem>
          <ListItemButton component="a" href="/Documentos">
            <ListItemIcon>
              <ArticleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Documentos" />
          </ListItemButton>
        </MenuItem>
        <MenuItem>
          <ListItemButton component="a" href="/Documentos">
            <ListItemIcon>
              <Brightness2RoundedIcon />
            </ListItemIcon>
            <Switch
              onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItemButton>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
