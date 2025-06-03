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
import { useTranslation } from 'react-i18next';
import { enUS, ru } from 'date-fns/locale';
import { profileStore } from '../../../ProfileModule/store/ProfileStore';

const cnCurrentMonthCalendarView = cn('CurrentMonthCalendarView');

const CurrentMonthCalendarView = observer(() => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { t } = useTranslation();

  const getDateFnsLocale = () => {
    switch (profileStore.profileData.lang) {
      case 'ru':
        return ru;
      case 'en':
      default:
        return enUS;
    }
  };

  return (
    <Box className={cnCurrentMonthCalendarView()}>
      <Typography className={cnCurrentMonthCalendarView('Title')}>
        {t('calendar.title')}
      </Typography>

      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={getDateFnsLocale()}
      >
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
