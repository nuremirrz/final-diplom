import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, Divider, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import ManasLogo from '../img/Manas_logo.png';
import Mpretn from '../img/мпрэтн.png';

const NavBar = ({ selectedYear, onYearChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние аутентификации пользователя
  const isMobile = useMediaQuery('(max-width:680px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const defaultStyleForLink = {
    color: 'black',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    // Очищаем состояние аутентификации
    setIsLoggedIn(false);
    // Перенаправляем пользователя на главную страницу
    window.location.href = "/";
  };

  // Генерация списка годов от 1990 до 2030
  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    onYearChange(year, event); // Передаем и значение года, и объект события
  };

  const currentYear = new Date().getFullYear();
  // const years = ['all years'];
  const years = [];
  for (let year = 1990; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#02b887', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ marginRight: '16px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to='/' style={defaultStyleForLink}>
              <div className="logos">
                <img src={ManasLogo} alt="manas_logo" className="navbar__left_img manas"/>
                <img src={Mpretn} alt="mpretn" className="navbar__right_img mpretn"/>
              </div>
            </Link>
          </Typography>
          {/* Добавление выпадающего списка годов */}
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            displayEmpty
            inputProps={{ 'aria-label': 'select year' }}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          >
            <MenuItem value="" disabled>
              Год
            </MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
          {/* Конец выпадающего списка */}
          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              {/* Your menu icon (e.g., MenuIcon) */}
            </IconButton>
          ) : (
            <>
              <Button>
                <Link to='/main' style={defaultStyleForLink}>Map</Link>
              </Button>
              <Button>
                <Link to='/info' style={defaultStyleForLink}>Info</Link>
              </Button>
              <Button>
                <Link to='/tli' style={defaultStyleForLink}>TLI</Link>
              </Button>
              <Button>
                <Link to='/tsi' style={defaultStyleForLink}>TSI</Link>
              </Button>               
              <Button>
                <Link to='/calculate' style={defaultStyleForLink}>Calculator</Link>
              </Button>
              <Button>
                <Link to='/hydrochem' style={defaultStyleForLink}>Parametres</Link>
              </Button>
              {isLoggedIn ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Button>
                  <Link to='https://5eaa-178-217-174-2.ngrok-free.app/auth/operator/login' target='_blank' style={defaultStyleForLink}>Login</Link>
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <div sx={{ width: '250px'}}>
          <List >
            <ListItem >
              <ListItemText primary={<Link to='/' style={defaultStyleForLink}>
              <div className="logos">
                <img src={ManasLogo} alt="manas_logo" className="navbar__left_img manas"/>
                <img src={Mpretn} alt="mpretn" className="navbar__right_img mpretn"/>
              </div>
              </Link>} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={<Link to='/main' style={defaultStyleForLink}>Map</Link>} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={<Link to='/info' style={defaultStyleForLink}>Info</Link>} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={<Link to='/tli' style={defaultStyleForLink}>TLI</Link>} />
            </ListItem> 
            <ListItem button>
              <ListItemText primary={<Link to='/tsi' style={defaultStyleForLink}>TSI</Link>} />
            </ListItem>            
            <ListItem button>
              <ListItemText primary={<Link to='/calculate' style={defaultStyleForLink}>Calculator</Link>} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={<Link to='/hydrochem' style={defaultStyleForLink}>Parametres</Link>} />
            </ListItem>
            {isLoggedIn ? (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button>
                <ListItemText primary={<Link to='https://5eaa-178-217-174-2.ngrok-free.app/auth/operator/login' target='_blank' style={defaultStyleForLink}>Login</Link>} />
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </Box>
  );
};

export default NavBar;
