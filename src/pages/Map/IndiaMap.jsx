// https://github.com/shuklaneerajdev/IndiaStateTopojsonFiles/blob/master/Arunachal.topojson
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import INDIA_TOPO_JSON from "./Indiatopo.json";
import Maharashtra_TOPO_JSON from "./AllState/Maharashtra/maharashtratopo.json";
import MP_TOPO_JSON from "./AllState/MP/mptopo.json";
import Gujarat_TOPO_JSON from "./AllState/Gujarat/gujarattopo.json";
import Goa_TOPO_JSON from "./AllState/Goa/goatopo.json";
import Hariyana_TOPO_JSON from "./AllState/Hariyana/hariyanatopo.json";
import MapModal from "./MapModal.jsx";

const INDIA_PROJECTION_CONFIG = {
  scale: 700,
  center: [78.9629, 22.5937],
};

const STATE_PROJECTION_CONFIG = {
  scale: 2400,
  center: [75.9629, 18.6632],
};

// Custom configuration for Madhya Pradesh
const MP_PROJECTION_CONFIG = {
  scale: 3000, // Adjust to control the zoom level
  center: [78.9, 23.5], // Adjust to center "Madhya Pradesh" correctly
};

const Gujarat_PROJECTION_CONFIG = {
  scale: 4000, // Adjust to control the zoom level
  center: [71.24, 22.5], // Adjust to center "Madhya Pradesh" correctly
};

const Goa_PROJECTION_CONFIG = {
  scale: 4000, // Adjust to control the zoom level
  center: [71.24, 22.5], // Adjust to center "Madhya Pradesh" correctly
};

const Hariyana_PROJECTION_CONFIG = {
  scale: 2200,
  center: [72.24, 22.5],
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

const geographyStyle = {
  default: {
    outline: "none",
    fill: "url(#backgroundPattern)",
  },
  hover: {
    fill: "url(#backgroundPatternHover)",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

const getHeatMapData = () => [
  // Your data here
];

const BackgroundPattern = ({ animationPhase }) => {
  const initialBackground = "/WhiteBG.png";
  const finalBackground = "/WhiteBG.png";

  return (
    <defs>
      <pattern
        id="backgroundPattern"
        patternUnits="userSpaceOnUse"
        width="100%"
        height="100%">
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
        height="100%">
        <image
          href={
            animationPhase === "initial" ? initialBackground : finalBackground
          }
          width="100%"
          height="100%"
          style={{ opacity: 0.3 }}
        />
      </pattern>
    </defs>
  );
};

function IndiaMap({
  animationPhase,
  onStateClick,
  selectedState,
  setSelectedState,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();
  const [data] = useState(getHeatMapData());

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(COLOR_RANGE);

  const handleStateClick = (geo) => {
    const clickedState = geo.properties.name;
    setSelectedState(clickedState);
  };

  const handleDistrictClick = (geo) => {
    const clickedDistrict = geo.properties.division;
    setIsModalOpen(true);
    setModalContent(clickedDistrict);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <ComposableMap
          projectionConfig={
            selectedState === "Maharashtra"
              ? STATE_PROJECTION_CONFIG
              : selectedState === "Madhya Pradesh"
              ? MP_PROJECTION_CONFIG
              : selectedState === "Gujarat"
              ? Gujarat_PROJECTION_CONFIG
              : selectedState === "Goa"
              ? Goa_PROJECTION_CONFIG
              : selectedState === "Hariyana"
              ? Hariyana_PROJECTION_CONFIG
              : INDIA_PROJECTION_CONFIG
          }
          projection="geoMercator"
          width={1200}
          height={600}>
          <BackgroundPattern
          // animationPhase={animationPhase}
          />
          {!selectedState ? (
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographyStyle}
                    onClick={() => handleStateClick(geo)}
                    stroke="#000000"
                    strokeWidth={0.8}
                  />
                ))
              }
            </Geographies>
          ) : selectedState === "Maharashtra" ? (
            <Geographies geography={Maharashtra_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographyStyle}
                    onClick={() => handleDistrictClick(geo)}
                    stroke="#000000"
                    strokeWidth={0.8}
                  />
                ))
              }
            </Geographies>
          ) : selectedState === "Madhya Pradesh" ? (
            <Geographies geography={MP_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographyStyle}
                    onClick={() => handleDistrictClick(geo)}
                    stroke="#000000"
                    strokeWidth={0.8}
                  />
                ))
              }
            </Geographies>
          ) : selectedState === "Gujarat" ? (
            <Geographies geography={Gujarat_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographyStyle}
                    onClick={() => handleDistrictClick(geo)}
                    stroke="#000000"
                    strokeWidth={0.8}
                  />
                ))
              }
            </Geographies>
          ) : selectedState === "Goa" ? (
            <Geographies geography={Goa_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographyStyle}
                    onClick={() => handleDistrictClick(geo)}
                    stroke="#000000"
                    strokeWidth={0.8}
                  />
                ))
              }
            </Geographies>
          ) : selectedState === "Hariyana" ? (
            <Geographies geography={Hariyana_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographyStyle}
                    onClick={() => handleDistrictClick(geo)}
                    stroke="#000000"
                    strokeWidth={0.8}
                  />
                ))
              }
            </Geographies>
          ) : (
            <h1>Please select a state</h1>
          )}
        </ComposableMap>
      </div>
      {isModalOpen && <MapModal content={modalContent} onClose={closeModal} />}
    </>
  );
}

export default IndiaMap;
