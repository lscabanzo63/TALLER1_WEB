# 🔍 Buscador de Pokémon por Tipo

Este proyecto es una aplicación web simple que permite a los usuarios buscar y visualizar una lista de Pokémon, con la capacidad de filtrar por tipo. La interfaz es intuitiva y muestra las tarjetas de Pokémon con su nombre, imagen y tipos, junto con una funcionalidad de paginación para navegar a través de los resultados.

---

## 💻 Tecnologías y API

El proyecto está construido con **HTML**, **CSS** y **JavaScript** puro, sin el uso de frameworks o librerías externas.

La información de los Pokémon se obtiene de la **PokeAPI**, una API RESTful que proporciona datos extensos sobre todos los Pokémon. Específicamente, se usa el endpoint `https://pokeapi.co/api/v2/pokemon` para obtener la lista y los detalles de cada criatura.

---

## ⚙️ ¿Cómo correr el proyecto?

Para ejecutar este proyecto, no se requiere ninguna instalación especial. Solo necesitas un navegador web moderno.

1.  **Clonar el repositorio** (si aplica) o descargar los archivos `index.html`, `styles.css` y `app.js`.
2.  **Abrir el archivo `index.html`** en tu navegador preferido.

El navegador cargará automáticamente el archivo HTML, aplicará los estilos CSS y ejecutará el script de JavaScript para mostrar y gestionar el contenido dinámico.

---

## ♿ Principios de Accesibilidad (ARIA)

Aunque no se implementaron atributos ARIA explícitos en este proyecto, se consideraron varios principios de accesibilidad clave:

* **HTML Semántico**: Se utiliza una estructura de etiquetas HTML semánticas (`<header>`, `<main>`, `<nav>`, `<ul>`, `<li>`, `<img>`, `<button>`) para dar un significado claro al contenido, lo que facilita la navegación con tecnologías asistivas.
* **Contraste de Color**: Se eligieron colores con un contraste suficiente (como el blanco sobre un fondo verde en los botones) para mejorar la legibilidad para usuarios con baja visión.
* **Texto Alternativo en Imágenes**: La etiqueta `<img>` incluye el atributo `alt` (`alt="Logo"` y `alt="Placeholder Pokémon"`), que describe la imagen para los usuarios que no pueden verla, incluyendo aquellos que usan lectores de pantalla.
* **Navegación con Teclado**: La interfaz, incluyendo los botones y el campo de búsqueda, es navegable usando solo el teclado, lo que es crucial para la accesibilidad.