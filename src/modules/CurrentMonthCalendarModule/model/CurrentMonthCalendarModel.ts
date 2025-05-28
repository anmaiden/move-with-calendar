export interface CurrentMonthCalendarListModel {
  savedData: CurrentMonthCalendarModel[];
}

export interface CurrentMonthCalendarModel {
  date: string;
  videoUrl: string;
  weekNumber: number | null;
  dayNumber: number | null;
  calories: number | null;
  note: string;
}
