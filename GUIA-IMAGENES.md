# 📸 Guía para Agregar Imágenes

## ✅ Solución Aplicada

He corregido la configuración para que las imágenes funcionen correctamente:

1. ✅ **Carpeta creada**: `public/img/`
2. ✅ **Imagen copiada**: `public/img/CyberPunk.jpeg`
3. ✅ **Ruta corregida en JSON**: `/img/CyberPunk.jpeg`
4. ✅ **Formato corregido**: `images` ahora es un array

## 📁 Estructura Correcta

```
Tienda-de-Juegos/
├── public/
│   └── img/
│       └── CyberPunk.jpeg  ✅ (Aquí deben ir las imágenes)
└── src/
    └── data/
        └── products.json
```

## 🔧 Cómo Agregar Más Imágenes

### Paso 1: Coloca la imagen en `public/img/`
```
public/img/tu-imagen.jpg
```

### Paso 2: Actualiza `products.json`
```json
{
  "id": "1",
  "images": [
    "/img/tu-imagen.jpg"
  ]
}
```

**Importante:**
- ✅ La ruta debe empezar con `/` (no `./`)
- ✅ `images` debe ser un **array** `[]`, no un string
- ✅ Las imágenes en `public/` se sirven desde la raíz `/`

## 🔍 Verificar que Funciona

1. **Reinicia el servidor** (si está corriendo):
   ```bash
   # Detén el servidor (Ctrl+C) y vuelve a iniciarlo
   npm run dev
   ```

2. **Limpia la caché del navegador**:
   - Presiona `Ctrl + Shift + R` (Windows/Linux)
   - O `Cmd + Shift + R` (Mac)

3. **Verifica la consola del navegador**:
   - Abre las DevTools (F12)
   - Ve a la pestaña "Network"
   - Busca la solicitud de la imagen
   - Debe mostrar estado 200 (éxito)

## 🐛 Si la Imagen No Se Ve

### Verifica:
1. ✅ El archivo existe en `public/img/`
2. ✅ La ruta en JSON es `/img/nombre-archivo.ext`
3. ✅ `images` es un array: `["/img/imagen.jpg"]`
4. ✅ El servidor se reinició después de agregar la imagen
5. ✅ La caché del navegador se limpió

### Debug:
Abre la consola del navegador (F12) y busca errores como:
- `404 (Not Found)` - La ruta es incorrecta
- `Failed to load resource` - El archivo no existe

## 📝 Ejemplo Completo

```json
{
  "id": "1",
  "title": "Mi Juego",
  "images": [
    "/img/juego-principal.jpg",
    "/img/juego-2.jpg"
  ]
}
```

## 💡 Tips

- **Formatos soportados**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- **Tamaño recomendado**: 800x600px o mayor (para mejor calidad)
- **Optimización**: Comprime las imágenes antes de agregarlas
- **Múltiples imágenes**: Puedes agregar varias imágenes en el array

## ✅ Estado Actual

- ✅ Carpeta `public/img/` creada
- ✅ Imagen `CyberPunk.jpeg` copiada
- ✅ Ruta en JSON corregida a `/img/CyberPunk.jpeg`
- ✅ Formato cambiado a array
- ✅ Manejo de errores agregado en componentes

**¡La imagen debería verse ahora!** 🎉

Si aún no se ve, reinicia el servidor y limpia la caché del navegador.

