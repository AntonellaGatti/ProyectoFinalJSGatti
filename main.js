let carrito = []

let btnCrear = document.getElementById("btnCargar");
btnCrear.addEventListener("click",cargarUnItem);


let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click",cargarUnItem);

//CARGAR CARRITO CON INFO ANTERIOR DEL JSON
document.addEventListener("DOMContentLoaded", () => {
    const historial = JSON.parse(localStorage.getItem("carrito"));
    if (historial != null) {
        carrito = historial;
    }
    mostrarCotizacion();
});

//FUNCION PARA CARGAR ITEMS
function cargarUnItem() {
    const nuevoItem = new itemCarga();
    nuevoItem.tipoDeEmbalaje = document.querySelector("#formularioCoti select[name='Embalaje']").value;
    nuevoItem.cantidadDeUnidades = document.getElementById("cantidadU").value;
    nuevoItem.largo = document.getElementById("largo").value;
    nuevoItem.ancho = document.getElementById("ancho").value;
    nuevoItem.alto = document.getElementById("alto").value;
    nuevoItem.cbm = nuevoItem.largo * nuevoItem.ancho * nuevoItem.alto;
    nuevoItem.cantidadKm = document.getElementById("cantidadKm").value;
    nuevoItem.precioTransporte = document.getElementById("precioTransporte").value;
    carrito.push(nuevoItem);
    console.log(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCotizacion();
    formularioCoti.reset();
    
}

// TRAER AL FORMULARIO PARA LUEGO LLAMAR Y BORRAR LOS DATOS 
const formularioCoti = document.getElementById("formularioCoti");




// FUNCION PARA MOSTRAR LA COTIZACION EN TABLA
function mostrarCotizacion() {
    let table = document.getElementById("items");
    table.innerHTML = "";
    let counter = 1;
    let totalCarrito = 0;

    carrito.forEach((item) => {
        table.innerHTML +=
            `
            <tr>
                <th scope="row">${counter}</th>
                <td>${item.tipoDeEmbalaje}</td>
                <td>${item.cantidadDeUnidades}</td>
                <td>${item.largo} m</td>
                <td>${item.ancho} m</td>
                <td>${item.alto} m</td>
                <td>${item.cbm} cbm</td>
                <td>${item.cantidadKm} Km</td>
                <td>${item.cbm * item.cantidadKm * item.precioTransporte} USD</td>
                <td>${totalCarrito += item.cbm * item.cantidadKm * item.precioTransporte}</td>
            </tr>
        `
        
        counter++;
    });

}


// FUNCION PARA BUSCAR UN ITEM EN EL ARRAY Y ELIMINARLO
let btnBuscarYBorrar = document.getElementById("borrarItem");
btnBuscarYBorrar.addEventListener("click", buscarYBorrarItem);
function buscarYBorrarItem() {
    const itemABuscar = prompt("Ingrese el tipo de Embalaje a buscar en el carrito");
    let indiceAEliminar = -1;
    carrito.forEach((item, index) => {
        if (item.tipoDeEmbalaje === itemABuscar) {
            indiceAEliminar = index;
        }
    });

    if (indiceAEliminar > -1) {
        carrito.splice(indiceAEliminar, 1);
        alert(`Se eliminó el elemento con tipo de embalaje "${itemABuscar}" del carrito`);
    } else {
        alert(`No se encontró ningún elemento con tipo de embalaje "${itemABuscar}" en el carrito`);
    };

    console.log(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCotizacion();

}

// FUNCION PARA VACIAR EL CARRITO Y ELIMINAR EL LOCAL STORAGE, LUEGO MOSTRAR EN LA TABLA
let btnVaciarCotizacion = document.getElementById("vaciarCotizacion");
btnVaciarCotizacion.addEventListener("click", vaciarCotizacion);

function vaciarCotizacion() {
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("El carrito ha sido vaciado!")
    mostrarCotizacion();
}

// BOTON SWEETALERT
let btnSweetAlert = document.getElementById("sweetalert");

btnSweetAlert.onclick = () => {
    Swal.fire(
        {
            title: "TIPO DE EMBALAJE",
            Text: "Por favor ingrese tipo de embalaje",
            input: "text",
            confirmButtonText: "Siguiente",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then((resultado) => {

        })

};