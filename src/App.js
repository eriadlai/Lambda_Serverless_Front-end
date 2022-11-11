import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Box, Grid, Stack, ThemeProvider } from "@mui/material";
import Router from "./routes/Routes";
import useThemes from "./theme";
function App() {
  const { mode, coloresTheme, setMode } = useThemes("light");
  return (
    <ThemeProvider theme={coloresTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar setMode={setMode} mode={mode} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Grid container spacing={8}>
            <Grid item xs={3}>
              <Sidebar setMode={setMode} mode={mode} />
            </Grid>
            <Router />
          </Grid>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
