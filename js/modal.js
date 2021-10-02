
const displayCart = document.getElementById('display-cart');
const closeCart = document.getElementById('close-cart');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0];

const modalCarrito = document.getElementById('modal-cart')[0];

displayCart.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')}
);

closeCart.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')}
);

modalCart.addEventListener('click',(e)=>{
    e.stopPropagation()}
);

contenedorModal.addEventListener('click', ()=>{
    closeCart.click()}
);