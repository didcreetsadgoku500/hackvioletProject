import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

export default function SimpleMap(props){
  const position = {lat: 53.54992, lng: 10.00678};
  let key = process.env.REACT_APP_MAPS_KEY

  return (
    <div style={{width: "100vh", height: "50vh"}}>

    <APIProvider apiKey={key}>
      <Map center={position} zoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
    </div>
  )
}