import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { observer } from 'mobx-react-lite';
import calendarStore from '../../CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';

const LastWorkout = observer(() => {
  const navigate = useNavigate();
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
          {closestWorkout ? 'Last Workout' : 'No Workouts'}
        </Typography>
      </Box>

      {closestWorkout ? (
        <>
          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong>{' '}
            {format(new Date(closestWorkout.date), 'PPP')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Playlist:</strong> {closestWorkout.videoPlaylist}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Calories burned:</strong> {closestWorkout.calories || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Note:</strong> {closestWorkout.note || 'No notes'}
          </Typography>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">No workouts recorded yet</Typography>
          <Tooltip title={'Add workout'}>
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
