import React, { useEffect, useState } from 'react';

// Sample state data with center coordinates for zooming in
const statesData = [
  { name: "Maharashtra", coordinates: [19.7515, 75.7139] },
  { name: "Delhi", coordinates: [28.7041, 77.1025] },
  { name: "Karnataka", coordinates: [15.3173, 75.7139] },
  { name: "Uttar Pradesh", coordinates: [27.3913, 79.4531] }
];

const MapCompent = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
      // Dynamically load the MapmyIndia SDK
      const loadMapmyIndiaScript = () => {
        const script = document.createElement("script");
        script.src = "https://apis.mapmyindia.com/advancedmaps/v1/<YOUR_API_KEY>/map_sdk?v=1.5";
        script.async = true;
        script.onload = () => {
          const mapInstance = new window.MapmyIndia.Map("map", {
            center: [20.5937, 78.9629], // Default center (India)
            zoom: 4, // Default zoom level
          });
          setMap(mapInstance);
        };
        document.body.appendChild(script);
      };
  
      if (!window.MapmyIndia) {
        loadMapmyIndiaScript();
      } else {
        const mapInstance = new window.MapmyIndia.Map("map", {
          center: [20.5937, 78.9629],
          zoom: 4,
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
