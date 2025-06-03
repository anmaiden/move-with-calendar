import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import { SelectChangeEvent } from '@mui/material/Select';
import { profileStore } from '../../ProfileModule/store/ProfileStore';
import { observer } from 'mobx-react-lite';

const Settings = observer(() => {
  const [theme, setTheme] = useState('light');
  const { t, i18n } = useTranslation();
  const currentLang = profileStore.profileData.lang;

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    profileStore.setLanguage(newLang);
  };

  const handleThemeChange = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Grid size={{ xs: 12 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <SettingsIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          {t('settings.title')}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {/* Language Switch */}
        <Grid size={{ xs: 12, md: 5 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{t('settings.language')}</FormLabel>

            <Divider sx={{ my: 2 }} />
            <Select
              value={currentLang || 'en'}
              onChange={handleLanguageChange}
              variant="outlined"
              size="small"
            >
              <MenuItem value="ru">{t('settings.russian', 'Русский')}</MenuItem>
              <MenuItem value="en">{t('settings.english', 'English')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Theme Switch */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{t('settings.theme')}</FormLabel>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <FormControlLabel
                disabled
                control={
                  <Switch
                    checked={theme === 'light'}
                    onChange={handleThemeChange}
                    color="primary"
                  />
                }
                label={t('settings.light')}
                labelPlacement="end"
                sx={{ mx: 1 }}
              />
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default Settings;
