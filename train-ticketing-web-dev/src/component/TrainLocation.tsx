import L from 'leaflet';
import 'leaflet-boundary-canvas';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';

import { useLeafletContext } from '@react-leaflet/core';

import { geoJson } from '../utils/BGD';

function Boudary(props) {
    const context = useLeafletContext();

    useEffect(() => {
        const container = context.layerContainer || context.map;

        const osm = L.TileLayer['boundaryCanvas']('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            zoom: 9,
            boundary: geoJson,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        });
        container.addLayer(osm);
        const bdLayer = L.geoJSON(geoJson);
        container.fitBounds(bdLayer.getBounds());

        container.setView([23.8103, 90.4125], 10);

        return () => {
            container.removeLayer(bdLayer);
        };
    });

    return null;
}

export default function TrainLocation({ location }) {
    const trainMarker = new L.Icon({
        iconUrl: '/train-red.png',
        iconAnchor: [32, 64],
    });

    return (
        <MapContainer
            center={[23.8103, 90.4125]}
            zoom={10}
            scrollWheelZoom={true}
            className="h-screen max-h-[91vh] overflow-hidden"
        >
            <Boudary></Boudary>
            {location &&
                location.map((item) => {
                    if (!item.trainLocation) {
                        return;
                    }

                    return (
                        <Marker
                            position={[item.trainLocation.lat, item.trainLocation.long]}
                            icon={trainMarker}
                            key={item.name}
                            title={item.name}
                        >
                            <Popup>{item.name}</Popup>
                        </Marker>
                    );
                })}
        </MapContainer>
    );
}
