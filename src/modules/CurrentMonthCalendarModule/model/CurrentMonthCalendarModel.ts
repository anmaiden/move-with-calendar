import { WorkoutYouTubeModel } from '../../WorkoutYouTubeModule/model/WorkoutYouTubeModel';

export interface CurrentMonthCalendarListModel {
  savedData: CurrentMonthCalendarModel[];
}

export interface CurrentMonthCalendarModel {
  date: string;
  videoPlaylist: string | null;
  dayNumber: number;
  calories: number;
  note: string;
}
