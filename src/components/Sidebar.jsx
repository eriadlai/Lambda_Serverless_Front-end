import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PagesRoundedIcon from "@mui/icons-material/PagesRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import Brightness2RoundedIcon from "@mui/icons-material/Brightness2Rounded";
import SsidChartRoundedIcon from '@mui/icons-material/SsidChartRounded';
const Sidebar = ({ mode, setMode}) => {
  const [open, setOpen] = useState(false);
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "flex" } }}>
      <Box
        position={"fixed"}
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon>
                <HomeRoundedIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="/Academico">
              <ListItemIcon>
                <GroupWorkRoundedIcon/>
              </ListItemIcon>
              <ListItemText primary="Academico" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="/Financiero">
              <ListItemIcon>
                <GroupWorkRoundedIcon/>
              </ListItemIcon>
              <ListItemText primary="Financiero" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="/Inscripciones">
              <ListItemIcon>
                <PagesRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Inscripciones" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="/Portafolio">
              <ListItemIcon>
                <SsidChartRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Portafolio" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="/Enlaces">
              <ListItemIcon>
                <ArticleRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Enlaces" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="/Evaluacion">
              <ListItemIcon>
                <ArticleRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Evaluacion" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <Brightness2RoundedIcon />
              </ListItemIcon>
              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
