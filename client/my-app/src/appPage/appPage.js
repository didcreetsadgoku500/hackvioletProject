import React, { useState } from 'react';
import '../App.css';
import Button from '@mui/joy/Button';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';



const buttonStyle = function() {
    if (buttonHovering) {
        return {
            borderStyle: 'solid', 
            borderColor: '2px white', 
            padding: '8rem', 
            borderRadius: '100%', 
            justifyContent: 'center', 
            fontSize: '3.5rem', 
            fontWeight: 'lighter', 
            backgroundImage: 'linear-gradient(130deg, #ff0000, #cc0000, #aa0000, #cc0000, #ff0000, #dd0000, #ee0000)'
        }
    }
    else {
        return {
            borderStyle: 'solid', 
            borderColor: '2px white', 
            padding: '8rem', 
            borderRadius: '100%', 
            justifyContent: 'center', 
            fontSize: '3.5rem', 
            fontWeight: 'lighter', 
            backgroundImage: 'linear-gradient(130deg, #ff0000, #cc0000, #aa0000, #cc0000, #ff0000, #dd0000, #ee0000)'
        }
    }
}
// const buttonStyle = {
//     borderStyle: 'solid', 
//     borderColor: '2px white', 
//     padding: '8rem', 
//     borderRadius: '100%', 
//     justifyContent: 'center', 
//     fontSize: '3.5rem', 
//     fontWeight: 'lighter', 
//     backgroundImage: 'linear-gradient(130deg, #ff0000, #cc0000, #aa0000, #cc0000, #ff0000, #dd0000, #ee0000)'
// };

const AppPage = () => {

    const handleEditContactInfo = () => {
        // Add logic to handle editing contact information
        console.log("Editing contact information");
      };
    
      const handleDeleteData = () => {
        // Add logic to handle deleting data
        console.log("Deleting data");
      };
    
    return (
        <div className="App">
            <header className="App-header">
                <Dropdown style={{ float: 'left'}}>
                <MenuButton style={{ backgroundColor: 'white', margin: '1rem'}}>Settings:</MenuButton>
                <Menu>
                    <MenuItem onClick={handleEditContactInfo}>Edit Contact Info</MenuItem>
                    <MenuItem onClick={handleDeleteData}>Delete Data</MenuItem>
                </Menu>
                </Dropdown>
            </header>
            <body style={{ height: '100vh', margin: 0, padding: 0 }}>
                
                {/* Need an introduction to the SOS system, and a button that appears front and center that users will press */}
                <h1>Press the button to send an SOS</h1>
                <p>You will be able to instantly chat with someone while awaiting emergency services.</p>
                {/* <Button size='lg' color='danger'>SOS</Button> */}
                <br />
                <Button className="circleButton" color="danger" style={buttonStyle}>SOS</Button>
            </body>
        </div>
    );
  }
  
   export default AppPage;