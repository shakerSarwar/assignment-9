import React from 'react'
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const location = {
    lat: 26.670321,
    lng: 93.146057
};

const onLoad = marker => {
    console.log('marker: ', marker)
  }

function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAOHyRtCy_GCgjnBzIQKBD08FizgHzI-KE"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
            >
                <Marker
      onLoad={onLoad}
      position={location}
    />
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)