// import { returnDistrict } from "./district.js";
// import { printGreenBin, printGarbage} from "./printSched.js"

const mymap = L.map("map", { zoom: 13 }).setView([49.263, -123.1919], 13);
const marker = L.marker([0, 0]).addTo(mymap);

const attribution =
  '&copy; <a href= "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(mymap);

//   var geoJsonLayer; = L.geoJSON.ajax('zone-red-north.json');
var redNorthLayer = L.geoJSON.ajax("/data/zone-red-north.json", {
  style: style,
});
var blueNorthLayer = L.geoJSON.ajax("/data/zone-blue-north.json", {
  style: style,
});
var purpleNorthLayer = L.geoJSON.ajax("/data/zone-purple-north.json", {
  style: style,
});
var greenNorthLayer = L.geoJSON.ajax("/data/zone-green-north.json", {
  style: style,
});
var yellowNorthLayer = L.geoJSON.ajax("/data/zone-yellow-north.json", {
  style: style,
});
var redSouthLayer = L.geoJSON.ajax("/data/zone-red-south.json", {
  style: style,
});
var blueSouthLayer = L.geoJSON.ajax("/data/zone-blue-south.json", {
  style: style,
});
var purpleSouthLayer = L.geoJSON.ajax("/data/zone-purple-south.json", {
  style: style,
});
var greenSouthLayer = L.geoJSON.ajax("/data/zone-green-south.json", {
  style: style,
});
var yellowSouthLayer = L.geoJSON.ajax("/data/zone-yellow-south.json", {
  style: style,
});

// make current location (lat, long) a global
var lat;
var lon;

function getColor(name) {
  return name == "Red-North"
    ? "#de2d26"
    : name == "Red-South"
    ? "#f03b20"
    : name == "Blue-North"
    ? "#2b8cbe"
    : name == "Blue-South"
    ? "#9ecae1"
    : name == "Green-North"
    ? "#31a354"
    : name == "Green-South"
    ? "#a1d99b"
    : name == "Purple-North"
    ? "#756bb1"
    : name == "Purple-South"
    ? "#bcbddc"
    : name == "Yellow-North"
    ? "#fec44f"
    : name == "Yellow-South"
    ? "#fff7bc"
    : "ffffff";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.name),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

function destination(dest) {
  return (d = "n" ? "North - Red" : "Unknown");
}

function date() {
  return "Jan 7";
}

function message() {
  //   var district = returnDistrict(lat, lon);
  //   console.log(district);
  // after merging code in schedule branch (remember to change "message" into async function)
  // greenBinDate = await printGreenBin(district)
  // garbageDate = await printGarbage(district)
  return (
    "<h1> Recycling Schedule: </h1> " +
    "<h2>" +
    destination("n") +
    " </h2>" +
    "<p> Garbage Pickup: " +
    date() +
    "</p>" +
    "<p> Green Bin:" +
    date() +
    " </p>"
  );
}
message();

redNorthLayer.addTo(mymap);
blueNorthLayer.addTo(mymap);
purpleNorthLayer.addTo(mymap);
yellowNorthLayer.addTo(mymap);
greenNorthLayer.addTo(mymap);
redSouthLayer.addTo(mymap);
blueSouthLayer.addTo(mymap);
purpleSouthLayer.addTo(mymap);
greenSouthLayer.addTo(mymap);
yellowSouthLayer.addTo(mymap);

// only works in HTTPS/local environments
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(onSuccess, onErrorDenied);
} else {
  console.log("sos ain't working");
}

function onSuccess(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  marker.setLatLng([lat, lon]);
  console.log("huh");
}

function onErrorDenied(error) {
  if (error.PERMISSION_DENIED) {
    console.log("denied");
    marker.setLatLng([49.263, -123.1919]);
  } else {
    console.log("bye");
  }
}

console.log("what");

function getValue() {
  const value = addressText.value;
  console.log(value);
}

// L.geoJSON(geoJsonLayer, {style:style}).addTo(mymap);
// marker.setLatLng([49.263, -123.1919]);
// marker.bindPopup(message).openPopup();
