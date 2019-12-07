import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/components/app-bar/app-bar';
import ButtonAppBar from '../src/components/app-bar/app-bar';
import CenteredGrid from '../src/main/main'

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ 'min-height': '0' }}>
        <ButtonAppBar></ButtonAppBar>
      </header>
      <body>
        <CenteredGrid></CenteredGrid>
      </body>
    </div>
  );
}

export default App;
