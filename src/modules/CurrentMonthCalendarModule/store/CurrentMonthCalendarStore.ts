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

  private saveToLocalStorage() {
    localStorage.setItem(
      'calendarData',
      JSON.stringify(this.savedData.savedData)
    );
  }

  addOrUpdateWorkout(note: CurrentMonthCalendarModel) {
    const existingIndex = this.savedData.savedData.findIndex(
      (item) => item.date === note.date
    );

    if (existingIndex >= 0) {
      this.savedData.savedData[existingIndex] = note;
    } else {
      this.savedData.savedData.push(note);
    }

    this.saveToLocalStorage();
  }

  removeWorkoutByDate(dateString: string) {
    this.savedData.savedData = this.savedData.savedData.filter(
      (item) => item.date !== dateString
    );
    this.saveToLocalStorage();
  }

  hasWorkoutForDate(dateString: string): boolean {
    return this.savedData.savedData.some((item) => item.date === dateString);
  }

  getWorkoutByDate(dateString: string): CurrentMonthCalendarModel | undefined {
    return this.savedData.savedData.find((item) => item.date === dateString);
  }
}

const calendarStore = new CalendarStore();
export default calendarStore;
