# 🚀 Instrucciones para Ejecutar el Proyecto

## Pasos para iniciar el proyecto

### 1. Instalar dependencias (si no lo has hecho)
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm run dev
```

### 3. Abrir en el navegador
El servidor se iniciará automáticamente en:
- **URL Local**: http://localhost:5173
- El navegador se abrirá automáticamente

## ⚠️ Nota Importante

**NO uses Live Server (puerto 5500)**. Este proyecto usa **Vite** que corre en el puerto **5173**.

Si ves `127.0.0.1:5500` en tu navegador, cierra esa pestaña y abre:
- http://localhost:5173

## Comandos Disponibles

```bash
# Desarrollo (puerto 5173)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Tests
npm test

# Linting
npm run lint
```

## Solución de Problemas

### Si el puerto 5173 está ocupado:
Vite automáticamente usará el siguiente puerto disponible (5174, 5175, etc.)

### Si hay errores de módulos no encontrados:
```bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install
```

### En Windows PowerShell:
```powershell
# Elimina node_modules
Remove-Item -Recurse -Force node_modules
npm install
```

## Estructura del Proyecto

```
Tienda-de-Juegos/
├── src/           # Código fuente
├── public/        # Archivos públicos
├── dist/          # Build de producción (se genera con npm run build)
└── node_modules/  # Dependencias (se genera con npm install)
```

## ¡Listo!

Una vez que ejecutes `npm run dev`, la aplicación estará disponible en http://localhost:5173

