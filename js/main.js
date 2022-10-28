let inputList = document.getElementById("myList");
let listLocations = [];
let listFavLocations = [];
let btnFav = document.getElementById("btnFav");
let btnMostrar = document.getElementById("btnMostrar");
let btnGoFav = document.getElementById("btnGoFav");
let campoLista = document.getElementById("listaTiendas");

window.addEventListener("load", function(){    
 getLocations(); 
 if(localStorage.getItem("listaUbicaciones")){
    listLocations = JSON.parse(localStorage.getItem("listaUbicaciones"))  
 }//traemos la lista de ubicaciones del fetch
 if(localStorage.getItem("userFavs")){
    listFavLocations = JSON.parse(localStorage.getItem("userFavs"))
 }//traemos la lista de favoritos del usuario
});//mandar a localStorage la respuesta del fetch para tenerlo a la mano durante la ejecucion del programa

btnMostrar.addEventListener("click", function(e){
    if(campoLista.selectedIndex != 0){        
    //Aqui deberiamos de utilizar la API de Geocode y mandar la info, regresar la latitud y longitud y refrescar el mapa
    let idUbi = (campoLista.options[campoLista.selectedIndex].id).slice(7); //obtenemos la posicion de la ubicacion seleccionada
    console.log("Latitud: " + listLocations[idUbi].lat, "Longitud: " + listLocations[idUbi].lng);
    //aqui se muestra los valores de longitud y latitud que usaríamos con la api de geocode para crear el nuevo marcador en el mapa y refrescarlo.
    campoLista.classList.add("is-valid");
    campoLista.classList.remove("is-invalid");
    }else{
        campoLista.classList.remove("is-valid");
        campoLista.classList.add("is-invalid");
    }//validar que eligieron una opcion valida    
});//boton mostrar

btnFav.addEventListener("click", function(e){
      if(campoLista.selectedIndex != 0){        
        let idUbi = (campoLista.options[campoLista.selectedIndex].id).slice(7);
        if(listFavLocations.includes(listLocations[idUbi])) {        
            Swal.fire({
                title: 'La ubicación seleccionada ya se encuentra en su lista de favoritos.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })                  
        }else{
            listFavLocations.push(listLocations[idUbi]); 
            localStorage.setItem("userFavs", JSON.stringify(listFavLocations));           
            campoLista.classList.add("is-valid");
            campoLista.classList.remove("is-invalid");
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'La dirección se ha guardado con éxito.',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            }) //sweet alert      
         
        } //verifica que el elemento no existiera en su lista de favoritos, si no, entonces lo agrega y lo envía a su lista de favoritos
    }else{
        campoLista.classList.remove("is-valid");
        campoLista.classList.add("is-invalid");
    }//validar que eligieron una opcion valida   
});//boton agregar a favoritos

btnGoFav.addEventListener("click", function(e){
    location.href= './pages/favoritos.html';
});//ir a mis favoritos

const getLocations = () =>{
    let promesa = fetch("/stores_directory.json", {
        method : "GET"
    });
    promesa.then((response) => {
        response.json().then ((data) => {          
            localStorage.setItem("listaUbicaciones", JSON.stringify(data))           
                for (let i = 0; i < data.length; i++) {
                   ubicaciones = data[i];
                   inputList.insertAdjacentHTML("afterend",`<option id="option_${i}" value="${ubicaciones.Name}-${ubicaciones.Address}">${ubicaciones.Name}</option>`)
                }
                      
        }).catch((error) => {
            console.error("Problema con la respuesta "+ error);
        });
    }).catch((error) => {
        console.log("Error en la solicitud: " + error);
    });
}//get info de ubicaciones de stores_directory.json (en este caso utilice una hoja de calculo de google para convertir las direcciones a latitud y longitud y agregarlas al JSON)