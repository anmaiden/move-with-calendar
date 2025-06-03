import React from 'react';
import { differenceInDays } from 'date-fns';
import { observer } from 'mobx-react-lite';
import calendarStore from '../../CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../utils/helper';

const LastWorkout = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleAddClick = () => {
    navigate('/current-month-calendar');
  };
  const savedWorkouts = calendarStore.savedData.savedData;

  const getClosestWorkout = () => {
    if (savedWorkouts.length === 0) return null;

    const now = new Date();
    let closestWorkout = null;
    let smallestDiff = Infinity;

    savedWorkouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      const diff = differenceInDays(now, workoutDate);

      if (diff >= 0 && diff < smallestDiff) {
        smallestDiff = diff;
        closestWorkout = workout;
      }
    });

    return closestWorkout || savedWorkouts[savedWorkouts.length - 1];
  };

  const closestWorkout = getClosestWorkout();

  return (
    <Grid size={{ xs: 12 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          {t('workout.title')}
        </Typography>
      </Box>

      {closestWorkout ? (
        <>
          <Typography variant="body1" gutterBottom>
            <strong>{t('workout.date')}:</strong>{' '}
            {formatDate(closestWorkout.date)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>{t('workout.playlist')}:</strong>{' '}
            {closestWorkout.videoPlaylist}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>{t('workout.day')}:</strong> {closestWorkout.dayNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>{t('workout.calories')}:</strong>{' '}
            {closestWorkout.calories || '-'}
          </Typography>
          <Typography variant="body1">
            <strong>{t('workout.note')}:</strong>{' '}
            {closestWorkout.note || t('workout.withoutNote')}
          </Typography>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">
            {t('workout.noWorkoutsRecorded', 'No workouts recorded yet')}
          </Typography>
          <Tooltip title={t('workout.add')}>
            <IconButton onClick={handleAddClick} size="small" color="primary">
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Grid>
  );
});

export default LastWorkout;
