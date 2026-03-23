<template>
  <div
    class="manuscript-card"
    :class="`stripe-${statusKey}`"
    @click="ui.openDetail(manuscript)"
  >
    <!-- Top row -->
    <div class="mc-top">
      <div class="mc-title">{{ manuscript.title }}</div>
      <StatusBadge :status="manuscript.status" />
    </div>

    <!-- Meta row -->
    <div class="mc-meta">
      <div class="mc-meta-item">
        <CalendarIcon />
        {{ formatDate(manuscript.submittedAt) }}
      </div>
      <div v-if="manuscript.reviewers.assigned > 0" class="mc-meta-item">
        <UsersIcon />
        {{ manuscript.reviewers.assigned }} revisores asignados
      </div>
      <div v-if="manuscript.deadline" class="mc-meta-item">
        <ClockIcon />
        Vence: {{ formatDate(manuscript.deadline) }}
      </div>
      <div v-if="manuscript.actionRequired" class="mc-meta-item action-required">
        <WarnIcon />
        Acción requerida
      </div>
      <div v-if="manuscript.status === 'Aceptado'" class="mc-meta-item accepted">
        <CheckIcon />
        Publicación confirmada
      </div>
    </div>

    <!-- Progress for "En revisión" -->
    <div v-if="manuscript.status === 'En revisión'" class="review-progress">
      <div class="rp-label">
        <span>Revisiones</span>
        <span>{{ manuscript.reviewers.completed }}/{{ manuscript.reviewers.assigned }}</span>
      </div>
      <div class="rp-bar">
        <div
          class="rp-fill"
          :style="{ width: reviewProgress + '%' }"
        ></div>
      </div>
    </div>

    <!-- Actions row -->
    <div class="mc-actions" @click.stop>
      <template v-if="manuscript.status === 'Decisión'">
        <button class="mc-btn mc-btn-warning" @click="ui.openDetail(manuscript)">
          Revisar comentarios
        </button>
        <button class="mc-btn" @click="handleUploadRevision">
          Cargar revisión
        </button>
      </template>
      <template v-else-if="manuscript.status === 'Aceptado'">
        <button class="mc-btn" @click="ui.openDetail(manuscript)">
          Ver carta de aceptación
        </button>
        <button class="mc-btn" @click="handleDownload">
          Descargar prueba
        </button>
      </template>
      <template v-else-if="manuscript.status === 'Enviado'">
        <button class="mc-btn" @click="ui.openDetail(manuscript)">
          Ver detalles
        </button>
        <button class="mc-btn mc-btn-danger" @click="handleWithdraw">
          Retirar envío
        </button>
      </template>
      <template v-else>
        <button class="mc-btn" @click="ui.openDetail(manuscript)">
          Ver detalles
        </button>
        <button class="mc-btn" @click="handleDownload">
          Ver versión
        </button>
      </template>

      <div v-if="manuscript.reviewers.completed > 0" class="mc-review-info">
        {{ manuscript.reviewers.completed }}/{{ manuscript.reviewers.assigned }} revisiones recibidas
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'
import { useUIStore, useManuscriptStore, useNotificationStore } from '@/stores'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  manuscript: { type: Object, required: true }
})

const ui   = useUIStore()
const ms   = useManuscriptStore()
const notif = useNotificationStore()

const statusKey = computed(() => ({
  'Enviado': 'enviado', 'En revisión': 'revision',
  'Decisión': 'decision', 'Aceptado': 'aceptado', 'Rechazado': 'rechazado'
})[props.manuscript.status] ?? '')

const reviewProgress = computed(() => {
  const { assigned, completed } = props.manuscript.reviewers
  return assigned ? Math.round((completed / assigned) * 100) : 0
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`
}

function handleWithdraw() {
  if (confirm(`¿Retirar el envío de "${props.manuscript.title}"?`)) {
    ms.manuscripts.splice(ms.manuscripts.findIndex(m => m.id === props.manuscript.id), 1)
    notif.addNotification({ type: 'info', text: `El manuscrito "${props.manuscript.title.slice(0, 50)}..." fue retirado.` })
    ui.showToast('Envío retirado correctamente.')
  }
}

function handleDownload() {
  ui.showToast('Preparando descarga…', 'info')
}

function handleUploadRevision() {
  ui.showToast('Función de carga de revisión disponible próximamente.', 'info')
}

// ── Inline icon components ─────────────────────────────────────────
const CalendarIcon = () => h('svg', { width: 12, height: 12, viewBox: '0 0 20 20', fill: 'currentColor' },
  [h('path', { 'fill-rule': 'evenodd', d: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', 'clip-rule': 'evenodd' })])

const UsersIcon = () => h('svg', { width: 12, height: 12, viewBox: '0 0 20 20', fill: 'currentColor' },
  [h('path', { d: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' })])

const ClockIcon = () => h('svg', { width: 12, height: 12, viewBox: '0 0 20 20', fill: 'currentColor' },
  [h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z', 'clip-rule': 'evenodd' })])

const WarnIcon = () => h('svg', { width: 12, height: 12, viewBox: '0 0 20 20', fill: 'currentColor' },
  [h('path', { 'fill-rule': 'evenodd', d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z', 'clip-rule': 'evenodd' })])

const CheckIcon = () => h('svg', { width: 12, height: 12, viewBox: '0 0 20 20', fill: 'currentColor' },
  [h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', 'clip-rule': 'evenodd' })])
</script>

<style scoped>
.manuscript-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.manuscript-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  border-radius: 3px 0 0 3px;
}

.stripe-enviado::before   { background: var(--blue); }
.stripe-revision::before  { background: var(--yellow); }
.stripe-decision::before  { background: var(--orange); }
.stripe-aceptado::before  { background: var(--green); }
.stripe-rechazado::before { background: var(--red); }

.manuscript-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.mc-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.mc-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  flex: 1;
}

.mc-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.mc-meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-muted);
}

.action-required { color: var(--orange) !important; }
.accepted        { color: var(--green) !important; }

/* Progress bar */
.review-progress { margin-top: 12px; }
.rp-label {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 5px;
}
.rp-bar {
  height: 3px;
  background: var(--surface-2);
  border-radius: 3px;
  overflow: hidden;
}
.rp-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--yellow), var(--orange));
  border-radius: 3px;
  transition: width 0.6s ease;
}

/* Actions */
.mc-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.mc-btn {
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  transition: all 0.15s;
}

.mc-btn:hover {
  border-color: var(--border-hover);
  color: var(--text);
  background: var(--surface-2);
}

.mc-btn-warning {
  color: var(--orange) !important;
  border-color: var(--orange) !important;
  background: var(--orange-soft) !important;
}

.mc-btn-danger {
  color: var(--red) !important;
  border-color: var(--red) !important;
  background: var(--red-soft) !important;
}

.mc-review-info {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-dim);
}
</style>
