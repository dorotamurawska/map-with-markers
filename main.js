    const options = {
        center: [52.23178166946391, 21.006213426589966],
        zoom: 12
    }

    const map = L.map('map', options);
    const markerOptions = '';
    const markerIcon = L.icon({
        iconUrl: 'https://img.icons8.com/material-rounded/48/000000/visit.png',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -42]
    });

    L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png', {
            attribution: 'OSM'
        }).addTo(map);

    let numberOfMarker = 0;
    const markerGroup = L.layerGroup();

    map.on('click',
        function (e) {
            numberOfMarker++;
            const tableBody = document.querySelector('tbody');
            const createdTag = document.createElement('tr');
            const newMarker = L.marker(e.latlng, {
                icon: markerIcon,
                title: "NewPoint",
                alt: `Marker nr ${numberOfMarker}`,
                tabindex: numberOfMarker,
                draggable: true
            });

            const newMarkerCoordinates = newMarker.getLatLng();
            const newMarkerCoordinatesLat = newMarkerCoordinates.lat;
            const newMarkerCoordinatesLng = newMarkerCoordinates.lng;

            newMarker.bindPopup(`Marker nr ${numberOfMarker}.`);
            newMarker.on('dragend', (e) => {
                const marker = e.target;
                const numberOfDragendMarker = marker.options.tabindex
                const markerCoordinates = marker.getLatLng();
                const markerCoordinatesLat = markerCoordinates.lat;
                const markerCoordinatesLng = markerCoordinates.lng;
                const tdCoordinatesLat = document.querySelector(`.y${numberOfDragendMarker}`);
                const tdCoordinatesLng = document.querySelector(`.x${numberOfDragendMarker}`);

                tdCoordinatesLat.textContent = markerCoordinatesLat;
                tdCoordinatesLng.textContent = markerCoordinatesLng;
                console.log(tdCoordinatesLat, tdCoordinatesLng)

            });

            markerGroup.addLayer(newMarker).addTo(map);

            createdTag.innerHTML = `<th scope="row">${numberOfMarker}</th>
                        <td>Marker nr ${numberOfMarker}</td>
                        <td class='y${numberOfMarker}'>${newMarkerCoordinatesLat}</td>
                        <td class='x${numberOfMarker}'>${newMarkerCoordinatesLng}</td>`;
            tableBody.appendChild(createdTag);
        });