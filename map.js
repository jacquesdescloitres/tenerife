
$(document).ready(function() {

// Initialize the map
        const mapOptions = {
            zoomControl: false,
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: 'topleft'
            }
        }
        const map = L.map('map', mapOptions).setView([28.300, -16.540], 10); // Default to Portland, OR
        if (L.Control.ZoomBar)
            new L.Control.ZoomBar().addTo(map);
        if (! mapOptions.zoomcontrol  ||  ! mapOptions.zoomcontrol.lasso)
            $(".leaflet-control-zoom-to-area").hide();



        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    const coordOptions = {
        position: 'bottomleft',
        numDigits: 3,
        emptyString: null,
        lngFormatter: function(num) {
            var direction = (num < 0) ? 'W' : 'E';
            var formatted = 'Lon=' + Math.abs(num).toFixed(this.numDigits) + 'º ' + direction;
            return formatted;
        },
        latFormatter: function(num) {
            var direction = (num < 0) ? 'S' : 'N';
            var formatted = 'Lat=' + Math.abs(num).toFixed(this.numDigits) + 'º ' + direction;
            return formatted;
        }
    }

        L.control.mousePosition(coordOptions).addTo(map);

        // Basemaps
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: "Esri, Maxar, Earthstar Geographics",
        });
        const baseMaps = {
            "Carte": osm,
            "Satellite": satellite
        };

        // Add the default basemap
        satellite.addTo(map);

        // Add the layer control to the map
        L.control.layers(baseMaps).addTo(map);


        // List of GPX tracks to display
const files = [
    "./data/J1A_2025-11-20_151710.gpx",
    "./data/J1B_2025-11-20_151710.gpx",
    "./data/J2A_2025-11-21_114026.gpx",
    "./data/J2B_2025-11-21_114026.gpx",
    "./data/J3_2025-11-22_145820.gpx",
    "./data/J4A_2025-11-23_152539.gpx",
    "./data/J4B_2025-11-23_175400.gpx",
    "./data/J5_2025-11-24_162023.gpx",
]
var gpxTracks = [];
Object.entries(files).forEach(([idx, value], ) => {
    var date = value.split("_")[1];
    var entry = {name: date, file: value, color: "red"};
    gpxTracks.push(entry);
});

        // Load all GPX tracks
        gpxTracks.forEach(track => {
            var gpx = new L.GPX(track.file, {
                async: true,
                polyline_options: {
                    color: track.color,
                    weight: 4,
                    opacity: 0.7
                },
                markers: {
//                  startIcon: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${track.color}.png`,
                    endIcon: null,
//                  endIconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${track.color}.png`,
//                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
                },
                gpx_options: {
                    parseElements: ['track']
                }
            }).on('loaded', function(e) {
                this.bindTooltip(e.target.get_name());
            });
            gpx.addTo(map);
        });

console.log(map);
/*
*/

});
