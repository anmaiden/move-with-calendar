import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const BackToHomeButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Tooltip title={t('actions.back')}>
      <IconButton size={'small'} onClick={() => navigate('/')}>
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
};
