import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Theme from './Theme';
import { ThemeProvider } from '@mui/material';
import { profileStore } from './modules/ProfileModule/store/ProfileStore';
import './i18n';
import i18n from 'i18next';

i18n.changeLanguage(profileStore.profileData.lang);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/move-with-calendar">
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
