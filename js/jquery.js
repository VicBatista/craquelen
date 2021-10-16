
//variables globales
let carrito = []
//let contenedorTienda = document.getElementById('contenedorTienda');
//const cartContainer = document.getElementById('cart-container');
//let counterCarrito = document.getElementById    ('counter-carrito');
//let totalPrice = document.getElementById('totalPrice');

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
let stockProductos = [];
function recuperarStock() {
    let stock = JSON.parse(localStorage.getItem('stock'))
    if (stock) {
        stock.forEach(el => stockProductos.push(el));
    }
}

$.getJSON('js/stock.json', function (data) {
    console.log(data);
    localStorage.setItem('stock', JSON.stringify(data));
    recuperarStock();
    verProductos(data);
    recuperar();
    }
)

function verProductos(array) {
    $('#contenedorTienda').html = '';
    for (const producto of array) {
        /* let div = document.createElement('div');
        div.classList.add('card', 'producto', 'contenedor-productos', 'col-3');
        div.innerHTML += */
        let div = $('.shop-container').append(
            `<div class="contenedor-productos card col-3">
                <img src= ${producto.img} class="d-block w-100 card-img-top m-3" alt=${producto.name}>
                    <div class="card-body p-1">
                        <h2>${producto.descrip}</h2>
                        <h3 id="price">$${producto.price}</h3>
                        <button class="btn-primary" id="btnAdd${producto.id}">Agregar</button>
                    </div>
            </div>`
        )
        
        $('#contenedorTienda').append(div);
        //let botonAdd = document.getElementById(`btnAdd${producto.id}`);

        $(`#btnAdd${producto.id}`).on('click', () => {
            agregarAlCarrito(producto.id);
        
            $(`#btnAdd${producto.id}`).text(`Agregado!`)
            }
        )
    }   
}

//Event listener para cada botón "Agregar" de la card
function agregarAlCarrito(id) {
    let duplicado = carrito.find(prodDup => prodDup.id == id);
    if(duplicado){
        duplicado.quant = duplicado.quant + 1;
        $(`#quant${duplicado.id}`).html = `<p id="quant${duplicado.id}">Cantidad: ${duplicado.quant}</p>`;

        actualizarCarrito();

    }else {
        let prodAdd = stockProductos.find(prod => prod.id == id);
        
        carrito.push(prodAdd);
        prodAdd.quant = 1;

        actualizarCarrito();

        //let div = document.createElement('div');
        //div.classList.add('productoAgregado');
        $('#cart-container').append(    
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
            </div>`
        )

        //cartContainer.appendChild(div);
        
        //let btnEliminar = document.getElementById(`eliminar${prodAdd.id}`);

        $(`#eliminar${prodAdd.id}`).on('click', ()=>{
            btnEliminar.parentElement.remove()
            carrito = carrito.filter(prodE => prodE.id != prodAdd.id);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito()
        }) 
    } localStorage.setItem('carrito', JSON.stringify(carrito))
}
function recuperar() {
    let recuperar = JSON.parse(localStorage.getItem('carrito'))
    if (recuperar) {
        recuperar.forEach(el => {
            agregarAlCarrito(el.id)           
        });        
    }
    
}

function actualizarCarrito() {
    $('#counter-carrito').text(carrito.reduce((acc, el)=> acc + el.quant,0));
    $('#totalPrice').text(carrito.reduce((acc,el)=> acc + (el.price * el.quant),0));
};