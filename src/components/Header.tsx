import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button 
            color="inherit" 
            component={Link} //navigate to home page '/'
            to="/"
            sx={{ mr: 2 }}
          >
            Home 
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/saved"
          >
            Saved
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;