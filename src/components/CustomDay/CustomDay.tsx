import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarStore from '../../modules/CurrentMonthCalendarModule/store/CurrentMonthCalendarStore';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const CustomDay = styled(PickersDay)<PickersDayProps & { hasNote?: boolean }>(
  ({ theme, hasNote }) => ({
    position: 'relative',
    ...(hasNote && {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    }),
    '&:hover .remove-button': {
      opacity: 1,
    },
  })
);

export const DayWithNote = observer((props: PickersDayProps) => {
  const { t } = useTranslation();
  const hasNote = CalendarStore.hasWorkoutForDate(props.day.toISOString());
  const { enqueueSnackbar } = useSnackbar();
  return (
    <>
      <Tooltip
        title={hasNote ? t('calendar.editWorkout') : t('calendar.addWorkout')}
        leaveDelay={100}
      >
        <CustomDay {...props} hasNote={hasNote}>
          {props.day.getDate()}
          {hasNote && (
            <Tooltip title={t('calendar.delWorkout')} leaveDelay={100}>
              <IconButton
                size="small"
                className="remove-button"
                onClick={(e) => {
                  e.stopPropagation();
                  CalendarStore.removeWorkoutByDate(props.day.toISOString());
                  enqueueSnackbar(t('calendar.delNotification'), {
                    variant: 'warning',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                    },
                  });
                }}
                sx={{
                  position: 'absolute',
                  top: 19,
                  right: 7,
                  color: '#ddeedf',
                  zIndex: 1,
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                <CloseIcon sx={{ fontSize: '16px' }} />
              </IconButton>
            </Tooltip>
          )}
        </CustomDay>
      </Tooltip>
    </>
  );
});
