let listContainer = document.getElementById("listaFavoritos");
let userListFav = [];
let btnGoBack = document.getElementById("btnGoBack");

window.addEventListener("load", function(e){
    e.preventDefault();
    if(localStorage.getItem("userFavs")){              
        userListFav = JSON.parse(localStorage.getItem("userFavs"))
        if(userListFav.length != 0){
            //traemos la lista de favoritos del usuario
            for (let i = 0; i < userListFav.length; i++) {
                const ubicacion = userListFav[i];
                //de momento la imagen es estatica, pero debería ser transformada con la api de Geocoding
                listContainer.innerHTML += `
                <div class="card col-3-lg m-1" style="width: 19rem;">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25355.3459302597!2d-103.41062474941882!3d20.670241349293402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae880664adc9%3A0xe89d8c1c4053fe42!2sStradivarius%20Gran%20Plaza!5e0!3m2!1ses!2smx!4v1666917730766!5m2!1ses!2smx" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div class="card-body">
                    <h5 class="card-title">${ubicacion.Name}</h5>
                    <p class="card-text">${ubicacion.Address}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Latitud:</strong> ${ubicacion.lat}</li>
                    <li class="list-group-item"><strong>Longitud:</strong> ${ubicacion.lng}</li>                         
                </ul>
                <div class="card-body">
                    <i id="deleteCard_${i}" class="bi bi-folder-x"> <strong>Eliminar</strong> de Favoritos</i>
                </div>
                </div>     `
                
            }//se inyectan las cards
        }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay elementos en su lista de favoritos.',
            showConfirmButton: false,
            timer: 3000
          })
        setTimeout(() => {
            location.href = "../index.html"
        }, 3000);
    }//si el arreglo contiene al menos 1 direccion
         
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay elementos en su lista de favoritos.',
            showConfirmButton: false,
            timer: 3000
          })
        setTimeout(() => {
            location.href = "../index.html"
        }, 3000);
    }//si el arreglo contiene al menos 1 direccion
})//window event listener

listContainer.addEventListener("click", function(e){
    e.preventDefault();
    if((e.target.id).includes("deleteCard_")){
       let idDelete = (e.target.id).slice(11)
       userListFav.splice(idDelete,1);
     localStorage.setItem("userFavs", JSON.stringify(userListFav));
     location.reload();
    }
})//identificamos si han dado click en el icono de borrar.

btnGoBack.addEventListener("click", function(e){
    location.href = "../index.html"
})//boton de volver