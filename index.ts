/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

class Town {
  poor_law_union: string;
  civil_parish: string;
  barony: string;
  townland: string;
  constructor(poor_law_union: string, civil_parish: string, barony: string, townland: string) {
    this.poor_law_union = poor_law_union;
    this.civil_parish = civil_parish;
    this.barony = barony;
    this.civil_parish = civil_parish;
    this.townland = townland;
  }
}

let map: google.maps.Map;
import towns from "./TownlandsDublin.js";
console.log(towns);
let setOfItems1: Set<string>;
let setOfItems2: Set<string>;
let setOfItems3: Set<string>;

let location;
let firstDropdown = document.getElementById("level1") as HTMLInputElement;
let secondDropdown = document.getElementById("level2") as HTMLInputElement;
let thirdDropdown = document.getElementById("level3") as HTMLInputElement;
let fourthDropdown = document.getElementById("level4") as HTMLInputElement;



function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 8,
      center: location ? location : { lat: 53.3498, lng: -6.2603 },
    }
  );

  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  createFirstDropdown();
  (document.getElementById("submit") as HTMLElement).addEventListener(
    "click",
    () => {
      geocodePlaceId(geocoder, map, infowindow);
    }
  );
  (document.getElementById("level1") as HTMLElement).addEventListener(
    "change",
    () => {
      showSecondDropdown();
    }
  );
  (document.getElementById("level2") as HTMLElement).addEventListener(
    "change",
    () => {
      showThirdDropDown();
    }
  );
  (document.getElementById("level3") as HTMLElement).addEventListener(
    "change",
    () => {
      geocodePlaceId(geocoder, map, infowindow);
    }
  );
  (document.getElementById("address") as HTMLElement).addEventListener(
    "keydown",
    () => {
      findSearchTerm();
    }
  );
}
let myDiv = document.getElementById("search_results") as HTMLInputElement;
function findSearchTerm() {
  let searchTerm = document.getElementById("address") as HTMLInputElement;
  let foundResults = [];
  foundResults = towns.filter(function (i) {
     //return i.townland == searchTerm.value || i.barony == searchTerm.value || i.civil_parish == searchTerm.value || i.poor_law_union == searchTerm.value; 
     return i.townland.toString().search(searchTerm.value) > -1;
});
  console.log(foundResults);
  myDiv.innerHTML = "";
  foundResults.forEach((item : Town) => {
    let p = document.createElement("p");
    p.innerHTML = item.townland + ", " + item.barony + ", " + item.civil_parish + ", " + item.poor_law_union + ', Dublin';
    myDiv.appendChild(p);
    //document.querySelector('body')?.appendChild(myDiv);
  });
}
function createFirstDropdown() {
  var arr = [] as string[];
  towns.forEach((town: Town) => {
    !arr.includes(town.poor_law_union.toString()) && arr.push(town.poor_law_union.toString());
  });
  //setOfItems1 = new Set(arr.sort());
  arr.shift();
  arr.sort().forEach((item) => {
    let option = document.createElement("option");
    option.value = item;
    option.text = item;
    firstDropdown.appendChild(option);
    firstDropdown.style.display = "block";
  });
  //document.getElementById("map")?.prepend(firstDropdown);
}
function showSecondDropdown() {
  //const firstDropdown = document.getElementById("level1") as HTMLInputElement;
  const selected = firstDropdown.value;
  secondDropdown.innerHTML = "";
  var arr = [] as string[];
  towns.forEach((town) => {
    if (town.poor_law_union === selected) {
      arr.push(town.barony);
    }
  });
  setOfItems2 = new Set(arr.sort());
  setOfItems2.forEach((item) => {
    let option = document.createElement("option");
    option.value = item;
    option.text = item;
    secondDropdown.appendChild(option);
    secondDropdown.style.display = "block";
  });
}
function showThirdDropDown() {
  //const firstDropdown = document.getElementById("level1") as HTMLInputElement;
  const selected = secondDropdown.value;
  thirdDropdown.innerHTML = "";
  var arr = [] as string[];
  towns.forEach((town: { civil_parish: string; townland: string; barony: string; poor_law_union: string; }) => {
    if (town.civil_parish === selected) {
      arr.push(town.townland + ", " + town.barony + ", " + town.civil_parish  + ", " + town.poor_law_union + ', Dublin');
    }
  });
  setOfItems3 = new Set(arr.sort());
  setOfItems3.forEach((item) => {
    let option = document.createElement("option");
    option.value = item;
    option.text = item;
    thirdDropdown.appendChild(option);
    thirdDropdown.style.display = "block";
  });
}

async function getMarkers(geocoder, location, infowindow) {
  for (const i of setOfItems2) {
    geocoder
      .geocode({ address: i })
      .then(({ results }) => {
        if (results[0]) {
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);
          location = results[0].geometry.location;

          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });

          infowindow.setContent(results[0].formatted_address);
          //infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }
}

// This function is called when the user clicks the UI button requesting
// a geocode of a place ID.
async function geocodePlaceId(
  geocoder: google.maps.Geocoder,
  map: google.maps.Map,
  infowindow: google.maps.InfoWindow
) {
  const address = (document.getElementById("level1") as HTMLInputElement).value + ", " +
  (document.getElementById("level2") as HTMLInputElement).value + ", " + 
  (document.getElementById("level3") as HTMLInputElement).value+ ", Dublin";

  console.log(address)

 if(1 == 3 + 1 && setOfItems2 && setOfItems2.size > 0) {

  for (const i of setOfItems2) {
    geocoder
      .geocode({ address: i })
      .then(({ results }) => {
        if (results[0]) {
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);
          location = results[0].geometry.location;

          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });

          infowindow.setContent(results[0].formatted_address);
          //infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }}
 else{
  console.log({address})
 
    geocoder
        .geocode({ address: address })
        .then(({ results }) => {
          if (results[0]) {
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            location = results[0].geometry.location;

            const marker = new google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });

            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            window.alert("No results found");
          }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
      }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
