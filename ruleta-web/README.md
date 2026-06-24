# Ruleta de Premios — versión responsive

Proyecto visual sin backend, construido con HTML, CSS y JavaScript.

## Cambios incluidos

- Ruleta adaptable por ancho y altura disponible.
- Corrección de textos, flecha y botones que podían superponerse.
- Panel lateral cerrado por defecto en celulares.
- Menú móvil con fondo de cierre.
- Ajustes específicos para orientación horizontal y pantallas de poca altura.
- Modal accesible con `hidden` e `inert`.
- Validación de las tres imágenes.
- Números aleatorios mediante `crypto.getRandomValues` cuando está disponible.
- Menos confeti en celulares para mejorar el rendimiento.
- Textos largos ajustados automáticamente.
- Dimensiones declaradas en las imágenes para evitar saltos al cargar.

## Uso

1. Abre `ruleta-web/index.html` con Live Server.
2. Presiona el centro de la ruleta, el botón lateral o la barra espaciadora.
3. Los resultados se guardan en `localStorage`.
