import {
  Box,
  Divider,
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
    <Grid container spacing={5}>
      {/* Language Switch */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">App Language</FormLabel>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={true}
                  onChange={handleLanguageChange}
                  color="primary"
                  disabled
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
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <FormControlLabel
              disabled
              control={
                <Switch
                  checked={true}
                  onChange={handleThemeChange}
                  color="primary"
                />
              }
              label="Light"
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
