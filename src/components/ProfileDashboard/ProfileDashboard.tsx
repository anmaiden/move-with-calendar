import React from 'react';
import { cn } from '@bem-react/classname';
import './ProfileDashboard.scss';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import calendarStore from '../../modules/CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from '../../modules/SettingsModule/components/Settings';
import ProfileModule from '../../modules/ProfileModule/components/ProfileModule';

const cnProfileDashboard = cn('ProfileDashboard');

const ProfileDashboard = observer(() => {
  const savedWorkouts = calendarStore.savedData.savedData;
  const lastWorkout =
    savedWorkouts.length > 0 ? savedWorkouts[savedWorkouts.length - 1] : null;
  const [userName, setUserName] = React.useState('');
  const userProfile = localStorage.getItem('userProfile');

  React.useEffect(() => {
    setUserName(userProfile ? JSON.parse(userProfile).name : '');
  }, [userProfile]);

  // todo: create store for userProfileData, fix bug with note error formik text, i18n, dark\light styles
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} className={cnProfileDashboard()}>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            component="div"
            className={cnProfileDashboard('WelcomeText')}
          >
            Welcome to app, {userName}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3} className={cnProfileDashboard('Profile')}>
            <CardContent>
              <ProfileModule />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3} className={cnProfileDashboard('Workout')}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Last Workout
                </Typography>
              </Box>

              {lastWorkout ? (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Date:</strong>{' '}
                    {format(new Date(lastWorkout.date), 'PPP')}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Calories burned:</strong>{' '}
                    {lastWorkout.calories || 'N/A'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Note:</strong> {lastWorkout.note || 'No notes'}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">
                  No workouts recorded yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card elevation={3} className={cnProfileDashboard('Settings')}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <SettingsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  App settings
                </Typography>
              </Box>
              <Settings />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProfileDashboard;
