

// parkTypesArray.forEach(type => parkTypeSelect.appendChild(new Option(type)))
// locationsArray.forEach(state => parkLocationSelect.appendChild(new Option(state)) )

function addPark(parkTypeName, parkTypeSelect) {
    parkTypeSelect.appendChild(new Option(parkTypeName));
}

function addLocation(text, target) {
    target.appendChild(new Option(text));
}

function Park(parkObject){
    const e = document.createElement("div");
    e.innerHTML = `
        LocationID: "${parkObject.LocationID}" <br>
        LocationName: "${parkObject.LocationName}"<br>
        Address: "${parkObject.Address}"<br>
        City: "${parkObject.City}"<br>
        State: "${parkObject.State}"<br>
        ZipCode: ${parkObject.ZipCode}<br>
        Phone: "${parkObject.Phone}"<br>
        Fax: "${parkObject.Fax}"<br>
        Latitude: ${parkObject.Latitude}<br>
        Longitude: ${parkObject.Longitude}<br>
        <hr>
    `;
    return e;
}

function renderPark(){
    const results = document.getElementById("results");
    const selectedType = parkTypeSelect.value;
    const selectedLocation = parkLocationSelect.value;

    results.innerHTML = ""; 

    let filtered = nationalParksArray;
    if(selectedType){
        filtered = filtered.filter(p=>p.LocationName.toLowerCase().includes(selectedType.toLowerCase()));
    }
    if(selectedLocation){
        filtered = filtered.filter(p=>p.State.toLowerCase() === selectedLocation.toLowerCase())        
    }

    filtered.forEach( p => results.appendChild(Park(p)));
    
    if(filtered.length < 1){
        results.innerHTML = "No results found.";
    }
}

function Content() {
    const parkTypeSelect = document.getElementById("parkTypeSelect");
    const parkLocationSelect = document.getElementById("parkLocationSelect");
    const results = document.getElementById("results");
    parkTypesArray.forEach(parkTypeName => addPark(parkTypeName, parkTypeSelect));
    locationsArray.forEach(parkLocationName => addLocation(parkLocationName, parkLocationSelect))
    // renderPark();
    filterButton.addEventListener("click", renderPark);
    parkTypeSelect.addEventListener("change", renderPark);
    parkLocationSelect.addEventListener("change", renderPark);
}

document.addEventListener("DOMContentLoaded", Content);

