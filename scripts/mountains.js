document.addEventListener("DOMContentLoaded", ()=>{
    const mountainSelect = document.getElementById("mountainSelect");
    mountainsArray.forEach(mntType=> mountainSelect.appendChild(new Option(mntType.name)) )
    mountainSelect.addEventListener("change", e =>{
       const selectedIndex = mountainSelect.selectedIndex
        if(selectedIndex){
            const m = mountainsArray[selectedIndex - 1];
            const coords = m.coords.lat.toFixed(3) + m.coords.lng.toFixed(3)

            results.innerHTML = `
            <h1>${m.name}</h1>
            Elevation: <b>${m.elevation}</b><br>
            Effort: <b>${m.effort}</b><br>
            Coordinatres: <b>${coords}</b><br>
            <br>
            ${m.desc}
            <br>
            <br>
            <img src="data/images/${m.img}"alt="Photo">
            
            
            
            `
        }
    } )
})