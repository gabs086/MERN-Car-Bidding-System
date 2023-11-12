import { createTheme } from '@mui/material/styles';

const themeConfig = createTheme({
  palette: {
    primary: {
      main: '#6ab63e',
    },
    secondary: {
      main: '#044e46',
    },
    // white: {
    //     main: '#FFFFFF',
    // },
  },

  //Overide the styles of MUI components
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          background: 'white',
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          overflowY: 'inherit',
          borderRadius: '11px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
        },
      },
    },
  },
});

export default themeConfig;
