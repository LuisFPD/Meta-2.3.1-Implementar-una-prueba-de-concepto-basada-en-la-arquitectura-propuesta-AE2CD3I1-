<template>
  <span class="badge" :class="badgeClass">
    <span class="badge-dot" :style="{ background: dotColor }"></span>
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ status: String })

const config = {
  'Enviado':     { cls: 'badge-enviado',  color: 'var(--blue)' },
  'En revisión': { cls: 'badge-revision', color: 'var(--yellow)' },
  'Decisión':    { cls: 'badge-decision', color: 'var(--orange)' },
  'Aceptado':    { cls: 'badge-aceptado', color: 'var(--green)' },
  'Rechazado':   { cls: 'badge-rechazado',color: 'var(--red)' },
}

const badgeClass = computed(() => config[props.status]?.cls ?? '')
const dotColor   = computed(() => config[props.status]?.color ?? 'var(--text-muted)')
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 100px;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.badge-dot { width: 5px; height: 5px; border-radius: 50%; }
.badge-enviado   { background: var(--blue-soft);   color: var(--blue); }
.badge-revision  { background: var(--yellow-soft); color: var(--yellow); }
.badge-decision  { background: var(--orange-soft); color: var(--orange); }
.badge-aceptado  { background: var(--green-soft);  color: var(--green); }
.badge-rechazado { background: var(--red-soft);    color: var(--red); }
</style>
