  

// Lógica del juego
class Group {
    constructor(elements, operation) {
        this.elements = elements;
        this.operation = operation;
    }

    isClosed() {
        const steps = [];
        for (let a of this.elements) {
            for (let b of this.elements) {
                const result = this.operation(a, b);
                steps.push({ a, b, result });
                if (!this.elements.includes(result)) {
                    return { closed: false, steps };
                }
            }
        }
        return { closed: true, steps };
    }
}

function checkClosed() {
    const group = new Group([0, 1, 2, 3], (a, b) => (a + b) % 4);
    const resultElement = document.getElementById("result");
    const stepsElement = document.getElementById("steps");
    const { closed, steps } = group.isClosed();

    stepsElement.innerHTML = "";
    steps.forEach(step => {
        const stepDiv = document.createElement("div");
        stepDiv.textContent = `Operación: ${step.a} + ${step.b} % 4 = ${step.result}`;
        stepsElement.appendChild(stepDiv);
    });

    if (closed) {
        resultElement.textContent = "El conjunto es cerrado bajo la operación.";
        resultElement.style.color = "#28a745";
    } else {
        resultElement.textContent = "El conjunto no es cerrado bajo la operación.";
        resultElement.style.color = "#dc3545";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-button").addEventListener("click", () => {
        document.getElementById("game-intro").style.display = "none";
        document.getElementById("game-area").style.display = "block";
    });

    document.getElementById("check-button").addEventListener("click", checkClosed);
});



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

