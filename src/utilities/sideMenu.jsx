import PollIcon from "@mui/icons-material/Poll";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import GradingIcon from "@mui/icons-material/Grading";
import GroupsIcon from "@mui/icons-material/Groups";
export const SideMenu = () => {
  return sideMenu;
};

const sideMenu = [
  {
    id: 1,
    title: "Panel Principal",
    icon: <PollIcon />,
    path: "/",
  },
  {
    id: 3,
    title: "Alumnos",
    icon: <Diversity3Icon />,
    path: "/Alumnos",
  },
  {
    id: 2,
    title: "Calificaciones",
    icon: <GradingIcon />,
    path: "/Calificaciones",
  },

  {
    id: 4,
    title: "Carreras",
    icon: <BusinessIcon />,
    path: "/Carreras",
  },
  {
    id: 5,
    title: "Docentes",
    icon: <GroupWorkIcon />,
    path: "/Docentes",
  },
  {
    id: 6,
    title: "Grupos",
    icon: <GroupsIcon />,
    path: "/Grupos",
  },
  {
    id: 7,
    title: "Materias",
    icon: <AssignmentIcon />,
    path: "/Materias",
  },
];
