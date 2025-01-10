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
            const infoDiv = document.getElementById("info-apartamento");
            Object.entries(detalles).forEach(([key, value]) => {
                const p = document.createElement("p");
                p.textContent = `${key}: ${value}`;
                infoDiv.appendChild(p);
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