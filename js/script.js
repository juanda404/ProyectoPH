const rowsPerPage = 10;
let currentPage = 1;
let datos = [];

async function cargarDatos() {
    try {
        const response = await fetch("../json/datos.json"); // Carga el archivo JSON
        datos = await response.json(); // Convierte a un objeto JavaScript

        // Renderiza la tabla para la página inicial
        renderTable(currentPage);
    } catch (error) {
        console.error("Error cargando el archivo JSON:", error);
    }
}

function renderTable(page) {
    const tablaCuerpo = document.getElementById("listado-informacion");
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Obtiene los datos para la página actual
    const pageData = datos.slice(start, end);

    // Limpia la tabla
    tablaCuerpo.innerHTML = "";

    // Agrega las filas de la página actual
    pageData.forEach(item => {
        const fila = document.createElement("tr");

        // Itera sobre las claves del objeto para crear celdas
        Object.keys(item).forEach(key => {
            const celda = document.createElement("td");

            if (key === "apartamento") {
                // Crea un enlace en lugar del texto plano
                const enlace = document.createElement("a");
                enlace.href = `detalles.html?torre=${item.torre}&apartamento=${item.apartamento}`;
                enlace.textContent = item.apartamento;
                celda.appendChild(enlace);
            } else {
                celda.textContent = item[key];
            }

            fila.appendChild(celda);
        });

        tablaCuerpo.appendChild(fila);
    });

    // Actualiza los botones de navegación y el texto de la página
    document.getElementById("prev").disabled = page === 1;
    document.getElementById("next").disabled = end >= datos.length;
    document.getElementById("page-info").textContent = `Página ${page}`;
}

// Manejo de eventos para la paginación
document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
});

document.getElementById("next").addEventListener("click", () => {
    if (currentPage * rowsPerPage < datos.length) {
        currentPage++;
        renderTable(currentPage);
    }
});

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", cargarDatos);
