
import fetch from "node-fetch";
import fs from "fs";

// URL pública del JSON (usa RAW)
const URL_JSON = "https://raw.githubusercontent.com/Irving2369A/gholsaw3/main/catalogo/catalogo.json";

// Ruta del archivo local que se actualizará
const RUTA_LOCAL = "catalogo/catalogo.json";

async function actualizarPrecios() {
  try {
    console.log("Descargando archivo JSON desde GitHub RAW...");

    const response = await fetch(URL_JSON);
    if (!response.ok) throw new Error("Error al descargar el JSON");

    const data = await response.json();

    console.log("JSON descargado correctamente.");

    // Aquí puedes modificar precios automáticamente si quieres en el futuro
    // Ejemplo: data.precio = data.precio + 1;

    console.log("Guardando archivo en repositorio...");

    fs.writeFileSync(RUTA_LOCAL, JSON.stringify(data, null, 2));

    console.log("Archivo actualizado correctamente.");
  } catch (error) {
    console.error("Error:", error);
  }
}

actualizarPrecios();
