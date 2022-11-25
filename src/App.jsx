import { createTheme, ThemeProvider } from "@mui/material";
import Router from "./routes/Routes";
import AlumnosContextProvider from "./context/alumnosContext";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useMemo } from "react";
const App = () => {
  const darkmode = useSelector((state) => state.darkmode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#F1C40F",
          },
          secondary: {
            main: darkmode.isDarkMode ? "#ffffff" : "#000000",
          },
          white: {
            main: "#fff",
          },
          mode: darkmode.isDarkMode ? "dark" : "light",
        },
        typography: {
          h5: {
            fontWeight: 700,
            fontSize: "24px",
            color: darkmode.isDarkMode ? "white" : "black",
          },
          h6: {
            fontSize: "20px",
            fontWeight: 400,
            color: darkmode.isDarkMode ? "white" : "black",
          },
        },
      }),
    [darkmode]
  );
  return (
    <BrowserRouter>
      <AlumnosContextProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </AlumnosContextProvider>
    </BrowserRouter>
  );
};

export default App;
