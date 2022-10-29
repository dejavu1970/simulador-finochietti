//class constructora
class Camisetas{
    constructor(equipo, temporada, talle, precio, cantidad, imagen){
        this.equipo = equipo;
        this.temporada = temporada;
        this.talle = talle;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.imagen = imagen;
    }
}

const camiseta1 = new Camisetas("Velez", 2022, "XXL", 9600, 6, "velez.png" )
const camiseta2 = new Camisetas("River", 2022, "XXL", 10000, 6, "river.png" )
const camiseta3 = new Camisetas("Boca", 2022, "XXL", 11000, 6, "bocajrs.png" )
const camiseta4 = new Camisetas("Independiente",2022,  "XXL", 9400, 6, "independiente.png" )
const camiseta5 = new Camisetas("San Lorenzo",2021,  "XXL", 9200, 6, "sanlorenzo.png" )
const camiseta6 = new Camisetas("Racing", 2022, "XXL", 9800, 6, "racing.png" )


const perchero = []
perchero.push(camiseta1, camiseta2, camiseta3, camiseta4, camiseta5, camiseta6)
console.log(perchero)

//mostrar array 
function verPerchero(array){
    for(let Camisetas of array){
        console.log(`La Camiseta de ${Camisetas.equipo} de la temporada ${Camisetas.temporada} vale $${Camisetas.precio}`)
    }
}

//funciones de busqueda

function buscarPorEquipo(array){
    let equipoBuscado = prompt("Ingrese el equipo del que desea buscar una camiseta")

    let equipoEncontrado = perchero.find(
        club=> club.equipo.toLowerCase() == equipoBuscado.toLowerCase())

    if(equipoEncontrado == undefined){
        console.log(`La camiseta de ${equipoBuscado} aun no se encuentra en nuestro catalogo`)
        alert(`La camiseta de ${equipoBuscado} aun no se encuentra en nuestro catalogo`)
        buscarPorEquipo()

    }else{
        console.log(equipoEncontrado)
        alert(`Elegiste la camiseta de ${equipoBuscado}`)
    }
}

// Ordenar

function ordenar(array){
    let opcion = parseInt(prompt(`
    1 - Ordenar precio de mayor a menor
    2 - Ordenar precio de menor a mayor
    3 - Ordenar alfabeticamente por equipo
    4 - Ordenar por temporada`))
    switch(opcion){
        case 1:
            ordenarMayorMenor(array)
        break
        case 2: 
            ordenarMenorMayor(array)
        break
        case 3:
            ordenarAlfabeticamente(array)
        break
        case 4:
            ordenarTemporada(array)
        break
        default:
            console.log("opción no reconocida")
        break

    }
}

function ordenarMayorMenor(array){
    //Ordenado de Mayor a menor
    console.log(array.sort((a,b) => (b.precio - a.precio)))
    verPerchero(array)
}
function ordenarMenorMayor(array){
    //Ordenado de menor a Mayor
    console.log(array.sort((x,y)=>(x.precio - y.precio)))
    verPerchero(array)
}
function ordenarAlfabeticamente(array){
    console.log(array.sort((a, b) => {
    if(a.equipo == b.equipo) {
        return 0; 
    }
    if(a.equipo < b.equipo) {
        return -1;
    }
    return 1;
    }))
    verPerchero(array)
}
function ordenarTemporada(array){
    console.log(array.sort((a,b)=>(b.temporada - a.temporada)))
    verPerchero(array)
}

// Menu principal

function preguntarOpcion(){
    let opcion = parseInt(prompt(`Ingrese el número de la opción que desea realizar:
                        1 - Ver catálogo de camisetas
                        2 - Encontrar por equipo:
                        3 - Ordenar camisetas:
                        0 - Para salir
                        `))
    menu(opcion)
}

function menu(opcionSeleccionada){
    switch(opcionSeleccionada){
        case 0:
            salir = true
            alert(`Gracias por visitarnos, vuelva pronto :D`)
        break    
        case 1:
        verPerchero(perchero)
        break 
        case 2: 
        buscarPorEquipo(perchero)
        break
        case 3:
        ordenar(perchero)
        break
   	    default: 
      	alert(`Ingrese una opción correcta`)
    }
}

let salir = false
while(salir!=true){
    preguntarOpcion()
}