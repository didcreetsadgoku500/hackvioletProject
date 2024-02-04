import React, { useEffect, useState } from 'react';
import '../App.css';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import MainButton from './MainButton';
import Snackbar from '@mui/joy/Snackbar';
    
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
        fetch(process.env.REACT_APP_BASE_URL + "/alertContact")
        
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
          fetch(process.env.REACT_APP_BASE_URL + "/postGeolocation", {
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
                
                <h1>Distress.OS</h1>
                <p>Alert your emergency contact</p>
                <br />
                <div style={{justifyContent: "center", display: "flex", height: "300px", alignItems: "center"}}>
                  <MainButton active={distressActive} onClick={toggleDistress}/>

                </div>
                
                <Snackbar
                anchorOrigin={{horizontal: "center", vertical: 'bottom'}}
                open={notification}
                onClose={() => setNotification(false)}
                autoHideDuration={5000}
                variant='soft'
                color='danger'>  
                  Your emergency contact has been notified.
                </Snackbar>
            </div>
        </div>
    );
  }
  
   export default AppPage;