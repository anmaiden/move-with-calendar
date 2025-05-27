import { WorkoutYouTubeModel } from '../model/WorkoutYouTubeModel';
import axios from 'axios';

export const fetchChannelPlaylists = (): Promise<WorkoutYouTubeModel[]> => {
  return axios
    .get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: 'snippet',
        channelId: process.env.REACT_APP_YOUTUBE_CHANNEL_ID,
        maxResults: 12,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    })
    .then((response) => {
      return response.data.items.map((item: any) => ({
        url: `https://www.youtube.com/playlist?list=${item.id}`,
        title: item.snippet.title,
        thumbnails: item.snippet.thumbnails?.default?.url,
      }));
    })
    .catch((error) => {
      console.error('Error fetching YouTube playlists:', error);
      throw error;
    });
};
