# Dashboard del Revisor

Dashboard Vue 3 para el rol de **Revisor** del sistema de revisión por pares.

## Estructura de componentes

```
src/
├── App.vue                        # Raíz — monta ReviewerDashboard
├── main.js                        # Entrada: Vue + Pinia
├── style.css                      # Variables CSS y estilos globales
├── stores/
│   └── index.js                   # Pinia store (useReviewerStore)
│                                  #   invitations, activeReviews, completedReviews
│                                  #   acceptInvitation(), declineInvitation()
└── components/
    ├── ReviewerDashboard.vue      # Vista principal — 3 secciones
    ├── InvitationCard.vue         # Tarjeta de invitación (props + emits)
    ├── DeadlineBar.vue            # Badge de días restantes con color urgencia
    └── ToastContainer.vue         # Notificaciones flotantes
```

## Criterios implementados

| Criterio | Implementación |
|---|---|
| Props, slots y emit | `InvitationCard` recibe `invitation` (prop), expone un slot default, y emite `accept` / `decline` |
| `v-for` + `v-if` | Todas las listas usan `v-for`; estados vacíos y offline usan `v-if` |
| Vista `ReviewerDashboard.vue` | Secciones: Invitaciones / En curso / Completadas |
| `InvitationCard.vue` | Botones Aceptar / Declinar (sin lógica interna) |
| `DeadlineBar.vue` | Props: `daysLeft`. Clases: `urgent` (<3 días) / `warning` (<7) / `ok` |
| Datos estáticos | Todo en `stores/index.js` — fácil de reemplazar por API |

## Iniciar

```bash
npm install
npm run dev
# → http://localhost:5176
```
