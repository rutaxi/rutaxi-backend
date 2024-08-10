import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import CurrentIcon from '../../assets/map/ic_location_current.svg';
import EndIcon from '../../assets/map/ic_location_end.svg';
import StartIcon from '../../assets/map/ic_location_start.svg';

const containerStyle = {
    flexGrow: '1',
    backgroundColor: 'gray',
    width: '100%',
};

const center = {
    lat: 37.5665, // 서울의 위도
    lng: 126.9780 // 서울의 경도
};
  
function CreateMap({ currentPosition, startPosition, endPosition, setCurrentPosition }) {
    const [directions, setDirections] = useState(null);

    // 현재 위치 마커 표시
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('Geolocation success', position);
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            }, (error) => {console.error('Geolocation error', error);});
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    // 출발지와 도착지의 경로
    useEffect(() => {
        if (startPosition && endPosition) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: startPosition,
                    destination: endPosition,
                    travelMode: window.google.maps.TravelMode.TRANSIT
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                        console.log("directions way : ", directions)
                    } else {
                        console.error(`error fetching directions ${result}`, status);
                    }
                }
            );
        }
    }, [startPosition, endPosition]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition || center}
            zoom={14}
        >
            {currentPosition && <Marker position={currentPosition} icon={{url: CurrentIcon}} />}
            {startPosition && <Marker position={startPosition} icon={{url: StartIcon}} />}
            {endPosition && <Marker position={endPosition} icon={{url: EndIcon}} />}
            {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
        </GoogleMap>
    </LoadScript>
  );
}

export default CreateMap;