import { createTheme, ThemeProvider } from "@mui/material";
import Router from "./routes/Routes";
import AlumnosContextProvider from "./context/alumnosContext";
import TokenContext from "./context/TokenContext";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth, Hub } from "aws-amplify";
const App = () => {
  let [user, setUser] = useState(null);
  useEffect(() => {
    let updateUser = async (authState) => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        await Auth.currentSession().then((res) => {
          let accessToken = res.getAccessToken();
          let jwt = accessToken.getJwtToken();
          console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
          console.log(`myJwt: ${jwt}`);
        });
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    Hub.listen("auth", updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event
    return () => Hub.remove("auth", updateUser); // cleanup
  }, []);
  console.log(user);
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
      <TokenContext.Provider value={user}>
        <AlumnosContextProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </AlumnosContextProvider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
};

export default withAuthenticator(App);
