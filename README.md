# Carta Para Monica :3

> Una carta de amor interactiva con estética vintage, construida en React + Vite. Un espacio personalizado y cifrado, creado especialmente para aquella persona especial.

---

## Características

- **Reto de acceso** con dos capas de seguridad: respuesta libre + cifrado Vigenère
- **Carta personal** con tipografía estilo diario
- **Galería de momentos** con fotos reales en un tablero de corcho interactivo (arrastrables + efecto scratch)
- **Reproductor de música propio** con disco de vinilo animado y brazo tocadiscos
- **Detalles personales** y mensaje final
- **Estética** vintage / scrapbook con animaciones fluidas (Framer Motion)
- **Aviso** de uso exclusivo en desktop

---

## Tech Stack

| Tecnología | Uso |
|---|---|
| React 19 | UI y lógica de componentes |
| Vite 8 | Bundler y dev server |
| Tailwind CSS v4 | Utilidades de estilos |
| Framer Motion | Animaciones y transiciones |
| React Router v7 | Navegación entre secciones |
| Lucide React | Iconos |

---

## Estructura del proyecto

```
cartapara/
├── public/
│   ├── photos/          # Fotos personales (01.jpg – 06.jpg)
│   ├── vintage/         # Ilustraciones decorativas
│   ├── song.mp3         # Canción de fondo
│   └── ...              # Otras imágenes (violin, lip, moon...)
├── src/
│   ├── components/      # Cada sección es un componente
│   │   ├── Welcome.jsx
│   │   ├── Challenge.jsx
│   │   ├── Letter.jsx
│   │   ├── Moments.jsx
│   │   ├── Music.jsx
│   │   ├── Details.jsx
│   │   ├── Final.jsx
│   │   └── Farewell.jsx
│   ├── data/
│   │   └── content.js   # Todo el contenido de texto editable
│   ├── App.jsx
│   └── index.css
├── vite.config.js
└── package.json
```

---

## Instalación y desarrollo local

```bash
# 1. Clona el repositorio
git clone https://github.com/yatwa/cartapara.git
cd cartapara

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173/cartapara/](http://localhost:5173/cartapara/) en tu navegador.

---

## Deploy en GitHub Pages

### Primera vez (configuración):
1. Asegúrate de que tu repositorio en GitHub se llama `cartapara`.
2. Ve a **Settings → Pages → Source** y selecciona la rama **`gh-pages`**.

### Publicar / actualizar:
```bash
npm run deploy
```

Esto hace automáticamente:
1. **Build** del proyecto (`npm run build`)
2. **Sube** la carpeta `dist/` a la rama `gh-pages`

Tu carta quedará disponible en (ejemplo):
**https://yatwa.github.io/cartapara/**

---

## Personalización

Todo el contenido editable está centralizado en `src/data/content.js`:
- Textos de la carta
- Captions de las fotos
- Respuestas del reto de acceso
- Mensaje final

Las fotos personales van en `public/photos/` con nombres `01.jpg` a `06.jpg`.
La canción va en `public/song.mp3`.

---

*Hecho con ❤️ por Andrés*
