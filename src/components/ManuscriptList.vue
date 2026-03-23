<template>
  <div>
    <div class="section-label">Mis manuscritos</div>
 
    <div v-if="store.manuscripts.length === 0" class="empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125
             0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0
             12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125
             1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0
             1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
      </svg>
      <div class="empty-title">Aún no tienes manuscritos enviados</div>
      <div class="empty-sub">Usa el botón de arriba para agregar tu primer trabajo.</div>
    </div>
 
    <div v-else class="ms-list">
      <div v-for="ms in store.manuscripts" :key="ms.id" class="ms-row">
        <div class="ms-info">
          <div class="ms-title">{{ ms.title }}</div>
          <div class="ms-date">{{ ms.date }}</div>
        </div>
        <span class="badge" :class="badgeClass(ms.status)">{{ ms.status }}</span>
        <button class="btn-delete" @click="store.removeManuscript(ms.id)" title="Eliminar">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { useAuthorStore } from '@/stores'
const store = useAuthorStore()
 
const badgeClass = (s) => ({
  'Enviado':     'b-enviado',
  'En revisión': 'b-revision',
  'Decisión':    'b-decision',
  'Aceptado':    'b-aceptado',
  'Rechazado':   'b-rechazado',
}[s] || 'b-enviado')
</script>
 
<style scoped>
.section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--muted);
  margin-bottom: 10px;
}
.ms-list {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--white);
  margin-bottom: 28px;
}
.ms-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid var(--border);
  transition: background .1s;
}
.ms-row:last-child { border-bottom: none; }
.ms-row:hover { background: var(--light); }
.ms-info { flex: 1; min-width: 0; }
.ms-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}
.ms-date { font-size: 12px; color: var(--muted); }
.badge {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
}
.b-enviado   { background: #eff6ff; color: #1d4ed8; }
.b-revision  { background: #fef9c3; color: #a16207; }
.b-decision  { background: #fff7ed; color: #c2410c; }
.b-aceptado  { background: #f0fdf4; color: #15803d; }
.b-rechazado { background: #fff1f2; color: #be123c; }
 
.btn-delete {
  background: none;
  border: none;
  padding: 4px;
  color: #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color .15s, background .15s;
}
.btn-delete:hover { color: #ef4444; background: #fff1f2; }
 
/* Empty state */
.empty {
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  background: var(--white);
  padding: 52px 24px;
  text-align: center;
  margin-bottom: 28px;
}
.empty svg { color: #d4d4d8; margin-bottom: 14px; }
.empty-title { font-size: 15px; font-weight: 500; margin-bottom: 6px; }
.empty-sub { font-size: 13px; color: var(--muted); }
</style>