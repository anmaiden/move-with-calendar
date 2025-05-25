import React, { useEffect, useState } from 'react';
import './WorkoutYouTubeModule.scss';
import { WorkoutYouTubeModel } from '../model/WorkoutYouTubeModel';
import { useSnackbar } from 'notistack';
import { CircularProgress, Grid } from '@mui/material';
import LinksComponent from '../../../components/LinksComponent/LinksComponent';
import { fetchChannelPlaylists } from '../service/WorkoutYouTubeService';
import { cn } from '@bem-react/classname';

const cnWorkoutYouTubeModule = cn('WorkoutYouTubeModule');

const WorkoutYouTubeModule = () => {
  const [playlists, setPlaylists] = useState<WorkoutYouTubeModel[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const data = await fetchChannelPlaylists();
        setPlaylists(data);
      } catch (error) {
        enqueueSnackbar('Failed to load YouTube playlists', {
          variant: 'error',
          autoHideDuration: 3000,
        });
        console.error('Error loading playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  return (
    <>
      {loading ? (
        <div className={cnWorkoutYouTubeModule('Loader')}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={1} className={cnWorkoutYouTubeModule()}>
          {playlists.map((playlist) => (
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
};

export default WorkoutYouTubeModule;
