import React, { useEffect, useState } from 'react';
import './WorkoutYouTubeModule.scss';
import { useSnackbar } from 'notistack';
import { CircularProgress, Grid } from '@mui/material';
import LinksComponent from '../../../components/LinksComponent/LinksComponent';
import { fetchChannelPlaylists } from '../service/WorkoutYouTubeService';
import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import workoutYouTubeStore from '../store/WorkoutYouTubeStore';

const cnWorkoutYouTubeModule = cn('WorkoutYouTubeModule');

const WorkoutYouTubeModule = observer(() => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchChannelPlaylists()
      .then((data) => {
        workoutYouTubeStore.setPlaylists(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        enqueueSnackbar('Failed to load YouTube playlists', {
          variant: 'error',
          autoHideDuration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className={cnWorkoutYouTubeModule('Loader')}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={1} className={cnWorkoutYouTubeModule()}>
          {workoutYouTubeStore.playlists.map((playlist) => (
            <Grid
              size={{ xs: 12, md: 4, lg: 2 }}
              key={playlist.url}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <LinksComponent
                youtubeUrl={playlist.url}
                title={playlist.title}
                imageUrl={playlist.thumbnails}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
});

export default WorkoutYouTubeModule;
