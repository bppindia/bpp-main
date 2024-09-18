import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import INDIA_TOPO_JSON from "./Indiatopo.json";

import MapModal from "./MapModal.jsx";

const PROJECTION_CONFIG = {
  scale: 700,
  center: [78.9629, 22.5937], // [East Longitude, North Latitude]
};

const COLOR_RANGE = [
  "#c6e2ff",
  "#93c5ff",
  "#60a0ff",
  "#3366ff",
  "#274bdb",
  "#1f3ca6",
  "#17316e",
  "#0f2451",
];

const DEFAULT_COLOR = "#EEE";

const getRandomInt = () => parseInt(Math.random() * 100);

const geographyStyle = {
  default: {
    outline: "none",
    fill: "url(#backgroundPattern)", // Default pattern
  },
  hover: {
    fill: "url(#backgroundPatternHover)", // Pattern with low opacity on hover
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

const getHeatMapData = () => [
  // ... Your existing data
];

const BackgroundPattern = ({ animationPhase }) => {
  const initialBackground = "/WhiteBG.png"; // Initial background image
  const finalBackground = "/homepagebanner.png"; // Final background image

  return (
    <defs>
      <pattern
        id="backgroundPattern"
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <image
          href={
            animationPhase === "initial" ? initialBackground : finalBackground
          }
          width="100%"
          height="100%"
        />
      </pattern>
      <pattern
        id="backgroundPatternHover"
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%"
      >
        <image
          href={
            animationPhase === "initial" ? initialBackground : finalBackground
          }
          width="100%"
          height="100%"
          style={{ opacity: 0.3 }} // Hover state with reduced opacity
        />
      </pattern>
    </defs>
  );
};

function IndiaMap({ animationPhase, onStateClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();
  const [data] = useState(getHeatMapData());

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(COLOR_RANGE);

  function onLocationClick(geo) {
    const clickedState = geo.properties.name;
    setModalContent(clickedState); // Set the state to display the content in the modal
    setIsModalOpen(true);
    console.log("setIsModalOpen--->>>>", isModalOpen);
    console.log("clickedState--->>>>", clickedState);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={1000}
          height={400}
        >
          <BackgroundPattern animationPhase={animationPhase} />
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const current = data.find((s) => s.id === geo.id);
                return (
                  <>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={geographyStyle}
                      // onClick={() => onLocationClick(geo)}
                      stroke="#000000" // Border color
                      strokeWidth={0.8} // Border width
                    />
                  </>
                );
              })
            }
          </Geographies>
        </ComposableMap>

      </div>
      {isModalOpen && <MapModal content={modalContent} onClose={closeModal}  />}
    </>
  );
}

export default IndiaMap;
