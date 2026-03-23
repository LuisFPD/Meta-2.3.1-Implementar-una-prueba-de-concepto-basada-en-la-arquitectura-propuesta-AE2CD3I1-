# Panel del Editor Jefe

## Uso rápido
Abre `index-standalone.html` directamente en el navegador (requiere internet para cargar Vue/Pinia).

## Desarrollo
```bash
npm install
npm run dev
```

## Datos
Los datos se cargan desde `store.manuscritos` y `store.editores` en el store de Pinia.
Conecta tu API asignando los arrays correspondientes con la siguiente estructura:

```js
// Manuscrito
{ id, titulo, estado, editor_id, editor_nombre, ultimo_movimiento }
// estados: 'en_proceso' | 'aceptado' | 'rechazado'

// Editor
{ id, nombre, area, completados }
```
