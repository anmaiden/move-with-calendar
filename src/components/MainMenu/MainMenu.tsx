import React from 'react';
import './MainMenu.scss';
import { CircularProgress, Grid, IconButton, Tooltip } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BarChartIcon from '@mui/icons-material/BarChart';
import { cn } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';

const cnMainMenu = cn('MainMenu');

const MainMenu = () => {
  const navigate = useNavigate();

  const handleCurrentMonthClick = () => {
    navigate('/current-month-calendar');
  };

  const handlePlaylistsClick = () => {
    navigate('/playlists');
  };

  const handleActivityClick = () => {
    navigate('/activity_history');
  };

  return (
    <Grid container className={cnMainMenu()}>
      <Grid size={4} className={cnMainMenu('Item')}>
        <Tooltip title={'Add workout'}>
          <IconButton
            loadingIndicator={<CircularProgress color="inherit" size={12} />}
            size={'small'}
            color={'primary'}
            onClick={handleCurrentMonthClick}
          >
            <EditCalendarIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid size={4} className={cnMainMenu('Item')}>
        <Tooltip title={'Expand MoveWith playlists'}>
          <IconButton
            loadingIndicator={<CircularProgress color="inherit" size={12} />}
            size={'small'}
            color={'primary'}
            onClick={handlePlaylistsClick}
          >
            <SubscriptionsIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid size={4} className={cnMainMenu('Item')}>
        <Tooltip title={'My statistics'}>
          <IconButton
            loadingIndicator={<CircularProgress color="inherit" size={12} />}
            size={'small'}
            color={'primary'}
            onClick={handleActivityClick}
          >
            <BarChartIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default MainMenu;
