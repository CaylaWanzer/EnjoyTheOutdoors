document.addEventListener("DOMContentLoaded", () => {
    const mountainSelect = document.getElementById("mountainSelect");
    const results = document.getElementById("results");
    let selectedMountain;

    mountainsArray.forEach(mntType => {
        const option = new Option(mntType.name);
        mountainSelect.appendChild(option);
    });

    mountainSelect.addEventListener("change", () => {
        const selectedIndex = mountainSelect.selectedIndex;
        if (selectedIndex) {
            selectedMountain = mountainsArray[selectedIndex - 1];
            const coords = `${selectedMountain.coords.lat.toFixed(3)}, ${selectedMountain.coords.lng.toFixed(3)}`;
            results.innerHTML = `
                <h1>${selectedMountain.name}</h1>
                Elevation: <b>${selectedMountain.elevation}</b><br>
                Effort: <b>${selectedMountain.effort}</b><br>
                Coordinates: <b>${coords}</b><br><br>
                ${selectedMountain.desc}<br><br>
                <img src="data/images/${selectedMountain.img}" alt="Photo of ${selectedMountain.name}">
            `;
            
            appendSunButton(selectedMountain.coords.lat, selectedMountain.coords.lng);
        }
    });

    function appendSunButton(lat, lng) {
        const sunBtn = document.createElement("button");
        sunBtn.innerHTML = `Show Sunrise & Sunset`;
        sunBtn.addEventListener("click", async () => {
            const sunInfo = await getSunsetForMountain(lat, lng);
            if (sunInfo && sunInfo.results) {
                const { sunrise, sunset } = sunInfo.results;
                const sunResult = document.createElement("p");
                sunResult.innerHTML = `Sunrise: <b>${sunrise}</b><br>Sunset: <b>${sunset}</b>`;
                results.appendChild(sunResult);
                sunBtn.disabled = true; // Disable the button after showing the info
            }
        });
        results.appendChild(sunBtn);
    }

    async function getSunsetForMountain(lat, lng) {
        try {
            let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch sunrise/sunset data", error);
        }
    }
});