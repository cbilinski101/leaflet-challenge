// API endpoint for earthquake data.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the map object with options.
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3,
  maxZoom: 15,
});

// Create the base layers.
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(myMap);


// Function to determine marker size based on magnitude.
function markerSize(magnitude) {
  return magnitude * 4;
};

// Function to determine marker color based on depth.
function getColor(depth) {
  return depth > 90 ? "#FF3F33" :
         depth > 70 ? "#FF8033" :
         depth > 50 ? "#FFAC33" :
         depth > 30 ? "#FFDA33" :
         depth > 10 ? "#E9FF33" :
                      "#93FF33";
};

// Fetch and visualize earthquake data.
d3.json(queryUrl).then(function (earthquakeData) {
  // Create an earthquake GeoJSON layer.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "black",
        weight: 0.5,
        fillOpacity: 0.8
      });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`
        <h3>Location: ${feature.properties.place}</h3>
        <p>Magnitude: ${feature.properties.mag}</p>
        <p>Depth: ${feature.geometry.coordinates[2]} km</p>
        <p>Time: ${new Date(feature.properties.time)}</p>
      `)
    }
  })
  // Add earthquakes layer to the map.
  myMap.addLayer(earthquakes)
});

// Add a legend to the map.
let legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
  // Create a container div for the legend.
  let div = L.DomUtil.create("div", "legend");

  // Create a vertical layout for the gradient and labels with a white background.
  div.innerHTML += `
    <div style="background: white; padding: 10px; border-radius: 5px; width: fit-content;">
      <div style="display: flex; align-items: center;">
        <!-- Gradient bar -->
        <div style="height: 120px; width: 20px; background: linear-gradient(to top, 
          #FF3F33, #FF8033, #FFAC33, #FFDA33, #E9FF33, #93FF33);">
        </div>
        <!-- Labels -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; height: 120px; margin-left: 8px;">
          <span>-10-10</span>
          <span>10-30</span>
          <span>30-50</span>
          <span>50-70</span>
          <span>70-90</span>
          <span>90+</span>
        </div>
      </div>
    </div>
  `;

  return div;
};
legend.addTo(myMap);