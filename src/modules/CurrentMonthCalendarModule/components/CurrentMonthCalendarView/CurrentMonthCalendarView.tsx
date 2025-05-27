import React, { useState } from 'react';
import './CurrentMonthCalendarView.scss';
import { cn } from '@bem-react/classname';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import CurrentMonthCalendarNoteForm from '../../form/CurrentMonthCalendarNoteForm';
import Theme from '../../../../Theme';
import { DayWithNote } from '../../../../components/CustomDay/CustomDay';
import { BackToHomeButton } from '../../../../components/Inputs/BackToHomeButton/BackToHomeButton';
import ExportToPDF from '../../../ExportToPdfModule/components/ExportToPdf';

const cnCurrentMonthCalendarView = cn('CurrentMonthCalendarView');

const CurrentMonthCalendarView = observer(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Box className={cnCurrentMonthCalendarView()}>
      <BackToHomeButton />

      <Typography className={cnCurrentMonthCalendarView('Title')}>
        Click on a date to create a workout note
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          className={cnCurrentMonthCalendarView('DateCalendar')}
          onChange={(date) => setSelectedDate(date)}
          sx={{
            '& .MuiPickersDay-root': {
              '&.has-note': {
                backgroundColor: Theme.palette.primary.light,
                '&:hover': {
                  backgroundColor: Theme.palette.primary.main,
                },
              },
            },
          }}
          slots={{
            day: DayWithNote,
          }}
        />
      </LocalizationProvider>

      {selectedDate && (
        <CurrentMonthCalendarNoteForm
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </Box>
  );
});

export default CurrentMonthCalendarView;
