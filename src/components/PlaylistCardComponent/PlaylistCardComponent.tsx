import React from 'react';
import './PlaylistCardComponent.scss';
import { cn } from '@bem-react/classname';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const cnPlaylistCardComponent = cn('PlaylistCardComponent');

interface PlaylistCardComponentProps {
  youtubeUrl: string;
  title: string;
  imageUrl?: string;
}

const PlaylistCardComponent = (props: PlaylistCardComponentProps) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Card sx={{ maxWidth: 290 }} className={cnPlaylistCardComponent('Card')}>
        <CardMedia
          sx={{ height: 170 }}
          image={props.imageUrl}
          title={props.title}
          className={cnPlaylistCardComponent('CardMedia')}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href={props.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('activity.goToPlaylist')}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PlaylistCardComponent;
