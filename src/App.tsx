import { SnackbarProvider } from 'notistack';
import React from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <AppRoutes />
      </div>
    </SnackbarProvider>
  );
}

export default App;
