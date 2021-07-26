class combos {
    constructor(id, color, modelo, tamaño, precio, info) {
            this.id = id,
            this.color = color,
            this.modelo = modelo,
            this.tamaño = tamaño,
            this.precio = precio,
            this.info = ` Tazon  ${this.modelo},su precio es $ ${this.precio} esta disponible en ${this.color}`
    }

    infoTazon() {
        alert(`Detalle:  ${this.info}`)
    }
    comprar() {
        alert(`Elegiste comprar el modelo  ${this.modelo} `)
    }
    pagar() {
        alert(`Por este producto deberas pagar  $ ${this.precio}`)
    }
}



let carrito=[]

const felita = new combos(5, "verde", "Combo Felita", 15, 1900)
const mica = new combos(6, "Rosa", "Combo Micaela", 12, 1500)
const  sofia = new combos(7, "Amarillo", "Combo Sofia", 11, 1600)
const coni = new combos(8, "Rojo", "Combo Coni", 20, 1800)
const benja = new combos(9, "Azul", "Combo Benja", 10, 1300)

const productos = [felita, mica, sofia, coni, benja];

let productoElejido 

function disponible(item) {
    modelin = item.modelo
    return modelin
}

//-------------completo Form de combos---------------------------------------------------------------------
const combosDisponibles= document.getElementById("combos")
for (const producto of productos) {
    let option = document.createElement("option");
    option.innerHTML = producto.modelo
    combosDisponibles.appendChild(option, document.querySelector("option"))
}


//-------------------------------------------eleccion de combo-------------------------------------------------------------------------------------------------


function elejir() {
    const a = document.getElementById("combos").value
    productoElejido = productos.find(x => x.modelo === a)
    const b = document.getElementById("precio")
    b.textContent = productoElejido.precio
    const c = document.getElementById("agregarCombo")
    c.setAttribute("data-id", productoElejido.id)
    calculoSubtotal()
}


function calculoSubtotal() {
    const cantidad = Number(document.getElementById("cantidad").value)
    const total = productoElejido.precio * cantidad
    subtotal = document.getElementById("subtotal")
    subtotal.textContent = String(total)
}



//-----------------------------eleccion de Cartas O COMBOS agregando al carrito----------------------------------

const carritoLocator = document.getElementById("carrito")
const listaProductos = document.querySelector("#lista-productos")
const listaCombos = document.querySelector ("#combosForm")
const listaCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritoBtn = document.getElementById("vaciar-carrito")



cargarEventListeners()
function cargarEventListeners() {
    listaCombos.addEventListener("click",comprarCombo)
    listaProductos.addEventListener("click", comprarMasVendido),
    carritoLocator.addEventListener("click", eliminarProducto),
    vaciarCarritoBtn.addEventListener("click", vaciarLocalStorage)
    document.addEventListener('DOMContentLoaded', () => {

        if (JSON.parse(localStorage.getItem('carrito'))) {
            leerCarritoLocalStorage()
        }
    })
}


function comprarCombo(e){
    e.preventDefault()
    if (e.target.classList.contains("agregar-carrito")) {
    let combo = document.getElementById("combosForm")
    leerDatosCombo(combo)
}
}

function leerDatosCombo(combo){
    const infoCombos ={
        titulo: combo.querySelector("#combos").value,
        precio: combo.querySelector("#subtotal").textContent,
        cantidad: combo.querySelector("#cantidad").value,
        id: combo.querySelector("#agregarCombo").getAttribute("data-id")
    }
    const existeProducto = carrito.some(product => product.id === infoCombos.id )
           
            
    if (existeProducto) {
        const productos = carrito.map(producto => {
            if (producto.id === infoCombos.id) {
                producto.cantidad = `${Number(infoCombos.cantidad) + Number(producto.cantidad) }`;
                producto.precio = `${Number(infoCombos.precio) + Number(producto.precio)}`
                
            } else {
                
            }
            return producto;
        });
        
        carrito = [...productos];
    } else {
        carrito.push(infoCombos)
    }
   
    InsertarCarrito()
}



function comprarMasVendido(e) {
     e.preventDefault()
        if (e.target.classList.contains("agregar-carrito")) {
        let carta = e.target.parentElement
        leerDatos(carta)
    }
}
  

function leerDatos(carta) {
            const infoProducto = {
                
                titulo: carta.querySelector("h2").textContent,
                precio: carta.querySelector(".precio").textContent.slice(1),
                cantidad: 1,
                id: carta.querySelector("a").getAttribute("data-id"),
            }

            const existeProducto = carrito.some(product => product.id === infoProducto.id )
           
            
            if (existeProducto) {
                const productos = carrito.map(producto => {
                    if (producto.id === infoProducto.id) {
                        producto.cantidad++;
                        producto.precio = `${Number(infoProducto.precio) * producto.cantidad}`
                        
                    } 
                    return producto;
                });
                
                carrito = [...productos];
            } else {
                 carrito.push(infoProducto);
              
            }
          InsertarCarrito()
        }
     

    function InsertarCarrito(){
            vaciarCarrito()

            carrito.forEach( product=> {
                const {titulo,precio,cantidad,id}= product;

                const row = document.createElement("tr");
                row.innerHTML = `
            
            <td>${titulo}</td>
            <td> ${cantidad}</td>
            
            <td>$ ${precio}</td>
            <td> 
            <a href="#" class="borrar-producto" > <img src="multimedia/eliminar.jpg" class="borrar-producto" data-id= ${id} > </a> 
            </td>
        
            `

            listaCarrito.appendChild(row)

            })            
            guardarCarritoLocalStorage()
    }


    function eliminarProducto(e) {
        e.preventDefault()
        let carta, cartaId
        if (e.target.classList.contains("borrar-producto")) {
            e.target.parentElement.parentElement.parentElement.remove()
            carta = e.target.parentElement.parentElement.parentElement
            cartaId = carta.querySelector("img").getAttribute("data-id")
        }
        carrito = carrito.filter( product => product.id != cartaId )
        guardarCarritoLocalStorage()
    }
    

    function vaciarCarrito() {
        while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild)
        }
        
        return false
    }
    

    function leerCarritoLocalStorage(){
        carrito = JSON.parse(localStorage.getItem("carrito")) 
        InsertarCarrito()
    }

    function guardarCarritoLocalStorage(){
        localStorage.setItem("carrito", JSON.stringify(carrito))

    }

    function vaciarLocalStorage() {
        carrito =[]
        InsertarCarrito()
        
    }
        


//-----------trabajando con Jquery--------------------

$("#contacto").hide()

$("#finalizar-compra").on("click", function(){
        if (carrito.length !=0){
            let posicion =$("#contacto").show().offset().top
            $("html, body").animate({scrollTop: posicion},2000)
            totalCompra()
    }
    
})

function totalCompra(){
    let subtotal = 0
    carrito.forEach(p => {
        subtotal += Number(p.precio) 

    })
    $("#total").text(`$${subtotal}`) 
    
}

//----------------------------Ajax------------------------


const tablaPago = $("#tablaPago")
$(".botton").on("click", function(e){
    e.preventDefault(e)
    $.ajax({
       
        url:"./pagos.json",
        method: "GET",
        dataType : "JSON",
        success: function(respuesta, estado){
            
            if(estado === "success" && $("#tablaPago").children().length==0){
                let FormaPago = respuesta;
                for(const dato of FormaPago ){
                    $("#tablaPago").append( 
                        `
                      </thead>
                           <tr> 
                                <td> ${dato.tipo}</td>
                                 <td> ${dato.beneficio}</td>
                            </tr>
                    `
                    )
                }
            }
           
        }
    
    })
    
})



//--------------Finalizacion de pedido con modal---------------------------------------

const cerrar= document.querySelector(".close")
const abrir= document.querySelector(".cta")
const modal= document.querySelector(".modal")
const modalC= document.querySelector(".modal-conteiner")

abrir.addEventListener("click", function(e){
    e.preventDefault(),
    modalC.style.opacity = "1",
    modalC.style.visibility = "visible",
    modal.classList.toggle("modal-close")
    construirMensaje()
})


cerrar.addEventListener("click", function(){
    modal.classList.toggle("modal-close"),
    setTimeout(() => {
    modalC.style.opacity = "0"
    modalC.style.visibility = "hidden";
    }, 850);
})

window.addEventListener("click",function(e){
    if( e.target == modalC){
     modal.classList.toggle("modal-close")
    
    setTimeout(() => {
    modalC.style.opacity = "0"
    modalC.style.visibility = "hidden";
    }, 850)
    }
})

function construirMensaje(){
    $("#error-cliente").html("")
    if ($("#nombre").val().trim() === "" && $("#correo").val().trim() === "") {
        $("#error-cliente").html("Debe completar sus datos")
        $("#finCompra").html("Ingrese sus datos correctamente")
        return;
      }else{    const mensaje = `Muchas gracias por tu compra ${$(
        "#nombre").val()}, estaremos enviando coordinando la entrega a ${$(
        "#correo").val()} en los proximos minutos`
      
        $("#finCompra").html(mensaje);}
}



