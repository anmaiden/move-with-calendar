import React from 'react';
import './Footer.scss';
import { cn } from '@bem-react/classname';
import { Grid, Link } from '@mui/material';

const cnFooter = cn('Footer');

const Footer = () => {
  return (
    <Grid container spacing={2} className={cnFooter()}>
      <Grid size={4} className={cnFooter('TitleApp')}>
        Move with app
      </Grid>
      <Grid size={4}>{new Date().getFullYear()}</Grid>

      <Grid size={4}>
        <Link
          underline="hover"
          target="_blank"
          rel="noopener"
          color={'primary'}
          href={'https://github.com/anmaiden'}
          className={cnFooter('Link')}
        >
          @anmaiden
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
