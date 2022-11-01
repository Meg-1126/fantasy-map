import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Lists from "./pages/Lists/Lists";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#232946",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/lists" element={<Lists />} />
          <Route path="/place" />
          <Route path="/profile" />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
