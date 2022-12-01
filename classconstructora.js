class Camisetas{
    constructor(id, equipo, precio, cantidad, imagen){
        this.id = id;
        this.equipo = equipo;
        this.precio = parseInt(precio);
        this.cantidad = parseInt(cantidad);
        this.imagen = imagen;
    }

    mostrarData(){
        console.log(`La camiseta de ${this.equipo}, tiene un stock de ${this.cantidad} camisetas y su precio es $ ${this.precio}`)
    }
}


let perchero = []
const cargarPerchero = async()=>{
    //ruta relativa del HTML al .JSON y abrir con liveServer
    const response = await fetch("equipos.json")
    const data = await response.json()
    console.log(data)
    for(let jersey of data){
        let jerseyNuevo = new Camisetas(jersey.id, jersey.equipo, jersey.precio, jersey.cantidad, jersey.imagen)
        perchero.push(jerseyNuevo)
    }
    mostrarCatalogo(perchero)
}

//inicializar estanteria con operador OR 
if(localStorage.getItem("perchero")){
    perchero = JSON.parse(localStorage.getItem("perchero"))
}else{
    //Entra por primera -- setear el array el original
    console.log("Seteando el array por primera vez")
    cargarPerchero()
    console.log(perchero)
    localStorage.setItem("perchero", JSON.stringify(perchero))
}