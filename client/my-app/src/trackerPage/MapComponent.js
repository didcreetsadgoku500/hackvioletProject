import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export default function SimpleMap(props){
  const key = process.env.REACT_APP_MAPS_KEY

  const trackingID = window.location.pathname
  const [position, setPosition] = useState(null)
  
  useEffect(() => {
    const pollData = async () => {

      let res = await fetch(process.env.REACT_APP_BASE_URL + `/getLocation${trackingID}`)
      res = await res.json()
      console.log(res)
      setPosition(res)
    }
    pollData()
    setInterval(pollData, 5000)
  }, [trackingID])
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

