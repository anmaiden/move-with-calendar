import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import CalendarStore from '../../modules/CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';

const CustomDay = styled(PickersDay)<PickersDayProps & { hasNote?: boolean }>(
  ({ theme, hasNote }) => ({
    ...(hasNote && {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    }),
  })
);

export const DayWithNote = (props: PickersDayProps) => {
  const hasNote = CalendarStore.hasNoteForDate(props.day.toISOString());
  return <CustomDay {...props} hasNote={hasNote} />;
};
