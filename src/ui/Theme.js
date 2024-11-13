import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#CCEEE6',
      main: '#00A881',
      dark: '#004431',
      contrastText: '#fff',
    },
    secondary: {
      light: '#CCEEE6',
      main: '#CCEEE6',
      dark: '#00A881',
      contrastText: '#000',
    },
    text: {
      primary: "#616264",
      secondary: "#808286",
      disabled: "#a3a5a9",
      hint: "#c7c8cb",

    },
    test: {
      main: '#FF0000'
    }
  },
  typography: {
    allVariants: {
      color: '#616264'
    },
    fontFamily: [
      'Lato',
      '"Noto Sans Malayalam"',
      '"Baloo Chettan 2"',
      '-apple-system',
      '"Segoe UI"',
      'Roboto',
      'Arial',
    ].join(','),
    fontSize: 16,
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: '45px'
      }
    }
  }
});

export default theme;