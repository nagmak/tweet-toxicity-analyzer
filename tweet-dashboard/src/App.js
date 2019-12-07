import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/components/app-bar/app-bar';
import ButtonAppBar from '../src/components/app-bar/app-bar';
import SimpleCard from '../src/components/card/card';
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
