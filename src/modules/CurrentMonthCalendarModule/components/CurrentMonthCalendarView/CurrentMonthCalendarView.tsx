import React, { useState } from 'react';
import './CurrentMonthCalendarView.scss';
import { cn } from '@bem-react/classname';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import CurrentMonthCalendarNoteForm from '../../form/CurrentMonthCalendarNoteForm';

const cnCurrentMonthCalendarView = cn('CurrentMonthCalendarView');

const CurrentMonthCalendarView = observer(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={cnCurrentMonthCalendarView()}>
      <Typography className={cnCurrentMonthCalendarView('Title')}>
        CurrentMonthCalendarMode
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          className={cnCurrentMonthCalendarView('DateCalendar')}
          onChange={(date) => setSelectedDate(date)}
        />
      </LocalizationProvider>

      {selectedDate && (
        <CurrentMonthCalendarNoteForm
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
});

export default CurrentMonthCalendarView;
