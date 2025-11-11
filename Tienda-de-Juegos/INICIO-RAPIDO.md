# ⚡ Inicio Rápido

## 🎯 Ejecutar el proyecto en 3 pasos:

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor
```bash
npm run dev
```

### 3. Abrir navegador
El servidor se abrirá automáticamente en:
**http://localhost:5173**

---

## ⚠️ IMPORTANTE

- ❌ **NO uses** `127.0.0.1:5500` (Live Server)
- ✅ **USA** `http://localhost:5173` (Vite)

---

## 🐛 Si no funciona:

1. **Verifica que Node.js esté instalado:**
   ```bash
   node --version
   ```
   Debe ser versión 18 o superior

2. **Reinstala dependencias:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Verifica el puerto:**
   Si el puerto 5173 está ocupado, Vite usará el siguiente disponible (5174, 5175, etc.)
   Revisa la consola para ver qué puerto está usando

---

## 📝 Comandos útiles:

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview del build
npm test         # Tests
```

---

## ✅ Listo!

Una vez que veas en la consola:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

¡Abre http://localhost:5173 en tu navegador!

