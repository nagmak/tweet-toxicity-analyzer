import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/components/app-bar/app-bar';
import ButtonAppBar from '../src/components/app-bar/app-bar';
import MultilineTextFields from '../src/components/text-input/text-input';
import TabPanel from '../src/components/tabs/tabs';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ 'min-height': '0' }}>
        <ButtonAppBar></ButtonAppBar>
      </header>
      <TabPanel></TabPanel>
    </div>
  );
}

export default App;
