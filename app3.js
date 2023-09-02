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



const dispositivos = `[

  {
    "marca": "samsung galaxy",
    "modelo": "S20",
    "precio": "$125.000",
    "descripcion": "Galaxy S20 cuenta con 8GB de memoria RAM, y 128GB de almacenamiento interno, expandible vía microSD. La cámara posterior del Galaxy S20 es triple, con una configuración 12 MP + 12 MP + 64 MP, mientras que la cámara para selfies es de 10 megapixels."
  },
  {
    "marca": "samsung galaxy",
    "modelo": "S21",
    "precio": "$135.000",
    "descripcion": "Galaxy S21 cuenta con 8GB de memoria RAM, y 128GB o 256GB de alamacenamiento interno, expandible vía microSD. Las camaras posterior del Galaxy S21 tienen 12 megapíxeles f/1.8 Angular: 12 megapíxeles f/2.2 Zoom: 64 megapíxeles f/2.0 1.1X. 10 megapíxeles f2/2.2 en su cámara frontal."
  },
  {
    "marca": "samsung galaxy",
    "modelo": "S22",
    "precio": "$143.000",
    "descripcion": "Galaxy S22; con cámara de 50+10+12 MP para explorar tu creatividad. Obtené los mejores resultados gracias a su procesador Octa-Core (2.99GHz,2.4GHz,1.7GHz) y su memoria interna de 128 GB. Disfrutá de jugar; ver series o trabajar en una pantalla de full vision de 6.1."
  },
  {
    "marca": "samsung galaxy",
    "modelo": "S23",
    "precio": "$160.000",
    "descripcion": "Procesador Snapdragon 8 Gen 2. Sistema operativo Android 13. RAM 8 GB. Almacenamiento 128 GB, 256 GB, 512 GB. Pantalla 6,1 pulgadas Dynamic AMOLED 2X. Resolucion 1080 x 2340 (Full HD+) Densidad de píxeles 422 ppp. Cámara Principal Triple, 50 MP + 12 MP + 10 MP."
  },
  {
    "marca": "samsung galaxy",
    "modelo": "A33",
    "precio": "$88.000",
    "descripcion": "Resistente al polvo y al agua. Pantalla FHD+ Super AMOLED de 90 Hz. Cámara con OIS. Batería que dura hasta 2 días."
  },
  {
    "marca": "samsung galaxy",
    "modelo": "A34",
    "precio": "$92.000",
    "descripcion": "Tamaño (Display principal) 166.5mm (6.6 full rectangle) / 162.1mm (6.4 rounded corners) Resolución (Display principal) 1080 x 2340 (FHD+) Tecnología (Display principal) Super AMOLED. Profundidad de color (Display principal) 16M. Frecuencia de actualización (Display principal) 120 Hz."
  },
  {
    "marca": "samsung galaxy",
    "modelo": "A52",
    "precio": "$100.000",
    "descripcion": "Pantalla Super AMOLED de 6.5. Tiene 4 cámaras traseras de 64Mpx/12Mpx/5Mpx/5Mpx. Cámara delantera de 32Mpx. Procesador Snapdragon 720G Octa-Core de 2.3GHz con 6GB de RAM. Batería de 4500mAh. Memoria interna de 128GB. Resistente al agua."
  },
  {
    "marca": "samsung smart",
    "modelo": "55",
    "precio": "$115.000",
    "descripcion": "Motor de imágenes Crystal Processor 4K. One Billion Color Si. PQI (Picture Quality Index) 2000. HDR (Alto Rango Dinámico) HDR. HDR 10+ Support. HLG (Registro híbrido Gamma) Si. Contraste Mega Contrast. Color Pur Color."
  },
  {
    "marca": "samsung smart",
    "modelo": "70",
    "precio": "$135.000",
    "descripcion": "Motor de imágenes Crystal Processor 4K. One Billion Color Si.(Picture Quality Index) 2000. HDR (Alto Rango Dinámico) HDR. HDR 10+ Support. HLG (Registro híbrido Gamma) Si.Contraste Mega Contrast.Color Pur Color."
  },
  {
    "marca": "samsung smart",
    "modelo": "85",
    "precio": "$150.000",
    "descripcion": "Motor de imágenes Quantum Processor 4K. Adaptive Picture Sí HLG (Registro híbrido Gamma) Sí, Contraste Mega Contrast. Color 100 % Colour Volume with Quantum Dot. Ángulo de visión Wide Viewing Angle. Detección de brillo y color Brightness / Color Detection.,Microatenuación Supreme UHD Dimming."
  },
  {
    "marca": "samsung barra de sonido",
    "modelo": "HW-t400",
    "precio": "$90.000",
    "descripcion": "Potencia 40W. Número de canales 2.0 Ch. Tipo de Subwoofer (Activo / Pasivo / Inalámbrico / Integrado) Integrado. Dimensiones de la barra de sonido en caja (An x Al x Prof) 712.0 x 180.0 x 170.0 mm. Peso Bruto (1 bulto) 2.7 kg. Consumo en Stand-by (Barra) 0.5W."
}
] 
`;

console.log(typeof dispositivos);

const jsonData = JSON.parse(dispositivos);
console.log(typeof jsonData);

const dispNuevos = jsonData.filter(
  (producto) => producto.modelo > 85 && parseFloat(producto.precio) < 160000
);
console.log(dispNuevos);

const dispositivosNuevos = jsonData.filter((producto) => {
  // Aquí va tu lógica de filtro
  return producto.modelo === "S23" && parseFloat(producto.precio) < 100000;
});

console.log(dispositivosNuevos);