//variables globales
let carrito = []
let contenedorTienda = document.getElementById('contenedorTienda');
const cartContainer = document.getElementById('cart-container');
let counterCarrito = document.getElementById    ('counter-carrito');
let totalPrice = document.getElementById('totalPrice');

class Producto {
    constructor(obj){
        this.id = obj.id;
        this.name = obj.name;
        this.descrip = obj.descrip;
        this.img = obj.img;
        this.price = parseFloat(obj.price)
    }
}

//Creo cards con cada producto
verProductos(productos);

function verProductos(array) {
    contenedorTienda.innerHTML = '';
    for (const producto of array) {
        let div = document.createElement('div');
        div.classList.add('card', 'producto', 'contenedor-productos', 'col-3');
        div.innerHTML += `
            <img src= ${producto.img} class="d-block w-100 card-img-top m-3" alt=${producto.name}>
            <div class="card-body p-1">
                <h2>${producto.descrip}</h2>
                <h3 id="price">$${producto.price}</h3>
                <button class="btn-primary" id="btnAdd${producto.id}">Agregar</button>
            </div>`
        
        contenedorTienda.appendChild(div);
        let botonAdd = document.getElementById(`btnAdd${producto.id}`);

        botonAdd.addEventListener('click', () => {agregarAlCarrito(producto.id);
        
           document.getElementById(`btnAdd${producto.id}`).innerText = "Agregado!"
        })
    }   
}

//Event listener para cada botón "Agregar" de la card
function agregarAlCarrito(id) {
    let duplicado = carrito.find(prodDup => prodDup.id == id);
    if(duplicado){
        duplicado.quant = duplicado.quant + 1;
        document.getElementById(`quant${duplicado.id}`).innerHTML = `<p id="quant${duplicado.id}">Cantidad: ${duplicado.quant}</p>`;

        actualizarCarrito();

    }else {
        let prodAdd = productos.find(prod => prod.id == id);
        
        carrito.push(prodAdd);
        prodAdd.quant = 1;

        actualizarCarrito();

        let div = document.createElement('div');
        div.classList.add('productoAgregado');
        
        div.innerHTML =
        `<div class="productoAgregado">
            <p>${prodAdd.name}</p>
            <p>Precio: $${prodAdd.price}</p>
            <p id="quant${prodAdd.id}">Cantidad ${prodAdd.quant}</p>
            <div class="counter">
                <button type="button" id="minus" class="btn">-</button>
                <button type="button" id="quantity" class="quant">0</button>
                <button type="button" id="plus" class="btn">+</button>
            </div>
            <button id="eliminar${prodAdd.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        </div>`;

        cartContainer.appendChild(div);
        
        let btnEliminar = document.getElementById(`eliminar${prodAdd.id}`);

        btnEliminar.addEventListener('click', ()=>{
            btnEliminar.parentElement.remove()
            carrito = carrito.filter(prodE => prodE.id != prodAdd.id);
            
            actualizarCarrito()
        }
        ) 
    }
    
}

function actualizarCarrito() {
    counterCarrito.innerText = carrito.reduce((acc, el)=> acc + el.quant,0);
    totalPrice.innerText = carrito.reduce((acc,el)=> acc + (el.price * el.quant),0)
 }