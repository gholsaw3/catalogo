// ===============================
// CONFIGURACIÓN
// ===============================

const USERNAME = "gholsaw3";       // Tu usuario de GitHub
const REPO = "catalogo";           // Tu repositorio
const FILE_PATH = "products.json"; // Archivo donde se guardan los productos

// IMPORTANTE: Coloca aquí tu token cuando lo generes:
const TOKEN = "AQUI_PONES_TU_TOKEN_PERSONAL";

// ===============================
// FUNCIONES GLOBALES
// ===============================

// Cargar productos desde GitHub
async function loadProducts() {
    const url = `https://raw.githubusercontent.com/${USERNAME}/${REPO}/main/${FILE_PATH}`;

    const response = await fetch(url);
    const data = await response.json();

    renderTable(data);
}

// Guardar productos en GitHub
async function saveProducts(newData) {
    const apiUrl = `https://api.github.com/repos/${USERNAME}/${REPO}/contents/${FILE_PATH}`;

    // Obtener el archivo actual para obtener su SHA
    const currentFile = await fetch(apiUrl, {
        headers: {
            "Authorization": `token ${TOKEN}`
        }
    }).then(res => res.json());

    const sha = currentFile.sha;

    // Enviar archivo actualizado
    await fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Authorization": `token ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Actualización de precios",
            content: btoa(JSON.stringify(newData, null, 2)),
            sha: sha
        })
    });

    alert("Productos guardados exitosamente 👍");
}

// ===============================
// MANEJO DE LA TABLA
// ===============================

function renderTable(products) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input value="${product.nombre}"></td>
            <td><input value="${product.precio}"></td>
            <td><input value="${product.unidad}"></td>
            <td><button onclick="deleteProduct(${index})">Eliminar</button></td>
        `;

        table.appendChild(row);
    });
}

function addProduct() {
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const unidad = document.getElementById("unidad").value;

    if (!nombre || !precio || !unidad) {
        alert("Completa todos los campos");
        return;
    }

    products.push({ nombre, precio, unidad });
    saveProducts(products);
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts(products);
}

// Cargar al abrir
loadProducts();
