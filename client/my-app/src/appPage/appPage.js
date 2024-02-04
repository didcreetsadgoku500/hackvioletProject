import React, { useEffect, useState } from 'react';
import '../App.css';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import MainButton from './MainButton';
    
    const AppPage = () => {
        
        let [distressActive, setDistress] = useState(false);
        const [notification, setNotification] = useState(false);

        const handleEditContactInfo = () => {
        // Add logic to handle editing contact information
        console.log("Editing contact information");
      };
    
      const handleDeleteData = () => {
        // Add logic to handle deleting data
        console.log("Deleting data");
      };

    const toggleDistress = () => {
      if (!distressActive) {
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 5000);
      }
      else {
        setNotification(false);
      }
      distressActive ? setDistress(false) : setDistress(true)
      console.log("Distress: " + distressActive);
    }


    navigator.geolocation.watchPosition((pos) => {
      if (distressActive) {
        try {
          fetch("https://servertest.discovery.cs.vt.edu/postGeolocation", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"lat": pos.coords.latitude, "lng": pos.coords.longitude}), 
            
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
                <MenuButton 
                slots={{root: IconButton}}
                slotProps={{root: {variant: "plain"}, style: {width: "10px"}}}
                style={{width: "56px"}}
                >
                  <img src="gear.png" style={{width: "32px", height: "32px", margin: "12px"}}></img>
                </MenuButton>
                <Menu placement='bottom-end'>
                    <MenuItem onClick={handleEditContactInfo}>Edit Contact Info</MenuItem>
                    <MenuItem onClick={handleDeleteData}>Delete Data</MenuItem>
                </Menu>
                </Dropdown>
            </header>
            <div style={{ height: '100vh', margin: 0, padding: 0 }}>
                
                {/* Need an introduction to the SOS system, and a button that appears front and center that users will press */}
                <h1>Distress.os</h1>
                <p>Alert your emergency contact</p>
                {/* <Button size='lg' color='danger'>SOS</Button> */}
                <br />
                {/* <Button className="circleButton" color={distressActive ? "success" : "danger"} style={buttonStyle()} onClick={toggleDistress}>SOS</Button> */}
                <div style={{justifyContent: "center", display: "flex", height: "300px", alignItems: "center"}}>
                  <MainButton active={distressActive} onClick={toggleDistress}/>

                </div>
                
                {
                  notification ?
                    
                      <div>
                        <h1 style={{color: 'white', textAlign: 'center'}}>Your emergency contact has been notified.</h1>
                      </div>

                  : <></>
                }
            </div>
        </div>
    );
  }
  
   export default AppPage;