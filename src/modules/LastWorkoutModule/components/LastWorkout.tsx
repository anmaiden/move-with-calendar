import React from 'react';
import { format } from 'date-fns';
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
  const lastWorkout =
    savedWorkouts.length > 0 ? savedWorkouts[savedWorkouts.length - 1] : null;

  return (
    <Grid size={{ xs: 12 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          Last Workout
        </Typography>
      </Box>

      {lastWorkout ? (
        <>
          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong> {format(new Date(lastWorkout.date), 'PPP')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Playlist:</strong> {lastWorkout.videoPlaylist}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Calories burned:</strong> {lastWorkout.calories || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Note:</strong> {lastWorkout.note || 'No notes'}
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
