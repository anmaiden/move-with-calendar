import { makeAutoObservable } from 'mobx';
import { WorkoutYouTubeModel } from '../model/WorkoutYouTubeModel';

class WorkoutYouTubeStore {
  playlists: WorkoutYouTubeModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPlaylists(playlists: WorkoutYouTubeModel[]) {
    this.playlists = playlists;
  }
}

const workoutYouTubeStore = new WorkoutYouTubeStore();
export default workoutYouTubeStore;
