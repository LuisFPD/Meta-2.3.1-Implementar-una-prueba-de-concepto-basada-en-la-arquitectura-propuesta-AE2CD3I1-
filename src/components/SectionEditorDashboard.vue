<template>
  <div class="container">
    <h1>Panel del Editor de Sección</h1>

    <!-- Contadores resumen -->
    <div class="counters-grid">
      <div class="counter-card">
        <div class="counter-label">En proceso</div>
        <div class="counter-value c-yellow">{{ contadores.enProceso }}</div>
      </div>
      <div class="counter-card">
        <div class="counter-label">Pendientes de decisión</div>
        <div class="counter-value c-orange">{{ contadores.pendientesDecision }}</div>
      </div>
      <div class="counter-card">
        <div class="counter-label">Listos para decidir</div>
        <div class="counter-value c-green">{{ contadores.listosDecidir }}</div>
      </div>
    </div>

    <!-- Lista de manuscritos -->
    <div class="section-title">Mis manuscritos</div>
    <div class="list-card">
      <div v-if="manuscritos.length === 0" class="empty">
        Sin manuscritos asignados
      </div>
      <div
        v-for="m in manuscritos"
        :key="m.id"
        class="ms-item"
        :class="alertClass(m)"
      >
        <div class="ms-main">
          <div class="ms-title">{{ m.titulo }}</div>
          <div class="ms-meta">
            <span>{{ estadoLabel(m.estado) }}</span>
            <span class="dot">·</span>
            <span>Revisores: {{ m.revisores_asignados }}/{{ m.revisores_requeridos }}</span>
            <span class="dot">·</span>
            <span>Último mov. {{ fmtDate(m.ultimo_movimiento) }}</span>
          </div>
        </div>
        <button class="btn-asignar" @click="$emit('asignar-revisor', m)">
          + Asignar revisor
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  manuscritos: {
    type: Array,
    default: () => []
  }
})

defineEmits(['asignar-revisor'])

const contadores = computed(() => ({
  enProceso:          props.manuscritos.filter(m => m.estado === 'en_proceso').length,
  pendientesDecision: props.manuscritos.filter(m => m.estado === 'pendiente_decision').length,
  listosDecidir:      props.manuscritos.filter(m => m.estado === 'listo_decidir').length,
}))

function alertClass(m) {
  if (m.revisores_asignados === 0)                          return 'alert-sin-revisor'
  if (m.revision_vencida)                                   return 'alert-vencido'
  if (m.estado === 'listo_decidir')                         return 'alert-listo'
  return ''
}

function estadoLabel(estado) {
  const map = {
    en_proceso:          'En proceso',
    pendiente_decision:  'Pendiente de decisión',
    listo_decidir:       'Listo para decidir',
  }
  return map[estado] ?? estado
}

function fmtDate(fecha) {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.container { max-width: 680px; margin: 0 auto; padding: 24px 16px 48px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; color: #111; }

h1 { font-size: 20px; font-weight: 600; margin-bottom: 20px; }

/* Contadores */
.counters-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 28px; }
.counter-card { background: white; border-radius: 10px; padding: 16px; border: 1px solid #e5e5e5; }
.counter-label { font-size: 12px; color: #888; margin-bottom: 6px; }
.counter-value { font-size: 28px; font-weight: 600; }
.c-yellow  { color: #f59e0b; }
.c-orange  { color: #f97316; }
.c-green   { color: #22c55e; }

/* Lista */
.section-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #888; margin-bottom: 8px; }
.list-card { background: white; border-radius: 10px; border: 1px solid #e5e5e5; overflow: hidden; }

.ms-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-bottom: 1px solid #f0f0f0; border-left: 3px solid transparent; }
.ms-item:last-child { border-bottom: none; }

/* Alertas por color */
.alert-sin-revisor { border-left-color: #a78bfa; background: #faf5ff; }
.alert-vencido     { border-left-color: #ef4444; background: #fff5f5; }
.alert-listo       { border-left-color: #22c55e; background: #f0fdf4; }

.ms-main { flex: 1; min-width: 0; }
.ms-title { font-size: 14px; font-weight: 500; line-height: 1.3; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ms-meta { font-size: 12px; color: #888; display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.dot { color: #ccc; }

.btn-asignar { flex-shrink: 0; font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 8px; border: 1px solid #d1d5db; background: white; color: #374151; cursor: pointer; white-space: nowrap; transition: background 0.15s; }
.btn-asignar:hover { background: #f9fafb; }

.empty { padding: 24px 16px; text-align: center; color: #aaa; font-size: 13px; }

@media (max-width: 520px) {
  .counters-grid { grid-template-columns: 1fr 1fr; }
  .counter-value { font-size: 24px; }
  .ms-item { flex-direction: column; align-items: flex-start; }
  .btn-asignar { align-self: flex-end; }
}
</style>
