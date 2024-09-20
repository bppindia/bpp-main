import React, { useEffect, useState } from 'react';

// Sample state data with center coordinates for zooming in
const statesData = [
  { name: "Maharashtra", coordinates: [19.7515, 75.7139] },
  { name: "Delhi", coordinates: [28.7041, 77.1025] },
  { name: "Karnataka", coordinates: [15.3173, 75.7139] },
  { name: "Uttar Pradesh", coordinates: [27.3913, 79.4531] }
];

const indiaBounds = [[6.4627, 68.1097], [35.5133, 97.3953]];

const MapCompent = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const loadMapmyIndiaScript = () => {
          const script = document.createElement("script");
          script.src = "https://apis.mapmyindia.com/advancedmaps/v1/9af3132ae1bb5243f1721ac51261049e/map_sdk?v=1.5";
          script.async = true;
          script.onload = () => {
            const mapInstance = new window.MapmyIndia.Map("map", {
              center: [22.9734, 78.6569], // Center of India
              zoom: 5,
              maxBounds: indiaBounds, // Correct bounds for India
              minZoom: 5,
              maxZoom: 10,
            });
            setMap(mapInstance);
          };
          document.body.appendChild(script);
        };
    
        if (!window.MapmyIndia) {
          loadMapmyIndiaScript();
        } else {
          const mapInstance = new window.MapmyIndia.Map("map", {
            center: [22.9734, 78.6569], // Center of India
            zoom: 5,
            maxBounds: indiaBounds,
            minZoom: 5,
            maxZoom: 10,
          });
          setMap(mapInstance);
        }
      }, []);
    
    
  
    // Function to zoom in when a state is clicked
    const handleZoomIn = (coordinates) => {
      if (map) {
        map.setView(coordinates, 8); // Zoom in to the state's coordinates with zoom level 8
      }
    };
  
    return (
      <div>
        {/* Map Container */}
        <div id="map" style={{ width: "100%", height: "500px" }}></div>
  
        {/* List of states */}
        <div className="state-list">
          {statesData.map((state) => (
            <button
              key={state.name}
              onClick={() => handleZoomIn(state.coordinates)}
              style={{ margin: "5px", padding: "10px" }}
            >
              {state.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default MapCompent;
