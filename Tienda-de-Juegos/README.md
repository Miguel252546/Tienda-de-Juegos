# 🎮 Tienda de Juegos - GameStore

Una tienda online de videojuegos moderna, completa y profesional construida con React, TypeScript, Vite y Tailwind CSS.

## ✨ Características

### Funcionalidades Principales

- 🏠 **Home / Hero**: Banner con promociones, CTA y slider de lanzamientos
- 📂 **Categorías Dinámicas**: Acción, estrategia, aventura, terror, deportes, simulación, indie, 18+ (con verificación de edad)
- 🛍️ **Catálogo de Productos**: Cards con imagen, título, descripción, edad, plataforma, etiquetas, precio, rating, stock
- 🔍 **Búsqueda y Filtros Avanzados**: Por categoría, plataforma, precio, calificación, etiqueta y búsqueda por texto
- 📄 **Página de Producto**: Galería de imágenes, descripción larga, especificaciones, requisitos, reviews y productos similares
- 🛒 **Carrito Interactivo**: Sidebar con items, edición de cantidad, subtotal, impuestos y envío
- 💳 **Checkout Simulado**: Formulario completo con información de envío y pago (simulado)
- 👤 **Autenticación**: Login/register con persistencia local y soporte para "continuar como invitado"
- ❤️ **Wishlist / Favoritos**: Lista de deseos persistente
- ⭐ **Valoraciones y Reseñas**: Sistema de reviews con calificación y comentarios
- 🔧 **Panel Administrativo**: CRUD de productos, gestión de categorías, ver pedidos (requiere login admin)
- 🌍 **Internacionalización**: Soporte para Español e Inglés con selector de idioma
- 🔞 **Control de Edad**: Verificación de edad para contenido 18+

### Características Técnicas

- 📱 **100% Responsive**: Mobile-first design con breakpoints optimizados
- ♿ **Accesibilidad (A11y)**: Roles ARIA, focus visible, contrastes WCAG AA, alt en imágenes
- ⚡ **Performance**: Lazy loading de imágenes, code-splitting, compresión
- 🔍 **SEO Optimizado**: Meta tags dinámicos, Open Graph, JSON-LD (Schema.org)
- 📱 **PWA Ready**: Manifest.json y service worker para cache básico
- 🎨 **Tema Oscuro/Claro**: Toggle de tema con persistencia
- 🎭 **Animaciones**: Microinteracciones con Framer Motion y Swiper.js
- 🧪 **Tests**: Unitarios con Jest y Testing Library

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Miguel252546/Tienda-de-Juegos.git
   cd Tienda-de-Juegos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en http://localhost:5173

# Build para producción
npm run build        # Genera build optimizado en /dist

# Preview del build
npm run preview      # Previsualiza el build de producción

# Tests
npm test             # Ejecuta tests unitarios
npm run test:watch   # Ejecuta tests en modo watch

# Linting
npm run lint         # Ejecuta ESLint
```

## 🏗️ Estructura del Proyecto

```
Tienda-de-Juegos/
├── public/                 # Archivos estáticos
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/        # Componentes React
│   │   ├── AgeVerification/
│   │   ├── Cart/
│   │   ├── LanguageSelector/
│   │   ├── Layout/
│   │   ├── ProductCard/
│   │   └── Toast/
│   ├── data/              # Datos de ejemplo (JSON)
│   │   └── products.json
│   ├── i18n/              # Internacionalización
│   │   ├── locales/
│   │   └── config.ts
│   ├── pages/             # Páginas principales
│   │   ├── Admin.tsx
│   │   ├── Cart.tsx
│   │   ├── Catalog.tsx
│   │   ├── Checkout.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── ProductDetail.tsx
│   ├── store/             # Zustand stores
│   │   ├── ageVerificationStore.ts
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   ├── filterStore.ts
│   │   ├── themeStore.ts
│   │   ├── toastStore.ts
│   │   └── wishlistStore.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── __tests__/         # Tests unitarios
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎨 Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Routing
- **Zustand** - State management
- **Tailwind CSS** - Estilos utility-first
- **Swiper.js** - Sliders y carruseles
- **Framer Motion** - Animaciones
- **React i18next** - Internacionalización
- **React Helmet Async** - SEO meta tags
- **Lucide React** - Iconos
- **Jest** - Testing framework
- **Testing Library** - Testing utilities

## 📦 Datos de Ejemplo

El proyecto incluye un archivo `src/data/products.json` con 30 juegos de ejemplo con toda la información necesaria:
- Títulos, descripciones, imágenes
- Categorías, plataformas, etiquetas
- Precios, stock, ratings
- Especificaciones técnicas
- Y más...

## 🔐 Autenticación y Roles

### Usuario Normal
- Ver catálogo
- Agregar al carrito
- Comprar (simulado)
- Escribir reviews

### Usuario Admin
Para acceder al panel admin, crea un usuario con rol 'admin' en el localStorage o modifica el código.

**Nota**: En producción, esto debería manejarse con un backend real y JWT.

## 🌐 Internacionalización

El proyecto soporta dos idiomas:
- 🇪🇸 Español (por defecto)
- 🇬🇧 Inglés

El idioma se puede cambiar desde el selector en el header y se persiste en localStorage.

## 🎯 Próximas Mejoras

- [ ] Integración con Algolia para búsqueda avanzada
- [ ] Integración con Stripe para pagos reales
- [ ] Sistema de cupones y descuentos
- [ ] Comparador de juegos
- [ ] Videos/trailers embebidos
- [ ] Recomendaciones basadas en ML
- [ ] Modo offline completo (PWA)
- [ ] Analytics (Google Analytics / Plausible)

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Coverage
npm test -- --coverage
```

## 📱 PWA

El proyecto está configurado como PWA con:
- Manifest.json
- Service Worker (vite-plugin-pwa)
- Cache de recursos estáticos

Para instalar como app:
1. Abre la app en un navegador compatible
2. Busca la opción "Añadir a pantalla de inicio"
3. La app se instalará como una aplicación nativa

## 🚀 Deploy

### Netlify

1. Conecta tu repositorio a Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Conecta tu repositorio a Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages

```bash
npm run build
# Sube la carpeta dist a GitHub Pages
```

## 📄 Licencia

Este proyecto es personal y está disponible para uso educativo.

## 👤 Autor

**Miguel**

- GitHub: [@Miguel252546](https://github.com/Miguel252546)

## 🙏 Agradecimientos

- React Team
- Vite Team
- Tailwind CSS
- Todas las librerías open source utilizadas

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
