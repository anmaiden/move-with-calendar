import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import { UserProfileData } from '../model/ProfileModuleModel';

const ProfileModule = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserProfileData>({
    name: '',
    height: '',
    weight: '',
  });

  useEffect(() => {
    // Загрузка данных из localStorage при монтировании компонента
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as UserProfileData;
        setUserData(parsedData);
      } catch (e) {
        console.error('Failed to parse user profile data', e);
      }
    }
  }, []);

  const handleSave = () => {
    // Сохранение данных в localStorage
    localStorage.setItem('userProfile', JSON.stringify(userData));
    setIsEditing(false);
  };

  const handleInputChange =
    (field: keyof UserProfileData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => ({
        ...prev,
        [field]:
          field === 'name' ? e.target.value : Number(e.target.value) || '',
      }));
    };
  return (
    <Grid size={{ xs: 12 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Person2Icon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your Profile
        </Typography>
        {!isEditing && (
          <EditIcon
            color="action"
            onClick={() => setIsEditing(true)}
            sx={{ cursor: 'pointer' }}
          />
        )}
      </Box>

      {isEditing ? (
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.name}
                onChange={handleInputChange('name')}
                label="Your name"
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.height}
                onChange={handleInputChange('height')}
                label="Height (cm)"
                type="number"
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={userData.weight}
                onChange={handleInputChange('weight')}
                label="Weight (kg)"
                type="number"
                size="small"
                margin="dense"
              />
            </Grid>
          </Grid>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            {userData.name || 'No name provided'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Height
              </Typography>
              <Typography variant="body1">
                {userData.height ? `${userData.height} cm` : 'Not specified'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Weight
              </Typography>
              <Typography variant="body1">
                {userData.weight ? `${userData.weight} kg` : 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default ProfileModule;
