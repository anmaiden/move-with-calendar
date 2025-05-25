import { makeAutoObservable } from 'mobx';
import {
  CurrentMonthCalendarListModel,
  CurrentMonthCalendarModel,
} from '../model/CurrentMonthCalendarModel';

class CalendarStore {
  savedData: CurrentMonthCalendarListModel = {
    savedData: JSON.parse(localStorage.getItem('calendarData') || '[]'),
  };

  constructor() {
    makeAutoObservable(this);
  }

  addOrUpdateNote(note: CurrentMonthCalendarModel) {
    const existingIndex = this.savedData.savedData.findIndex(
      (item) => item.date === note.date
    );

    if (existingIndex >= 0) {
      this.savedData.savedData[existingIndex] = note;
    } else {
      this.savedData.savedData.push(note);
    }

    localStorage.setItem(
      'calendarData',
      JSON.stringify(this.savedData.savedData)
    );
  }

  getNoteByDate(date: string) {
    return this.savedData.savedData.find((item) => item.date === date);
  }
}

export default new CalendarStore();
