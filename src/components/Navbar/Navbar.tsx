import React from 'react';
import './Navbar.scss';
import { cn } from '@bem-react/classname';
import { Grid, Typography } from '@mui/material';
import MainMenu from '../MainMenu/MainMenu';

const cnNavbar = cn('Navbar');

const Navbar = () => {
  return (
    <Grid container spacing={2} className={cnNavbar()}>
      <Grid size={6}>
        <Typography className={cnNavbar('TitleApp')}>Move With App</Typography>
      </Grid>
      <Grid size={3}>
        <MainMenu />
      </Grid>
    </Grid>
  );
};

export default Navbar;
