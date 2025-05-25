import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage/StartPage';
import CurrentMonthCalendarView from './modules/CurrentMonthCalendarModule/components/CurrentMonthCalendarView/CurrentMonthCalendarView';
import ChooseByYourselfView from './modules/ChooseByYourselfModule/components/ChooseByYourselfView/ChooseByYourselfView';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route
        path="/current-month-calendar"
        element={<CurrentMonthCalendarView />}
      />
      <Route path="/choose-by-yourself" element={<ChooseByYourselfView />} />
    </Routes>
  );
};

export default AppRoutes;
