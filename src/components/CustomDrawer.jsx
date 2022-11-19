import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideMenu } from "../utilities/sideMenu";
const drawerWidth = 240;

const CustomDrawer = ({ mobileOpen, window, handleDrawerToggle }) => {
  const navigation = useNavigate();
  const sideMenu = SideMenu();
  const location = useLocation();

  const handleClick = (path) => {
    navigation(path);
  };

  const drawer = (
    <>
      <div>
        <List sx={{ marginTop: "55px" }}>
          {sideMenu.map((text, index) => (
            <ListItem
              button
              key={text.id}
              onClick={() => handleClick(text.path)}
              sx={
                location.pathname === text.path
                  ? styles.buttonContainer
                  : styles.buttonContainerInactive
              }
            >
              <ListItemIcon
                style={
                  location.pathname === text.path
                    ? styles.buttonIcon
                    : styles.buttonIconInactive
                }
              >
                {text.icon}
              </ListItemIcon>
              <ListItemText
                primary={text.title}
                style={
                  location.pathname === text.path
                    ? styles.buttonText
                    : styles.buttonTextInactive
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderColor: "#cbc26d",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

const styles = {
  buttonContainer: {
    backgroundColor: "#ffffcf",
    padding: 2,
  },
  buttonIcon: {
    color: "#cbc26d",
  },
  buttonText: {
    color: "#cbc26d",
  },
  buttonContainerInactive: {
    backgroundColor: "white",
    padding: 2,
  },
  buttonIconInactive: {
    color: "#C4C4C4",
  },
  buttonTextInactive: {
    color: "#C4C4C4",
  },
};

export default CustomDrawer;
