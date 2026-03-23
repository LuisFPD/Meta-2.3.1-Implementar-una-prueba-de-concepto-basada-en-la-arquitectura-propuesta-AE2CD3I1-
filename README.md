# PeerReview AI — Panel del Autor
 
Dashboard minimalista para el Autor del sistema de revisión por pares.
 
## Características
 
- **Lista de manuscritos** con título, fecha de envío y estado (Enviado / En revisión / Decisión / Aceptado / Rechazado)
- **Botón prominente** "+ Enviar nuevo manuscrito" con modal de envío
- **Estado vacío** con mensaje invitando al primer envío
- **Notificaciones recientes** con indicador de leído/no leído
- **100% responsive**: funciona igual en móvil y escritorio
- Estilo claro, simple y minimalista
 
## Uso rápido
 
Abre `index-standalone.html` en el navegador — no requiere servidor.
 
## Acento de color
 
Autor → **azul** (`#2563eb`)
 
## Estructura del proyecto Vite
 
```
dashboard-autor/
├── index-standalone.html   ← Todo-en-uno (Vue CDN, sin build)
├── index.html
├── vite.config.js
├── package.json
└── README.md
```
 