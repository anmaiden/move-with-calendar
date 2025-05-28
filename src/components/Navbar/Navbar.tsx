import React from 'react';
import './Navbar.scss';
import { cn } from '@bem-react/classname';
import { Grid, Typography } from '@mui/material';
import MainMenu from '../MainMenu/MainMenu';
import { BackToHomeButton } from '../Inputs/BackToHomeButton/BackToHomeButton';
import { useLocation } from 'react-router-dom';

const cnNavbar = cn('Navbar');

const Navbar = () => {
  const location = useLocation();
  return (
    <Grid container spacing={2} className={cnNavbar()}>
      <Grid container size={{ xs: 7, sm: 7, md: 7, lg: 7 }}>
        <Typography className={cnNavbar('TitleApp')}>Move With App</Typography>
        {location.pathname !== '/' && <BackToHomeButton />}
      </Grid>

      <Grid size={{ xs: 5, sm: 5, md: 5, lg: 5 }}>
        <MainMenu />
      </Grid>
    </Grid>
  );
};

export default Navbar;
