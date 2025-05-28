import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';


export const BackToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <Tooltip title={'Back to Home'}>
      <IconButton size={'small'} onClick={() => navigate('/')}>
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
};
