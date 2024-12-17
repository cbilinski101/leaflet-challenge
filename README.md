![HTML5](https://img.shields.io/badge/HTML5-Structure-orange?style=for-the-badge&logo=html5&logoColor=white)  
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue?style=for-the-badge&logo=css3&logoColor=white)
![Leaflet.js](https://img.shields.io/badge/Leaflet.js-Interactive%20Maps-008000?style=flat-square&logo=leaflet&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-Data%20Binding-F9A03C?style=flat-square&logo=d3.js&logoColor=white)


# Earthquake Visualization Tool

## Background

The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of ecosystems and environments, and the impacts of climate and land-use changes. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

In this project, we aim to help the USGS visualize their earthquake data. This tool will assist in better educating the public, government organizations, and stakeholders about pressing geological issues while enhancing the potential for securing funding for future research.

## Project Overview

This interactive tool is built to visualize earthquake data and tectonic plate boundaries using modern web technologies. The tool provides an informative and user-friendly way to explore earthquake activity globally.

### Features:
#### Leaflet-Part-1
- Layer controls to switch between map views (satellite, grayscale, outdoor) and toggle data layers (earthquakes, tectonic plates).
- Interactive popups for detailed information about each earthquake, including location, magnitude, depth, and time.
- A legend to understand the color coding for earthquake depth.
  ![image](https://github.com/user-attachments/assets/311dbe1e-d70f-4363-95aa-6724964bb035)

#### Leaflet-Part-2 (Additional layers)
- Visualization of earthquake data using markers that vary in size and color based on magnitude and depth.
- Display of tectonic plate boundaries for additional context.
![image](https://github.com/user-attachments/assets/30fd4317-9858-4017-83ab-3c75ef74d73f)


## Tools and Libraries

This project leverages the following tools and libraries:

- **HTML5**: Structure and layout of the webpage.
- **CSS3**: Styling the map container.
- **JavaScript**: Core logic for fetching, processing, and visualizing data.
- **Leaflet.js**: For building interactive maps.
- **D3.js**: For fetching and binding GeoJSON data.

## Data Sources

1. **Earthquake Data**: 
   - [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

2. **Tectonic Plate Data**:
   - [GitHub Repository for Plate Boundaries](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

## Implementation

The project uses a JavaScript-based implementation to fetch, process, and display the data. The code is structured as follows:

### Leaflet-Part-1
1. **Marker Customization**:
   - Marker size corresponds to earthquake magnitude.
   - Marker color represents earthquake depth, with a gradient from green (shallow) to red (deep).
2. **Legend**: A color-coded legend for depth values.
3. **Interactive Popups**: Details such as location, magnitude, depth, and time for each earthquake.
### Leaflet-Part-2 (Additional layers)
4. **Base Layers**: Different map styles (Satellite, Grayscale, Outdoor).
5. **Overlays**: Earthquake data and tectonic plate boundaries.

### Code Example

Here’s an example of how earthquake data is visualized:

```javascript
function markerSize(magnitude) {
  return magnitude * 4;
}

function getColor(depth) {
  return depth > 90 ? "#FF3F33" :
         depth > 70 ? "#FF8033" :
         depth > 50 ? "#FFAC33" :
         depth > 30 ? "#FFDA33" :
         depth > 10 ? "#E9FF33" :
                      "#93FF33";
}

// Fetch earthquake data and visualize
d3.json(queryUrl).then(function (earthquakeData) {
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
      `);
    }
  });

  earthquakes.addTo(myMap);
});
```
## Usage
1. Clone the repository.
2. Install necessary dependencies (if applicable).
3. Open the index.html file in your browser to view the interactive map.

## Acknowledgments
This project was developed with the assistance of the following resources:

* **Xpert Learning Assistant** – Provided guidance on and data analysis.
* **GitLab UofT Activities** – Supplied foundational activities and exercises for analysis.
* **ChatGPT** – Assisted with code, explanations, and README formatting.
