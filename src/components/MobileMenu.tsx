import React from "react";
import {
  Typography,
  Divider,
  List,
  ListItem,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ChevronLeft } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useHttpRequest } from "../Utils/httpRequest-hook";
import { useAppContext } from "../context/AppContext";
import { MobileMenu as MobileMenuType } from "../../typings";

interface Props {
  isMenuOpen: boolean,
  setIsMenuOpen: (value: boolean) => void,
}

const MobileMenu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigationLinks:MobileMenuType[] = [
    {
      id: 1,
      name: "Profile",
      href: `/profile/`,
    },
    {
      id: 2,
      name: "Create a new place",
      href: `/place/create`,
    },
    {
      id: 3,
      name: "Create a new list",
      href: `/list/create`,
    },
    {
      id: 4,
      name: "View your list",
      href: `/list/see`,
    },
  ];
  const navigate = useNavigate();
  const { sendRequest } = useHttpRequest();
  const { dispatch, state } = useAppContext();
  const handleClickLogout: React.MouseEventHandler = () => {
    sendRequest("/api/users/signout", "POST").then(() => {
      dispatch({ type: "logout" });
      navigate("/");
    });
  };

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpen={() => setIsMenuOpen(true)}
        PaperProps={{
          sx: {
            backgroundColor: "#f2ebde",
          },
        }}
      >
        <div>
          <IconButton>
            <ChevronLeft onClick={() => setIsMenuOpen(false)} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>Hello, {state?.loggedUser?.name}</ListItem>
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", marginTop: "32px" }}
          >
            MENU
          </Typography>
          {navigationLinks.map((item) => (
            <ListItem key={item.id}>
              <Link
                key={item.id}
                to={item.href}
                style={{
                  textDecoration: "none",
                  color: "#282010",
                  fontWeight: "bold",
                }}
              >
                {item.id}: {item.name}
              </Link>
            </ListItem>
          ))}
          <ListItem sx={{ marginTop: "80px" }}>
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              onClick={handleClickLogout}
              sx={{ lineHeight: "1rem" }}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default MobileMenu;
