import React from 'react';
import { Routes, Route } from 'react-router';
import CurrentMonthCalendarView from './modules/CurrentMonthCalendarModule/components/CurrentMonthCalendarView/CurrentMonthCalendarView';
import WorkoutYouTubeModule from './modules/WorkoutYouTubeModule/components/WorkoutYouTubeModule';
import ActivityHistory from './modules/ActivityHistoryModule/components/ActivityHistory';
import ProfileDashboard from './components/ProfileDashboard/ProfileDashboard';
import { BrowserRouter } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/move-with-calendar">
      <Routes>
        <Route path="/" element={<ProfileDashboard />} />
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
    </BrowserRouter>
  );
};

export default AppRoutes;
