import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Lists from "./pages/Lists/Lists";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

import { Place } from "./pages/Place/Place";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import CreateList from "./pages/Lists/CreateList";
import { SeeList } from "./pages/Lists/SeeList";
import { CreatePlace } from "./pages/Place/CreatePlace";
import { Home } from "./pages/Home/Home";
import { Result } from "./pages/Result/Result";
import AppContext, { LoggedUser } from "./context/AppContext";
import { useHttpRequest } from "./Utils/httpRequest-hook";

const theme = createTheme({
  palette: {
    primary: {
      main: "#232946",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
  },
  typography: {
    fontFamily: ["Merriweather", "serif"].join(","),
  },
});

function App() {
  const { sendRequest } = useHttpRequest();
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  const fetchUserDataFromToken = async () => {
    const data = await sendRequest("/api/users/jwt", "GET");
    if (data) {
      setLoggedUser(data);
    }
  };

  useEffect(() => {
    fetchUserDataFromToken();
  }, []);

  return (
    <div className="App">
      <AppContext initialState={{ loggedUser }}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/lists/:lid" element={<Lists />} />
            <Route path="/list/create" element={<CreateList />} />
            <Route path="/list/:lid" element={<CreateList />} />
            <Route path="/list/see" element={<SeeList />} />
            <Route path="/place/:pid" element={<Place />} />
            <Route path="/place/create" element={<CreatePlace />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/result" element={<Result />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </AppContext>
    </div>
  );
}

export default App;
