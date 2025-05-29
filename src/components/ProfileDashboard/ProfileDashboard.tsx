import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import './ProfileDashboard.scss';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from '../../modules/SettingsModule/components/Settings';
import ProfileModule from '../../modules/ProfileModule/components/ProfileModule';
import { profileStore } from '../../modules/ProfileModule/store/ProfileStore';
import LastWorkout from '../../modules/LastWorkoutModule/components/LastWorkout';
import { fetchChannelPlaylists } from '../../modules/WorkoutYouTubeModule/service/WorkoutYouTubeService';
import workoutYouTubeStore from '../../modules/WorkoutYouTubeModule/store/WorkoutYouTubeStore';

const cnProfileDashboard = cn('ProfileDashboard');

// todo: i18n, dark\light styles
const ProfileDashboard = observer(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchChannelPlaylists()
      .then((playlists) => {
        workoutYouTubeStore.setPlaylists(playlists);
      })
      .catch((error) => {
        console.error('Failed to load playlists:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} className={cnProfileDashboard()}>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            component="div"
            className={cnProfileDashboard('WelcomeText')}
          >
            Welcome! Lets move with {profileStore.userName}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3} className={cnProfileDashboard('Card')}>
            <CardContent>
              <ProfileModule />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3} className={cnProfileDashboard('Card')}>
            <CardContent>
              <LastWorkout />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card elevation={3} className={cnProfileDashboard('Card')}>
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
