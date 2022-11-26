//PLANTILLAS y comenzar nuestro proyecto en el DOM

//capturas DOM
let divProductos = document.getElementById("casacas")
let buscador = document.getElementById("buscador")
//let btnVerCatalogo = document.getElementById("verCatalogo")
//let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let divCompra = document.getElementById("precioTotal")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let jersey of array){
        let jerseyNuevo = document.createElement("div")
        jerseyNuevo.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")
        
        jerseyNuevo.innerHTML = `<div id="${jersey.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 200px;"src="./img/${jersey.imagen}" alt="${jersey.equipo}">
                                    <div class="card-body">
                                        <h4 class="card-title">${jersey.equipo}</h4>
                                        <p class="${jersey.precio <= 2000 ? "ofertaColor" : "precioComun"}">Precio: ${jersey.precio}</p>
                                    <button id="agregarBtn${jersey.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(jerseyNuevo)
        let btnAgregar = document.getElementById(`agregarBtn${jersey.id}`)
        
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(jersey)
            
        })
    }
}

//function AGREGAR AL CARRITO
function agregarAlCarrito(jersey){
    //Primer paso
    productosEnCarrito.push(jersey)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    //sweetAlert para agregar al carrito
    Swal.fire({
        // position: "top-end",
        title: "Agregaste una camiseta al carrito",
        icon: "success",
        confirmButtonText: "Entendido",
        confirmButtonColor: "green",
        timer: 3000,
        text: `La camiseta de  ${jersey.equipo} ha sido agregado`,
        imageUrl: `./img/${jersey.imagen}`,
        imageHeight: 200,
        imageAlt: `${jersey.equipo}`
    })
}

//function IMPRIMIR en modal
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.equipo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.equipo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        //capturo elemento del DOM sin guardarlo en variable
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
        
        //Eliminar del DOM
        let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
        cardProducto.remove()
        //Eliminar del array de comprar
        productosEnCarrito.splice(indice, 1) 
        console.log(productosEnCarrito)
        //Eliminar del storage
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
        //vuelvo a calcular el total
        compraTotal(array)
        })
    })
    compraTotal(array)
}

//function calcular total
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=>acc + productoCarrito.precio,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
}

//function buscador que se activa con evento change del input para buscar
function buscarInfo(buscado, array){
    let busqueda = array.filter(
        (jersey) => jersey.equipo.toLowerCase().includes(buscado.toLowerCase()) 
    )

    //con ternario:
    busqueda.length == 0 ? 
    (coincidencia.innerHTML = `<h3 class="text-success m-2">No hay coincidencias con su búsqueda.. a continuación tiene todo nuestro catálogo disponible</h3>`, mostrarCatalogo(array)) 
    : (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
}

function ordenarMayorMenor(array){
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a,b) => (b.precio - a.precio))
    console.log(array)
    console.log(mayorMenor)
    mostrarCatalogo(mayorMenor)
}
function ordenarMenorMayor(array){
    let menorMayor = [].concat(array)
    menorMayor.sort((a,b) => (a.precio - b.precio))
    console.log(array)
    console.log(menorMayor)
    mostrarCatalogo(menorMayor)
}
function ordenarAlfabeticamente(array){
    let alfabeticamente = array.slice()
    alfabeticamente.sort((a,b) => {
    if(a.equipo < b.equipo)return -1
    if(a.equipo > b.equipo)return 1
    return 0
    })
    console.log(array)
    console.log(alfabeticamente)
    mostrarCatalogo(alfabeticamente)
}

//EVENTOS PROYECTO
//btnGuardarLibro.addEventListener("click", ()=>{cargarLibro(perchero)})
buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, perchero)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)

    if(selectOrden.value == 1){
        ordenarMayorMenor(perchero)
    }else if (selectOrden.value == 2){
        ordenarMenorMayor(perchero)
    }else if (selectOrden.value == 3){
        ordenarAlfabeticamente(perchero)
    }else{
        mostrarCatalogo(perchero)
    }
}) 
botonFinalizarCompra.addEventListener("click",()=>{
    finalizarCompra()
})

function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
            })
            //resetear o llevar a cero el array de carrito
            //Tenemos que researtearlo tanto al array como al localStorage
            productosEnCarrito =[]
            localStorage.removeItem("carrito")
        }else{
            //Va a entrar cuando ponga
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
}
