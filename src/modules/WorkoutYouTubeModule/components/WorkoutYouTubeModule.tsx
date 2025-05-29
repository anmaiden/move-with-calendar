import React, { useEffect, useState } from 'react';
import './WorkoutYouTubeModule.scss';
import { CircularProgress, Grid } from '@mui/material';
import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import workoutYouTubeStore from '../store/WorkoutYouTubeStore';
import PlaylistCardComponent from '../../../components/PlaylistCardComponent/PlaylistCardComponent';
import { fetchChannelPlaylists } from '../service/WorkoutYouTubeService';

const cnWorkoutYouTubeModule = cn('WorkoutYouTubeModule');

const WorkoutYouTubeModule = observer(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workoutYouTubeStore.isLoaded) {
      setLoading(true);
      fetchChannelPlaylists()
        .then((playlists) => workoutYouTubeStore.setPlaylists(playlists))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [workoutYouTubeStore.isLoaded]);

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
              <PlaylistCardComponent
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
