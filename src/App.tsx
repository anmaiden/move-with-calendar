import { SnackbarProvider } from 'notistack';
import React from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import AppLayout from './layouts/AppLayout/AppLayout';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </div>
    </SnackbarProvider>
  );
}

export default App;
