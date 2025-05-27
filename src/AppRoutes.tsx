import React from 'react';
import { Routes, Route } from 'react-router';
import CurrentMonthCalendarView from './modules/CurrentMonthCalendarModule/components/CurrentMonthCalendarView/CurrentMonthCalendarView';
import WorkoutYouTubeModule from './modules/WorkoutYouTubeModule/components/WorkoutYouTubeModule';
import ActivityHistory from './modules/ActivityHistoryModule/components/ActivityHistory';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/current-month-calendar"
        element={<CurrentMonthCalendarView />}
      />
      <Route
        path="/playlists"
        element={<WorkoutYouTubeModule key="youtube-module" />}
      />
      <Route path="/activity_history" element={<ActivityHistory />} />
    </Routes>
  );
};

export default AppRoutes;
