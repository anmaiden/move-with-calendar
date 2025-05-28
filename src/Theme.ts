import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#5c715e',
      light: '#b6cdbd',
      dark: '#3a4a3b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ddeedf',
      contrastText: '#5c715e',
    },
    background: {
      default: '#f2f9f1',
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '12px 14px',
          fontWeight: 'bold',
          fontFamily: '"Lobster", serif',
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
        },
      ],
    },
  },
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});

export default Theme;
