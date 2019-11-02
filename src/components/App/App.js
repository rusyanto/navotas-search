import React from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Search from '../Search';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#81bced",
      main: "#4e8cba",
      dark: "#0e5f8a",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffc04d",
      main: "#fc8f13",
      dark: "#c36000",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.8)",
      secondary: "rgba(0, 0, 0, 0.4)"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Search />
    </ThemeProvider>
  );
}

export default App;
