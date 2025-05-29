import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import { profileStore } from '../store/ProfileStore';
import { useSnackbar } from 'notistack';

const ProfileModule = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileStore.profileData);

  const handleInputChange =
    (field: keyof typeof profileStore.profileData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditData((prev) => ({
        ...prev,
        [field]:
          field === 'name' ? e.target.value : Number(e.target.value) || '',
      }));
    };

  const handleSave = () => {
    profileStore.saveProfile(editData);
    setIsEditing(false);
    enqueueSnackbar('Profile updated', {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  };

  const handleEditStart = () => {
    setEditData(profileStore.profileData);
    setIsEditing(true);
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
            onClick={handleEditStart}
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
                value={editData.name}
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
                value={editData.height}
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
                value={editData.weight}
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
            {profileStore.profileData.name || 'No name provided'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Height
              </Typography>
              <Typography variant="body1">
                {profileStore.profileData.height
                  ? `${profileStore.profileData.height} cm`
                  : 'Not specified'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Weight
              </Typography>
              <Typography variant="body1">
                {profileStore.profileData.weight
                  ? `${profileStore.profileData.weight} kg`
                  : 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default ProfileModule;
