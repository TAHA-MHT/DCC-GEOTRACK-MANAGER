import { grey } from '@mui/material/colors';

export default (darkMode) => ({
mode: 'light',
background: {
  default: '#FFFFFF',
},
  primary: {
    main: '#FF6B00',
  },
  secondary: {
    main: '#1565C0',
  },
  neutral: {
    main: grey[500],
  },
  geometry: {
    main: '#3bb2d0',
  },
  alwaysDark: {
    main: grey[900],
  },
});
