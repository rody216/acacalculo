
document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar navbar.html');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Hubo un problema con la carga de la barra de navegación:', error);
        });
});

// Variables para botones y modal
const buttons = document.querySelectorAll(".modal-button");
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const closeButton = document.querySelector(".close-button");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");

// Mapeo de contenido para cada botón
const modalContentMap = {
    1: { title: "Aplicación en el Juego", description: "Cuando juegas al 15 Puzzle, sin darte cuenta estás usando matemáticas avanzadas: Reordenamiento de números (permutaciones): Cada movimiento cambia la posición de los números. Estrategias para resolverlo (sucesiones exactas): Sigues una serie de pasos hasta llegar a la solución. Restricciones en los movimientos (grupos y operaciones cerradas): No todas las piezas pueden moverse a cualquier lado." },
    2: { title: "Operaciones Cerradas", description: "Imagina que tienes un conjunto de números y una operación especial, como sumar o multiplicar. Si al hacer la operación el resultado siempre está dentro del mismo conjunto, decimos que es una operación cerrada. En nuestro juego, mover las piezas de un lugar a otro sigue un conjunto de reglas que siempre nos mantienen dentro del tablero, así que podemos decir que las operaciones en el juego son cerradas." },
    3: { title: "Grupos y Permutaciones.", description: "Un grupo en matemáticas es un conjunto de elementos junto con una operación que cumple ciertas reglas. En el 15 Puzzle, cada vez que movemos una pieza estamos reordenando los números, y este reordenamiento se llama permutación. No todas las permutaciones son posibles en el juego, y eso es lo que hace que resolverlo sea un reto interesante." },
    4: { title: "Monoides y Semigrupos", description: "Los semigrupos son conjuntos con una operación que se puede aplicar varias veces y sigue una regla llamada asociatividad. Si además hay un elemento especial que no cambia nada cuando lo usamos, tenemos un monoide. En el 15 Puzzle, la posición inicial del juego es como el elemento especial porque queremos volver a ella después de mezclar las piezas." },
    5: { title: "Sucesiones Exactas", description: "Una sucesión exacta es una serie de operaciones matemáticas que siguen una estructura muy precisa. En nuestro juego, cada movimiento lleva a otra posición específica del tablero, y seguir una secuencia correcta nos lleva a la solución. ¡Es como seguir un mapa secreto para resolver el puzzle!." }
};

// Abrir modal al hacer clic en los botones
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        modalTitle.textContent = modalContentMap[modalId].title;
        modalDescription.textContent = modalContentMap[modalId].description;
        modal.style.display = "block";
    });
});

// Cerrar modal con el botón "X"
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", event => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


