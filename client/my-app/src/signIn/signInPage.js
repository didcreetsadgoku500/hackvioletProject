import Box from "@mui/joy/Box"
import Input from "@mui/joy/Input"
import Button from "@mui/joy/Button"
import Tooltip from '@mui/joy/Tooltip';
import FormControl from "@mui/joy/FormControl"

import FormLabel from "@mui/joy/FormLabel"

import FormHelperText from "@mui/joy/FormHelperText"


import Axios from "axios"

import { useState } from "react"


const SignInPage = () => {
    

    const [editClientName, setClientName] = useState();
    const [editContactName, setContactName] = useState();
    const [editContactNumber, setContactNumber] = useState();

    async function handle_add_emergency_information(){
        
        await Axios.post(process.env.REACT_APP_BASE_URL + "/createUser",{
            client_name: editClientName,
            contact_name: editContactName,
            phone: editContactNumber
            })

        window.location.reload()
    }


    return (
        <div className="signInContainer centerContainer">

            <h1 >Create An Emergency Contact</h1>
            

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl sx={{marginY:'.1em'}}>
            <FormLabel sx={ { color:'white'} }>Your Name</FormLabel>
            <Input onChange={ (event) => {setClientName(event.target.value)} } placeholder="Your Name" />
            </FormControl>
            
            <FormControl sx={{marginY:'.1em'}}>
            <FormLabel sx={ {color:'white'} }>Emergency Contact Name</FormLabel>
            <Input onChange={ (event) => {setContactName(event.target.value)} } placeholder="Contact Name" />
            </FormControl>

            <FormControl>
            <FormLabel sx={ {color:'white'} } >Emergency Contact Phone Number</FormLabel>
            <Input onChange={ (event) => {setContactNumber(event.target.value)} } maxLength="10" type="number" placeholder="Contact #" />
            <FormHelperText>Please use only numbers</FormHelperText>
            </FormControl>
                
            </Box>

            <Tooltip title="Register an emergency contact on Distress.OS. Press the distress button in an emergency to alert your contact and stream your location." color="neutral" placement="top" variant="solid" size="md" enterTouchDelay={0}>
                <Button id="signInPage_submit_btn" variant="soft" size="sm" color="neutral">
                    How does Distress.OS work?
                </Button>
            </Tooltip>

            <Button onClick={handle_add_emergency_information} id="signInPage_submit_btn" variant="soft" color="neutral" size="sm">
                Create Emergency Contact
            </Button>


        </div>
    )
}


export default SignInPage