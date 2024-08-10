import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

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
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LoadMap;