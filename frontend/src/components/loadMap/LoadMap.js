import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import StartIcon from '../../assets/map/ic_location_start.svg';
import EndIcon from '../../assets/map/ic_location_end.svg';

const containerStyle = {
    flexGrow: '1',
    backgroundColor: 'gray',
    width: '100%',
};

const center = {
    lat: 37.5665,
    lng: 126.9780
};

function LoadMap() {
    const location = useLocation();
    const [taxiParty, setTaxiParty] = useState(location.state.taxiParty);
    const { startLocation, endLocation } = taxiParty;
    const center = {
        lat: (startLocation.lat + endLocation.lat) / 2,
        lng: (startLocation.lng + endLocation.lng) / 2
    };

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                {/* <Marker position={center} /> */}
                <Marker position={startLocation} icon={{url: StartIcon}} />
                <Marker position={endLocation} icon={{url: EndIcon}} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LoadMap;