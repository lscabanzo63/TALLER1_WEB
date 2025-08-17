async function fetchData(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        showNetworkError("No se pudo conectar con el servidor. Intenta nuevamente.");
        return null;
    }
}

function showNetworkError(msg) {
    const err = document.getElementById("networkError");
    if (err) {
        err.textContent = msg;
        err.style.display = "block";
    }
}

function clearNetworkError() {
    const err = document.getElementById("networkError");
    if (err) {
        err.style.display = "none";
    }
}




async function getPokemons(limit = 20, offset = 0) {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const data = await fetchData(baseUrl);
    if (!data) return [];

    const pokemons = [];
    for (const item of data.results) {
        const details = await fetchData(item.url);
        if (details) {
            pokemons.push({
                id: details.id,
                name: details.name,
                img: details.sprites.other.home.front_default,
                types: {
                    first: details.types[0]?.type.name || null,
                    second: details.types[1]?.type.name || null
                }
            });
        }
    }
    return pokemons;
}

// Renderizar lista de pokemones en la grilla
function renderPokemons(pokemons) {
    const container = document.querySelector(".grid-pokemon");
    const placeholder = document.getElementById("placeholder");
    const pagination = document.querySelector(".pagination");

    container.innerHTML = "";

    if (pokemons.length === 0) {
        placeholder.style.display = "flex"; // mostrar imagen placeholder
        pagination.style.display = "none";  // ocultar paginación
        return;
    } else {
        placeholder.style.display = "none"; // ocultar imagen
        pagination.style.display = "flex";  // mostrar paginación
    }

    pokemons.forEach(pokemon => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <div class="cuerpo">
                <h3 style="text-transform: capitalize;">${pokemon.name}</h3>
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
            <div class="pie">
                <li>
                    ${
                        pokemon.types.second
                        ? `
                          <span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>
                          <span class="badge ${pokemon.types.second}">${pokemon.types.second}</span>
                        `
                        : `<span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>`
                    }
                </li>
            </div>
        `;

        tarjeta.addEventListener("click", () => {
            console.log("Pokemon ID:", pokemon.id);
        });

        container.appendChild(tarjeta);
    });
}

// Variables para la paginación
let allPokemons = [];
let currentPage = 1;
const perPage = 6;

// Mostrar la página actual
function showPage(page) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    renderPokemons(allPokemons.slice(start, end));

    // Actualizar indicador de página
    document.getElementById("pageIndicator").textContent = `Página ${currentPage}`;
    updateButtons();
}

// Habilitar/deshabilitar botones según la página
function updateButtons() {
    const maxPage = Math.ceil(allPokemons.length / perPage);
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === maxPage;
}

// Guardar lista original para búsquedas
let originalPokemons = [];

// Función para filtrar pokemones por tipo
function filterByType(type) {
    if (!type) return [];
    return originalPokemons.filter(pokemon => 
        pokemon.types.first === type || pokemon.types.second === type
    );
}

// Mostrar error de búsqueda
function showTypeError(msg) {
    const input = document.querySelector(".search-input");
    let err = document.getElementById("typeError");
    if (!err) {
        err = document.createElement("div");
        err.id = "typeError";
        err.className = "error-text";
        document.querySelector(".section-filter").appendChild(err);
    }
    input.classList.add("error");
    err.textContent = msg;
    err.style.display = "block";
}

// Limpiar error de búsqueda
function clearTypeError() {
    const input = document.querySelector(".search-input");
    const err = document.getElementById("typeError");
    input.classList.remove("error");
    if (err) err.style.display = "none";
}

// 🚀 Inicializar eventos
document.addEventListener("DOMContentLoaded", async () => {
    const btnBuscarTodos = document.querySelector(".btn.btn-secondary");
    const btnBuscar = document.querySelector(".btn:not(.btn-secondary)");
    const inputType = document.querySelector(".search-input");

    // 1️⃣ Cargar 100 Pokémon al iniciar, pero sin mostrarlos
    originalPokemons = await getPokemons(100, 0);
    console.log("Pokémon precargados:", originalPokemons);

    // Botón para mostrar todos
    btnBuscarTodos.addEventListener("click", () => {
        clearTypeError();
        currentPage = 1;
        allPokemons = originalPokemons.slice();
        showPage(currentPage);
    });

    // Botón para buscar por tipo
    btnBuscar.addEventListener("click", () => {
        const tipo = inputType.value.trim().toLowerCase();

        if (!tipo) {
            showTypeError('Ingresa un tipo (ej: "fire", "water", "grass")');
            allPokemons = [];
            currentPage = 1;
            showPage(currentPage);
            return;
        }

        clearTypeError();

        const filtrados = filterByType(tipo);
        currentPage = 1;
        allPokemons = filtrados;
        showPage(currentPage);

        if (filtrados.length === 0) {
            showTypeError(`No se encontraron Pokémon de tipo "${tipo}".`);
        }
    });

    // Eventos de paginación
    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        const maxPage = Math.ceil(allPokemons.length / perPage);
        if (currentPage < maxPage) {
            currentPage++;
            showPage(currentPage);
        }
    });
});
