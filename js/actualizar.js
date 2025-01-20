async function cargarDetalles() {
    const params = new URLSearchParams(window.location.search);
    const torre = params.get("torre");
    const apartamento = params.get("apartamento");

    try {
        const response = await fetch("../json/datos.json");
        const data = await response.json();

        // Encuentra el apartamento específico
        const detalles = data.find(
            item => item.torre == torre && item.apartamento == apartamento
        );

        if (detalles) {
            const formulario = document.getElementById("vehiculo-formulario");

            // Itera sobre las claves y valores del objeto
            Object.entries(detalles).forEach(([key, value]) => {
                // Crea un contenedor para cada campo
                const fieldContainer = document.createElement("div");
                fieldContainer.classList.add("field-container");

                // Crea la etiqueta (label)
                const label = document.createElement("label");
                label.setAttribute("for", key);
                label.textContent = key;

                // Crea el campo de texto (input)
                const input = document.createElement("input");
                input.type = "text";
                input.id = key;
                input.name = key;
                input.value = value;

                // Agrega la etiqueta y el campo al contenedor
                fieldContainer.appendChild(label);
                fieldContainer.appendChild(input);

                // Agrega el contenedor al formulario
                formulario.appendChild(fieldContainer);
            });
        } else {
            alert("Apartamento no encontrado.");
        }
    } catch (error) {
        console.error("Error al cargar los detalles:", error);
    }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", cargarDetalles);
