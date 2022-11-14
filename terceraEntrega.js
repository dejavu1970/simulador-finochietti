

//buscador de productos

function buscarInfo(buscado, array){
    console.log(buscado)
    let busqueda = array.filter(
        (remeras) => remeras.equipo.toLowerCase().includes(buscado.toLowerCase()) 
    )
    
    if(busqueda.length == 0){
        
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div")
        nuevoDiv.innerHTML = `<p>No hay coincidencias, les mostramos todo nuestro catalogo</p>`
        coincidencia.appendChild(nuevoDiv)
        mostrarCatalogo(array)
    }else{
        coincidencia.innerHTML = ""
        mostrarCasacas(busqueda)
    }

}

//PLANTILLAS y comenzar nuestro proyecto en el DOM

//capturas DOM
let divCamisetas = document.getElementById("casacas")
let buscador = document.getElementById("buscador")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")


function mostrarCasacas(array){
    divCamisetas.innerHTML = ""
    for(let remeras of array){
        let nuevaRemera = document.createElement("div")
        nuevaRemera.classList.add("col-12", "col-md-6", "col-lg-4", "my-1")

        nuevaRemera.innerHTML = `<div id="${remeras.id}" class="card" style="width: 18rem;">
                                    <p class="titulocard"> ${remeras.equipo}</p>
                                    <img  style="height: 200px;"src="${remeras.imagen}" alt="Camiseta de ${remeras.equipo}">
                                    <div class="card-body">
                                        
                                        <p class="precio"> $ ${remeras.precio}</p>
                                    <button id="agregarBtn${remeras.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
                                </div>`

        divCamisetas.appendChild(nuevaRemera)
        let btnAgregar = document.getElementById(`agregarBtn${remeras.id}`)
        //console.log(btnAgregar)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(remeras)
        })
    }
}

let productosEnCarrito = []
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}



function agregarAlCarrito(remeras){
    console.log(remeras)

    productosEnCarrito.push(remeras)
    console.log(productosEnCarrito)

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

function cargarProductosCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBody.innerHTML += `
        <div id ="productoCarrito${productoCarrito.id}" class="card-carrito">
        
            <div class="card-body">
                    <img class="card-img-top"  src="${productoCarrito.imagen}" alt="${productoCarrito.equipo}">
                    <h4 class="card-title">${productoCarrito.equipo}</h4>
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn-modal btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
            console.log(`Boton eliminar ${productoCarrito.id}`)
           //Eliminar del DOM
        let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
        cardProducto.remove()
           //Eliminar del array de comprar
        array.splice(indice, 1) 
        console.log(productosEnCarrito)
           //Eliminar del storage
        localStorage.setItem('carrito', JSON.stringify(array))

        })
    })
}



buscador.addEventListener("input", ()=>{buscarInfo(buscador.value, perchero)})

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)

}) 
mostrarCasacas(perchero)
