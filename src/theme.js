import { createTheme } from "@mui/material/styles";
import { useState } from "react";

const useThemes = tema =>{
  const [mode, setMode] = useState(tema);

  const oColores ={
    primary:"#fff59d",
    secondary:"#ffc354",
    succes:"#4caf50",
    info:"#000000",
    danger:"#d32f2f",
    warning:"#f57c00",
    muted:"rgba(255, 255, 255, 0.5)",
    white:"#fff",
    black:"#000",
    }
    const coloresTheme = createTheme({
      palette: {
        mode:mode,
        primary: {
          main: oColores.primary
        },
        secondary: {
          main: oColores.secondary
        },
        error: {
          main: oColores.danger
        },
        warning: {
          main: oColores.warning
        },
        info: {
          main: oColores.info
        },
        succes: {
          main: oColores.succes
        },
        muted:{
          main:oColores.muted
        }
      },
    });
    return{mode,coloresTheme,setMode}
}
export default useThemes;