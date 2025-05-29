import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../constants/CurrentMonthCalendarConstants';

export const validationNoteSchema = Yup.object().shape({
  dayNumber: Yup.number()
    .min(1, VALIDATION_MESSAGES.DAY_REQUIRED)
    .max(6, VALIDATION_MESSAGES.DAY_REQUIRED)
    .required(VALIDATION_MESSAGES.DAY_REQUIRED),
  note: Yup.string()
    .max(200, VALIDATION_MESSAGES.NOTE_CHARACTER_LIMIT_MESSAGE)
    .nullable(),
});
