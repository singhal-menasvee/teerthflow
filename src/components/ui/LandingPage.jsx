import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from "react-router-dom";

// GeoJSON data import
import geoData from "../../data/india_state_geo.json";

// Utility function to normalize state names
const normalizeName = (name) => name.trim().toLowerCase();

// Normalized map of state names to routes
const stateToRoute = {
  "uttar pradesh": "/dashboard/up",
  "tamil nadu": "/dashboard/tn",
  "maharashtra": "/dashboard/mh",
  "gujarat": "/dashboard/gj",
  "rajasthan": "/dashboard/rj",
  // Add more mappings here
};

// Human-readable temples mapped by display names
const templesByState = {
  "Uttar Pradesh": ["Kashi Vishwanath", "Ram Janmabhoomi", "Banke Bihari"],
  "Tamil Nadu": ["Meenakshi Temple", "Ramanathaswamy Temple", "Brihadeeswarar Temple"],
  "Maharashtra": ["Siddhivinayak", "Trimbakeshwar", "Shirdi Sai Baba"],
  "Gujarat": ["Somnath Temple", "Dwarkadhish Temple"],
  "Rajasthan": ["Karni Mata", "Dilwara Temples"],
};

const LandingPage = () => {
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();

  const handleStateClick = (stateName) => {
    const normalized = normalizeName(stateName);
    const route = stateToRoute[normalized];

    setSelectedState(stateName); // Update state name for dropdown and temple list

    if (route) {
      navigate(route); // Navigate to dashboard on click
    } else {
      console.warn("No route found for:", normalized);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🛕 TeerthFlow: Choose a State</h1>

      <div className="flex flex-col lg:flex-row justify-center gap-10">
        {/* India Map */}
        <div className="w-full lg:w-2/3">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1000, center: [80, 22] }}
          >
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.NAME_1;
                  const isSelected = stateName === selectedState;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleStateClick(stateName)}
                      style={{
                        default: {
                          fill: isSelected ? "#FFD700" : "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Temple Dropdown & List */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Temples in Selected State</h2>
          <select
            className="p-2 border rounded mb-4"
            value={selectedState}
            onChange={(e) => {
              const stateName = e.target.value;
              const normalized = normalizeName(stateName);
              const route = stateToRoute[normalized];

              setSelectedState(stateName);
              if (route) navigate(route);
            }}
          >
            <option value="">Select a State</option>
            {Object.keys(templesByState).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {selectedState && templesByState[selectedState] ? (
            <ul className="list-disc pl-6 text-left">
              {templesByState[selectedState].map((temple) => (
                <li key={temple}>{temple}</li>
              ))}
            </ul>
          ) : (
            <p>Select a state to view temples.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
