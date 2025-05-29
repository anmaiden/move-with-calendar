import { makeAutoObservable } from 'mobx';
import { WorkoutYouTubeModel } from '../model/WorkoutYouTubeModel';

class WorkoutYouTubeStore {
  playlists: WorkoutYouTubeModel[] = [];
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPlaylists(playlists: WorkoutYouTubeModel[]) {
    this.playlists = playlists;
    this.isLoaded = true;
  }
}

const workoutYouTubeStore = new WorkoutYouTubeStore();
export default workoutYouTubeStore;
