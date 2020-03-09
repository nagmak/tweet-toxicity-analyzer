import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/components/app-bar/app-bar';
// import MultilineTextFields from '../src/components/text-input/text-input';
import TabPanel from '../src/components/tabs/tabs';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Create a new theme using Nunito Sans
const theme = createMuiTheme({
  typography: {
    fontFamily: "ButlerRegular, serif",
    fontWeightBold: 'bold',
    body1: {
      fontWeight: '500',
      fontSize: '1.3em',
    },
    subtitle1: {
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
      marginTop: 24,
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <TabPanel></TabPanel>
      </div>
    </MuiThemeProvider>
    
  );
}

export default App;
