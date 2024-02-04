import React, { useEffect, useState } from 'react';
import '../App.css';
import Button from '@mui/joy/Button';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';



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
        
        let [distressActive, setDistress] = useState(false);
        const [notification, setNotification] = useState(false);
        
        const buttonStyle = function() {
            if (distressActive) {
                return {
                    width: '40vw',
                    maxWidth: '100vh',
                    height: '40vw',
                    maxHeight: '100vh',
                    borderStyle: 'dotted', 
                    borderColor: '3px lime', 
                    padding: '8.25rem', 
                    borderRadius: '100%', 
                    justifyContent: 'center', 
                    fontSize: '3.5rem', 
                    fontWeight: 'lighter', 
                    textDecoration: 'none',
                    overflow: 'hidden',
                    backgroundImage: 'linear-gradient(130deg, #ee0000, #bb0000, #990000, #bb0000, #ee0000, #cc0000, #dd0000)',
                    animation: '10s linear infinite App-logo-spin'
                }
            }
            else {
                return {
                    width: '30vw',
                    maxWidth: '30vh',
                    height: '30vw',
                    maxHeight: '30vh',
                    borderStyle: 'solid', 
                    borderColor: '2px white', 
                    padding: '8.25rem', 
                    borderRadius: '100%', 
                    justifyContent: 'center', 
                    fontSize: '3.5rem', 
                    fontWeight: 'lighter', 
                    textDecoration: 'none',
                    overflow: 'hidden',
                    backgroundImage: 'linear-gradient(130deg, #ff0000, #cc0000, #aa0000, #cc0000, #ff0000, #dd0000, #ee0000)',
                    // animation:'App-logo-spin infinite 20s linear'
                }
            }
        }

        const handleEditContactInfo = () => {
        // Add logic to handle editing contact information
        console.log("Editing contact information");
      };
    
      const handleDeleteData = () => {
        // Add logic to handle deleting data
        console.log("Deleting data");
      };

    const toggleDistress = () => {
      distressActive ? setDistress(false) : setDistress(true)
      console.log("Distress: " + distressActive)
      if (distressActive) {
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 5000);
      }
      else {
        setNotification(false);
      }
    }


    navigator.geolocation.watchPosition((pos) => {
      if (distressActive) {
        try {
          fetch("http://localhost:3005/postGeolocation", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"lat": pos.coords.latitude, "lon": pos.coords.longitude}), 
            
          })
        } catch (error) {
          console.log(error)
        }
        

      }
    }, (err) => {
        console.log(err)
    })


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
                <Button className="circleButton" color={distressActive ? "success" : "danger"} style={buttonStyle()} onClick={toggleDistress}>SOS</Button>
                {
                  notification ?
                    
                      <div>
                        <h1 style={{color: 'white', textAlign: 'center'}}>Your emergency contact has been notified.</h1>
                      </div>

                  : <></>
                }
            </body>
        </div>
    );
  }
  
   export default AppPage;