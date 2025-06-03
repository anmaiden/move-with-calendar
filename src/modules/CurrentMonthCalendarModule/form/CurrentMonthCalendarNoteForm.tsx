import React from 'react';
import CalendarStore from '../store/CurrentMonthCalendarStore';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import { validationNoteSchema } from '../helper/helper';
import { CurrentMonthCalendarModel } from '../model/CurrentMonthCalendarModel';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import workoutYouTubeStore from '../../WorkoutYouTubeModule/store/WorkoutYouTubeStore';
import { useTranslation } from 'react-i18next';

interface CurrentMonthCalendarNoteFormProps {
  date: Date;
  onClose: () => void;
}

const CurrentMonthCalendarNoteForm = observer(
  (props: CurrentMonthCalendarNoteFormProps) => {
    const { t } = useTranslation();

    const existingWorkout = CalendarStore.getWorkoutByDate(
      props.date.toISOString()
    );
    const { enqueueSnackbar } = useSnackbar();

    const initialCalendarNoteValues: CurrentMonthCalendarModel = {
      date: props.date.toISOString(),
      videoPlaylist: existingWorkout?.videoPlaylist || '',
      dayNumber: existingWorkout?.dayNumber || 1,
      calories: existingWorkout?.calories || 0,
      note: existingWorkout?.note || '',
    };

    const formik = useFormik({
      initialValues: initialCalendarNoteValues,
      validationSchema: validationNoteSchema,
      onSubmit: (values) => {
        const workoutToSave: CurrentMonthCalendarModel = {
          ...values,
          videoPlaylist: values.videoPlaylist || null,
        };

        CalendarStore.addOrUpdateWorkout(workoutToSave);
        enqueueSnackbar(t('calendar.addedNotification'), {
          variant: 'success',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
        props.onClose();
      },
    });

    return (
      <Dialog open={true} onClose={props.onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {t('calendar.noteFor')}: {props.date.toLocaleDateString()}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="video-label">{t('workout.playlist')}</InputLabel>
              <Select
                labelId="video-label"
                id="videoPlaylist"
                name="videoPlaylist"
                value={formik.values.videoPlaylist}
                onChange={(e) =>
                  formik.setFieldValue('videoPlaylist', e.target.value)
                }
                label={t('workout.playlist')}
              >
                <MenuItem value="-">
                  <em>---</em>
                </MenuItem>
                {workoutYouTubeStore.playlists.map((playlist) => (
                  <MenuItem key={playlist.id} value={playlist.title}>
                    {playlist.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="dayNumber-label">{t('workout.day')}</InputLabel>
              <Select
                labelId="dayNumber-label"
                id="dayNumber"
                name="dayNumber"
                value={formik.values.dayNumber}
                onChange={(event) =>
                  formik.setFieldValue('dayNumber', Number(event.target.value))
                }
                label={t('workout.day')}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <MenuItem key={num} value={num}>
                    {t('workout.day')} {num}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.dayNumber && formik.errors.dayNumber && (
                <Typography color="error" variant="caption">
                  {formik.errors.dayNumber}
                </Typography>
              )}
            </FormControl>
            <TextField
              fullWidth
              id="calories"
              name="calories"
              label={t('workout.calories')}
              value={formik.values.calories}
              onChange={formik.handleChange}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              id="note"
              name="note"
              label={t('workout.note')}
              value={formik.values.note}
              onChange={formik.handleChange}
              sx={{ mb: 3 }}
            />
            {formik.touched.note && formik.errors.note && (
              <Typography color="error" variant="caption">
                {formik.errors.note}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={props.onClose} variant="outlined">
                {t('actions.cancel')}
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {t('actions.save')}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
);

export default CurrentMonthCalendarNoteForm;
