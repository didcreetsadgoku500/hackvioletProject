import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/joy/Button';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown style={{ float: 'left'}}>
          <MenuButton style={{ backgroundColor: 'white', margin: '1rem'}}>Settings:</MenuButton>
          <Menu>
            <MenuItem>Edit Contact Info</MenuItem>
            <MenuItem>Delete Data</MenuItem>
          </Menu>
        </Dropdown>
      </header>
      <body style={{ height: '100vh', margin: 0, padding: 0 }}>
        
        {/* Need an introduction to the SOS system, and a button that appears front and center that users will press */}
        <h1>Press the button to send an SOS</h1>
        <p>You will be able to instantly chat with someone while awaiting emergency services.</p>
        {/* <Button size='lg' color='danger'>SOS</Button> */}
        <br />
        <Button size='lg' className="circle-button"><img src={logo} className="App-logo" alt="logo" /></Button>
      </body>
    </div>
  );
}

export default App;
