// Obtener el elemento del mural
const mural = document.getElementById('mural');

// Obtener el elemento del selector de color
const colorPicker = document.getElementById('colorPicker');

// Obtener los botones de borrar, limpiar y guardar
const borrarBtn = document.getElementById('borrar');
const limpiarBtn = document.getElementById('limpiar');
const guardarBtn = document.getElementById('guardar');

// Variable para indicar si la herramienta de borrar está activa o no
let borrarActivo = false;

// Función para activar el botón
function activarBoton(boton) {
    boton.classList.add('active'); // Agregar la clase 'active' al botón
}

// Función para desactivar el botón
function desactivarBoton(boton) {
    boton.classList.remove('active'); // Eliminar la clase 'active' del botón
}

// Función para manejar el evento de clic en un píxel
function clicEnPixel(pixel, index) {
    // Si la herramienta de borrar está activa y el píxel está coloreado, borrarlo
    if (borrarActivo && pixel.style.backgroundColor !== 'white') {
        const colorInicial = pixel.dataset.colorInicial; // Obtener el color inicial del píxel
        pixel.style.backgroundColor = colorInicial; // Restaurar el color inicial del píxel
        localStorage.removeItem(`pixel-${index}`);
    } else if (!borrarActivo) {
        // Obtener el color seleccionado por el usuario
        const selectedColor = colorPicker.value;
        pixel.style.backgroundColor = selectedColor; // Cambiar el color del píxel al hacer clic en él
    }
}

// Función para crear los píxeles del mural
function crearPixeles(numColumnas, numFilas) {
    const numPixeles = numColumnas * numFilas;
    let colorActual = 'lightGray'; // Iniciar con el color gris

    for (let i = 0; i < numPixeles; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');

        // Alternar el color del píxel
        if ((Math.floor(i / numColumnas) + Math.floor(i % numColumnas)) % 2 === 0) {
            colorActual = 'lightGray'; // Si la suma de la fila y la columna es par, usar gris
        } else {
            colorActual = 'white'; // Si la suma de la fila y la columna es impar, usar blanco
        }
        pixel.style.backgroundColor = colorActual; // Establecer el color del píxel
        pixel.dataset.colorInicial = colorActual; // Almacenar el color inicial del píxel en un atributo de datos

        // Comprobar si hay datos almacenados para este píxel y establecer el color correspondiente
        const pixelColor = localStorage.getItem(`pixel-${i}`);
        if (pixelColor) {
            pixel.style.backgroundColor = pixelColor;
        }

        // Agregar el evento de clic al píxel
        pixel.addEventListener('mousedown', () => clicEnPixel(pixel, i));

        mural.appendChild(pixel); // Agregar el píxel al mural
    }
}

// Lógica para activar y desactivar el botón de borrar
borrarBtn.addEventListener('click', () => {
    borrarActivo = !borrarActivo; // Alternar el estado de la herramienta de borrar
    if (borrarActivo) {
        activarBoton(borrarBtn); // Activar el botón si la herramienta de borrar está activa
    } else {
        desactivarBoton(borrarBtn); // Desactivar el botón si la herramienta de borrar está inactiva
    }
});

// Función para guardar los cambios en el mural
guardarBtn.addEventListener('click', () => {
    const pixeles = mural.querySelectorAll('.pixel');
    pixeles.forEach((pixel, index) => {
        const color = pixel.style.backgroundColor;
        localStorage.setItem(`pixel-${index}`, color);
    });
    alert('¡Los cambios han sido guardados!');
});

// Función para limpiar el mural
limpiarBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas limpiar el mural?')) {
        const pixeles = mural.querySelectorAll('.pixel');
        pixeles.forEach((pixel, index) => {
            const colorInicial = pixel.dataset.colorInicial; // Obtener el color inicial del píxel
            pixel.style.backgroundColor = colorInicial; // Restaurar el color inicial del píxel
            localStorage.removeItem(`pixel-${index}`);
        });
    }
});

// Llamar a la función para crear los píxeles del mural con un tamaño predeterminado
crearPixeles(200, 120); // 200 columnas y 120 filas

// Obtener la imagen
const imagenMovil = document.getElementById('imagenMovil');

// Obtener las dimensiones del mural y la ventana del navegador
const muralRect = document.getElementById('mural').getBoundingClientRect();
const ventanaAncho = window.innerWidth;
const ventanaAlto = window.innerHeight;

// Variables para la posición y velocidad de la imagen
let posX = Math.random() * (ventanaAncho - muralRect.width);
let posY = Math.random() * ventanaAlto;
let velocidadX = (Math.random() - 0.5) * 4; // Velocidad horizontal entre -2 y 2
let velocidadY = (Math.random() - 0.5) * 4; // Velocidad vertical entre -2 y 2

// Función para mover la imagen
function moverImagen() {
    posX += velocidadX;
    posY += velocidadY;

    // Rebotar en los bordes de la ventana
    if (posX <= 0 || posX >= ventanaAncho - imagenMovil.width) {
        velocidadX *= Math.random() < 0.5 ? -1 : 1; // Cambiar la dirección horizontal aleatoriamente
    }
    if (posY <= 0 || posY >= ventanaAlto - imagenMovil.height) {
        velocidadY *= Math.random() < 0.5 ? -1 : 1; // Cambiar la dirección vertical aleatoriamente
    }

    // Rebotar en el marco del mural
    if (posX >= muralRect.left && posX <= muralRect.right - imagenMovil.width &&
        posY >= muralRect.top && posY <= muralRect.bottom - imagenMovil.height) {
        if (posX <= muralRect.left || posX >= muralRect.right - imagenMovil.width) {
            velocidadX *= -1;
        }
        if (posY <= muralRect.top || posY >= muralRect.bottom - imagenMovil.height) {
            velocidadY *= -1;
        }
    }

    // Actualizar la posición de la imagen
    imagenMovil.style.left = `${posX}px`;
    imagenMovil.style.top = `${posY}px`;
}

// Establecer intervalo para mover la imagen
setInterval(moverImagen, 23);







