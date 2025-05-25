import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage/StartPage';
import CurrentMonthCalendarView from './modules/CurrentMonthCalendarModule/components/CurrentMonthCalendarView/CurrentMonthCalendarView';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route
        path="/current-month-calendar"
        element={<CurrentMonthCalendarView />}
      />
    </Routes>
  );
};

export default AppRoutes;
