import { makeAutoObservable } from 'mobx';
import { UserProfileData } from '../model/ProfileModuleModel';

export class ProfileStore {
  profileData: UserProfileData = {
    name: '',
    height: '',
    weight: '',
  };

  constructor() {
    makeAutoObservable(this);
    this.loadProfile();
  }

  loadProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        this.profileData = JSON.parse(savedProfile);
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
  }

  saveProfile(profile: UserProfileData) {
    this.profileData = profile;
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  get userName() {
    return this.profileData.name;
  }
}

export const profileStore = new ProfileStore();
