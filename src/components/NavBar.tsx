import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", color: "white" }}
          >
            Parking Web App
          </Typography>

          {token ? (
            <Button
              onClick={handleLogout}
              variant="text"
              sx={{ color: "white" }}
              startIcon={<AccountCircle />}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="text"
              sx={{ color: "white" }}
              startIcon={<AccountCircle />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            bgcolor: "#222",
            height: "100vh",
          }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <ListItem
              component="button"
              onClick={() => handleNavigation("/parking-grid")}
              sx={{
                color: "white",
                backgroundColor: "#222",
                border: "none",
                "&:hover": { backgroundColor: "#444" },
              }}
            >
              <ListItemText primary="Parking Grid (User)" />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => handleNavigation("/parking-spots")}
              sx={{
                color: "white",
                backgroundColor: "#222",
                border: "none",
                "&:hover": { backgroundColor: "#444" },
              }}
            >
              <ListItemText primary="Parking Spots Console (Admin)" />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => handleNavigation("/scan-qr")}
              sx={{
                color: "white",
                backgroundColor: "#222",
                border: "none",
                "&:hover": { backgroundColor: "#444" },
              }}
            >
              <ListItemText primary="Scan QR Code" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
