class Camisetas{
    constructor(id, equipo, precio, cantidad, imagen){
        this.id = id;
        this.equipo = equipo;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.imagen = imagen;
    }
}

const camiseta1 = new Camisetas(1, "Velez Sarsfield", 15000, 6, "./img/velez.png" )
const camiseta2 = new Camisetas(2, "River Plate", 12000, 6, "./img/river.png" )
const camiseta3 = new Camisetas(3, "Boca Juniors", 12000, 6, "./img/bocajrs.png" )
const camiseta4 = new Camisetas(4, "Independiente", 12000, 6, "./img/independiente.png" )
const camiseta5 = new Camisetas(5, "San Lorenzo", 12000, 6, "./img/sanlorenzo.png" )
const camiseta6 = new Camisetas(6, "Racing Club", 12000, 6, "./img/racing.png" )
const camiseta7 = new Camisetas(7, "Argentinos Juniors", 10800, 6, "./img/argentinosjrs.png" )
const camiseta8 = new Camisetas(8, "Platense", 10800, 6, "./img/platense.png" )
const camiseta9 = new Camisetas(9, "Defensa y Justicia", 10800, 6, "./img/defensa-y-justicia.png" )
const camiseta10 = new Camisetas(10, "Banfield", 10800, 6, "./img/banfield-1.png" )
const camiseta11 = new Camisetas(11, "Estudiantes", 12000, 6, "./img/estudiantes.png" )
const camiseta12 = new Camisetas(12, "Central Cordoba", 10800, 6, "./img/central-cordoba-.png" )

//array de stock
let perchero = []

if(localStorage.getItem("perchero")){
    perchero = JSON.parse(localStorage.getItem("perchero"))
}else{
    perchero.push(camiseta1, camiseta2, camiseta3, camiseta4, camiseta5, camiseta6, camiseta7, camiseta8, camiseta9, camiseta10, camiseta11, camiseta12)
    localStorage.setItem("perchero", JSON.stringify(perchero))
}

