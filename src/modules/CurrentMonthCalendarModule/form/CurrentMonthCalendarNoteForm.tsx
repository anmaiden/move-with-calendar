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

interface CurrentMonthCalendarNoteFormProps {
  date: Date;
  onClose: () => void;
}

const CurrentMonthCalendarNoteForm = observer(
  (props: CurrentMonthCalendarNoteFormProps) => {
    const existingNote = CalendarStore.getNoteByDate(props.date.toISOString());
    const { enqueueSnackbar } = useSnackbar();

    const initialCalendarNoteValues: CurrentMonthCalendarModel =
      existingNote || {
        date: props.date.toISOString(),
        videoUrl: '',
        weekNumber: null,
        dayNumber: null,
      };

    const formik = useFormik({
      initialValues: initialCalendarNoteValues,
      validationSchema: validationNoteSchema,
      onSubmit: (values) => {
        CalendarStore.addOrUpdateNote(values);
        enqueueSnackbar('You added workout', {
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
            Note for {props.date.toLocaleDateString()}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="videoUrl"
              name="videoUrl"
              label="YouTube url"
              value={formik.values.videoUrl}
              onChange={formik.handleChange}
              error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
              helperText={formik.touched.videoUrl && formik.errors.videoUrl}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="weekNumber-label">Week Number</InputLabel>
              <Select
                labelId="weekNumber-label"
                id="weekNumber"
                name="weekNumber"
                value={formik.values.weekNumber}
                onChange={formik.handleChange}
                label="Week Number"
              >
                {[1, 2, 3, 4].map((num) => (
                  <MenuItem key={num} value={num}>
                    Week {num}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.weekNumber && formik.errors.weekNumber && (
                <Typography color="error" variant="caption">
                  {formik.errors.weekNumber}
                </Typography>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="dayNumber-label">Day Number</InputLabel>
              <Select
                labelId="dayNumber-label"
                id="dayNumber"
                name="dayNumber"
                value={formik.values.dayNumber}
                onChange={formik.handleChange}
                label="Day Number"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <MenuItem key={num} value={num}>
                    Day {num}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.dayNumber && formik.errors.dayNumber && (
                <Typography color="error" variant="caption">
                  {formik.errors.dayNumber}
                </Typography>
              )}
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={props.onClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save note
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
);

export default CurrentMonthCalendarNoteForm;
