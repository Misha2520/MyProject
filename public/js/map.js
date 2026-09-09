const listingLocation = `${listing.location}, ${listing.country}`;
fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listingLocation)}`
)
.then(response => response.json())
.then(data => {

    if (data.length === 0) {
        console.log("Location not found");
        return;
    }

    const lat = data[0].lat;
    const lon = data[0].lon;

    // MAP
    const map = L.map("map", {
        fullscreenControl: true
    }).setView([lat, lon], 13);


    // STREET MAP
    const streets = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors"
        }
    );


    // SATELLITE MAP
    const satellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
            attribution: "Tiles &copy; Esri"
        }
    );


    // Default map
    streets.addTo(map);


    // Layer control
    const baseMaps = {
        "Street Map": streets,
        "Satellite": satellite
    };

    L.control.layers(baseMaps).addTo(map);


    // CUSTOM MARKER
    const customIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });


    // POPUP
    const popupContent = `
        <div class="listing-popup">
            <h5>${listing.title}</h5>

            <p>
                📍 ${listing.location}, ${listing.country}
            </p>

            <p>
                💰 ₹${listing.price.toLocaleString("en-IN")} / night
            </p>

            <a href="/listings/${listing._id}" 
               class="btn btn-dark btn-sm">
                View Listing
            </a>
        </div>
    `;


    // MARKER
    L.marker([lat, lon], {
        icon: customIcon
    })
    .addTo(map)
    .bindPopup(popupContent)
    .openPopup();

})
.catch(error => {
    console.log("Error:", error);
});