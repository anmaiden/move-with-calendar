import React from 'react';
import './StartPage.scss';
import { cn } from '@bem-react/classname';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const cnStartPage = cn('StartPage');

const StartPage = () => {
  const navigate = useNavigate();

  const handleCurrentMonthClick = () => {
    navigate('/current-month-calendar');
  };

  const handleChooseByYourselfClick = () => {
    navigate('/choose-by-yourself');
  };

  return (
    <Grid container spacing={2} className={cnStartPage()}>
      <Grid size={3}>
        <Button fullWidth variant="contained" onClick={handleCurrentMonthClick}>
          Current Month Calendar Mode
        </Button>
      </Grid>
      <Grid size={3}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleChooseByYourselfClick}
        >
          Choose Month By Yourself Mode
        </Button>
      </Grid>
    </Grid>
  );
};
export default StartPage;
