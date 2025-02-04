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
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: 'white' }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 1, color: 'white' }}
          >
            Parking Web App
          </Typography>

          <IconButton
            size="large"
            color="inherit"
            aria-label="account"
            onClick={() => navigate('/login')}
            sx={{ color: 'white' }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250, bgcolor: '#222', color: 'white', height: '100vh' }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <ListItem component="li" onClick={() => handleNavigation('/menu')}>
              <ListItemText primary="Home" sx={{ color: 'white' }} />
            </ListItem>
            <ListItem component="li" onClick={() => handleNavigation('/scan')}>
              <ListItemText primary="Scan QR" sx={{ color: 'white' }} />
            </ListItem>
            <ListItem component="li" onClick={() => handleNavigation('/history')}>
              <ListItemText primary="Parking History" sx={{ color: 'white' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
