let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

window.addEventListener("load", function(e){
    e.preventDefault();
    initMap();
})
//queda solo como prueba, con la api de google maps y la api de geocode, podría ser totalmente automatico