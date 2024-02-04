import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export default function SimpleMap(props){
  const key = process.env.REACT_APP_MAPS_KEY

  const trackingID = window.location.pathname
  const [position, setPosition] = useState(null)
  
  useEffect(() => {

    setInterval(async () => {
      let res = await fetch(`https://servertest.discovery.cs.vt.edu/getLocation${trackingID}`)
      res = await res.json()
      console.log(res)
      setPosition(res)
      
    }, 5000)
  }, [])
  // const position = {lat: 53.54992, lng: 10.00678};

  return (
    <div style={{width: "100vh", height: "50vh"}}>

    <APIProvider apiKey={key}>
      <Map center={position} zoom={18}>
        <Marker position={position} />
      </Map>
    </APIProvider>
    </div>
  )
}

