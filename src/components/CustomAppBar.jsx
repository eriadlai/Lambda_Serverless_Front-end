import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import SwitchDarkMode from "../redux/DarkModeActions";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import { Auth } from "aws-amplify";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F3F3F3",
  "&:hover": {
    backgroundColor: "#F3F3F3",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,

  [theme.breakpoints.up("sm")]: {
    width: "900px",
    marginRight: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "900px",
    },
  },
}));

const MenuOptions = () => {
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  // Hook para conocer el tamaño de la pantalla
  const forMobile = useMediaQuery("(min-width:600px)");

  // hook para utilizar acciones de redux
  const dispatch = useDispatch();

  // hook para conocer el estado de darkmode
  const darkMode = useSelector((state) => state.darkmode.isDarkMode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {forMobile ? (
        <>
          <Badge badgeContent={7} color="error">
            <IconButton id="notification-button" aria-haspopup="true">
              <NotificationsIcon size={10} />
              <Typography ml={"15px"}>Notificaciones</Typography>
            </IconButton>
            <Menu
              id="notification-menu"
              MenuListProps={{
                "aria-labelledby": "notification-button",
              }}
            ></Menu>
          </Badge>

          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsIcon size={10} />
            <Typography ml={"5px"}>Configuración</Typography>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => dispatch(SwitchDarkMode())}>
              {darkMode ? "Modo claro" : "Modo oscuro"}
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Cerrar Sesión</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Badge badgeContent={7} color="error">
            <IconButton
              id="notification-button"
              aria-controls={open ? "notification-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <NotificationsIcon size={10} />
            </IconButton>
            <Menu
              id="notification-menu"
              MenuListProps={{
                "aria-labelledby": "notification-button",
              }}
            ></Menu>
          </Badge>

          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsIcon size={10} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => dispatch(SwitchDarkMode())}>
              {darkMode ? "Modo claro" : "Modo oscuro"}
            </MenuItem>
            <MenuItem>Cerrar Sesión</MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

const CustomAppBar = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: "1px solid #cbc26d",
      }}
      color="white"
      elevation={0}
      //Change border color
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => handleDrawerToggle()}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="black" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Busqueda..."
            inputProps={{
              "aria-label": "search",
            }}
          />
        </Search>
        <MenuOptions />
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
