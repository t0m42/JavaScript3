var carritoVisible = false;

// Esperamos a que todos los elementos de la página se carguen para continuar con el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();

  // actualizamos el total del carrito una vez que hemos eliminado un item
  actualizarTotalCarrito();

  // la siguiente función controla si hay elementos en el carrito una vez que se eliminó
  // si no hay debo ocultar el carrito
  ocultarCarrito();
}

// aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = selector.querySelector('.carrito-item-cantidad').value;
  console.log(cantidadActual);
  cantidadActual++;
  selector.querySelector('.carrito-item-cantidad').value = cantidadActual;
  actualizarTotalCarrito();
}

// agrego funcionalidad al botón sumar cantidad
var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
for (var i = 0; i < botonesSumarCantidad.length; i++) {
  var button = botonesSumarCantidad[i];
  button.addEventListener('click', sumarCantidad);
}

function restarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = selector.querySelector(".carrito-item-cantidad");
  console.log(cantidadActual.value); // Asegúrate de usar .value para obtener el valor numérico
  var cantidad = parseInt(cantidadActual.value); // Convierte a número
  if (cantidad > 1) {
    cantidadActual.value = cantidad - 1;
    actualizarTotalCarrito();
  }
}

// agrego funcionalidad al botón restar cantidad
var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
for (var i = 0; i < botonesRestarCantidad.length; i++) {
  var button = botonesRestarCantidad[i];
  button.addEventListener('click', restarCantidad);
}

function ready() {
  // Funcionalidad de botones "eliminar" del carrito
  var botonesEliminarItem = document.querySelectorAll(".btn-eliminar");
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrito);
  }

  // Funcionalidad de botones "Agregar al carrito"
  var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
  for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener('click', agregarAlCarrito);
  }

  //Agregar funcionalidad al boton pagar
  document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}

// Actualiza el total del carrito
function actualizarTotalCarrito() {
  var carritoItems = document.getElementsByClassName('carrito-item');
  var total = 0;

  // Recorre cada elemento del carrito para calcular el total
  for (var i = 0; i < carritoItems.length; i++) {
    var item = carritoItems[i];
    var precioElemento = item.querySelector('.carrito-item-precio');
    var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', '').replace(',', ''));
    
    var cantidadItem = item.querySelector('.carrito-item-cantidad');
    var cantidad = cantidadItem.value;
    
    total += precio * cantidad;
  }

  total = Math.round(total * 100) / 100;
  document.querySelector('.carrito-precio-total').innerText = '$' + total.toLocaleString("es") + ',00';
}

function ocultarCarrito() {
  var carritoItems = document.getElementsByClassName('carrito-item');
  if (carritoItems.length === 0) {
    var carrito = document.querySelector('.carrito');
    carrito.style.marginRight = '-100%';
    carrito.style.opacity = '0';
    carritoVisible = false;

    // ahora maximizo el contenedor de los elementos
    var items = document.querySelector('.contenedor-items');
    items.style.width = '100%';
  }
}

function agregarAlCarrito(event) {
  var button = event.target;
  var item = button.parentElement;
  var título = item.querySelector('.título-item').innerText;
  console.log(título);
  var precio = item.querySelector('.precio-item').innerText;
  var imagenSrc = item.querySelector('.img-item').src;
  console.log(imagenSrc);

  agregarItemAlCarrito(título, precio, imagenSrc);

  //Hacemos visible el carrito cuando se agrega un producto
  hacerVisibleCarrito();
}

// Función para agregar un artículo al carrito
function agregarItemAlCarrito(título, precio, imagenSrc) {
  var itemsCarrito = document.querySelector('.carrito-items');
  var nuevoItem = document.createElement('div');
  nuevoItem.classList.add('carrito-item');

  var itemCarritoContenido = `
    <img src="${imagenSrc}" alt="" width="80px">
    <div class="carrito-item-detalles">
      <span class="carrito-item-título">${título}</span>
      <div class="selector-cantidad">
        <i class="fa-solid fa-minus restar-cantidad"></i>
        <input type="number" value="1" class="carrito-item-cantidad" disabled>
        <i class="fa-solid fa-plus sumar-cantidad"></i>
      </div>
      <span class="carrito-item-precio">${precio}</span>
    </div>
    <span class="btn-eliminar">
      <i class="fa-solid fa-trash"></i>
    </span>
  `;

  nuevoItem.innerHTML = itemCarritoContenido;
  itemsCarrito.appendChild(nuevoItem);

  // Agregamos la funcionalidad eliminar del nuevo item
  nuevoItem.querySelector('.btn-eliminar').addEventListener('click', eliminarItemCarrito);

  // Agregamos la funcionalidad de sumar del nuevo item
  nuevoItem.querySelector('.sumar-cantidad').addEventListener('click', sumarCantidad);

  // Agregamos la funcionalidad de restar del nuevo item
  nuevoItem.querySelector('.restar-cantidad').addEventListener('click', restarCantidad);

}

function pagarClicked(event){
  alert("GRACIAS POR SU COMPRA");
  // Elimino todos los elementos del carrito
  var carritoItems = document.getElementsByClassName('carrito-items')[0];
  while(carritoItems.hasChildNodes()){
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();

  // Función ocultar carrito
  ocultarCarrito();
}


function hacerVisibleCarrito(){
  carritoVisible = true;
  var carrito = document.getElementsByClassName('carrito')[0];
  carrito.style.marginRight = '0';
  carrito.style = '1';

  var items = document.getElementsByClassName('contenedor-items')[0];
  items.style.width = '70%';
}
// Llama a la función ready para configurar todo después de que se carga la página
ready();
