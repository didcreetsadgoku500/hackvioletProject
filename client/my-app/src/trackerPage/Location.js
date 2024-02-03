import { useState } from 'react';


// This is a demo object, not to be used in final version
export default () => {
    const [userLocation, setUserLocation] = useState(null);
    const [debugMessage, setMessage] = useState(null)

    navigator.geolocation.watchPosition((pos) => {
        setUserLocation(pos.coords)
    },
    (err) => {
        setMessage(err)
    }
    )

    return (<>
    
      {userLocation && (
        <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}

      {debugMessage && (
        <div>
            <h3>{debugMessage.message}</h3>
        </div>
      )}

    </>)

}