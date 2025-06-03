import { makeAutoObservable } from 'mobx';
import { UserProfileData } from '../model/ProfileModuleModel';

export class ProfileStore {
  profileData: UserProfileData = {
    name: '',
    height: '',
    weight: '',
    lang: 'en',
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

    if (!this.profileData.lang) {
      this.profileData.lang = 'en';
    }
  }

  saveProfile(profile: UserProfileData) {
    this.profileData = profile;
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  setLanguage(lang: string) {
    this.profileData.lang = lang;
    localStorage.setItem('userProfile', JSON.stringify(this.profileData));
  }

  get userName() {
    return this.profileData.name;
  }
}

export const profileStore = new ProfileStore();
