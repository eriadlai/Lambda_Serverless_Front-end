import PollIcon from "@mui/icons-material/Poll";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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
    icon: <AssignmentIcon />,
    path: "/Alumnos",
  },
  {
    id: 2,
    title: "Calificaciones",
    icon: <AttachMoneyIcon />,
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
    icon: <AddCircleOutlineIcon />,
    path: "/Docentes",
  },
  {
    id: 6,
    title: "Grupos",
    icon: <DesktopWindowsIcon />,
    path: "/Grupos",
  },
  {
    id: 7,
    title: "Materias",
    icon: <PersonOutlineIcon />,
    path: "/Materias",
  },
];
