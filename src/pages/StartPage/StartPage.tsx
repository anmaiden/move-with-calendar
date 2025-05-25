import React from 'react';
import './StartPage.scss';
import { cn } from '@bem-react/classname';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkoutYouTubeModule from '../../modules/WorkoutYouTubeModule/components/WorkoutYouTubeModule';

const cnStartPage = cn('StartPage');

const StartPage = () => {
  const navigate = useNavigate();

  const handleCurrentMonthClick = () => {
    navigate('/current-month-calendar');
  };

  return (
    <>
      <Grid container spacing={2} className={cnStartPage()}>
        <Grid size={12}>
          <Typography className={cnStartPage('TitleApp')}>
            Move With App
          </Typography>
        </Grid>
        <Grid size={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCurrentMonthClick}
            className={cnStartPage('Button')}
          >
            Add workout to calendar
          </Button>
        </Grid>
      </Grid>

      <WorkoutYouTubeModule />
    </>
  );
};
export default StartPage;
