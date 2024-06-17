import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

const BackToMainMenuButton = () => {
  return (
    <Button         
        component={Link} to="/">
      <HomeIcon />
    </Button>
  );
};

export default BackToMainMenuButton;
