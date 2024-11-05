

document.addEventListener("DOMContentLoaded", ()=>{
    locationsArray.forEach(state => parkLocationSelect.appendChild(new Option(state)) )
    parkTypesArray.forEach(type => parkTypeSelect.appendChild(new Option(type)))
});

