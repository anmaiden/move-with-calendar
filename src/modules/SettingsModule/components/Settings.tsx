import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const Settings = () => {
  const [language, setLanguage] = useState('ru');
  const [theme, setTheme] = useState('light');

  const handleLanguageChange = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  const handleThemeChange = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Grid container spacing={1}>
      {/* Language Switch */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">App Language</FormLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography>Русский</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={language === 'en'}
                  onChange={handleLanguageChange}
                  color="primary"
                />
              }
              label="English"
              labelPlacement="end"
              sx={{ mx: 1 }}
            />
          </Box>
        </FormControl>
      </Grid>

      {/* Theme Switch */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">App Theme</FormLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography>Light</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={theme === 'dark'}
                  onChange={handleThemeChange}
                  color="primary"
                />
              }
              label="Dark"
              labelPlacement="end"
              sx={{ mx: 1 }}
            />
          </Box>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Settings;
