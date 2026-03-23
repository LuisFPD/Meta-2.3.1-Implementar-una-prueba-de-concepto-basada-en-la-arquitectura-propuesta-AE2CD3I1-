<template>
  <div>
    <div class="section-label">Notificaciones recientes</div>
    <div class="notif-list">
      <div v-for="n in store.notifications" :key="n.id" class="notif-row">
        <div class="notif-dot" :class="n.read ? 'nd-read' : 'nd-unread'"></div>
        <div class="notif-text">{{ n.text }}</div>
        <div class="notif-time">{{ n.time }}</div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { useAuthorStore } from '@/stores'
const store = useAuthorStore()
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
.notif-list {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--white);
}
.notif-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}
.notif-row:last-child { border-bottom: none; }
.notif-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}
.nd-unread { background: var(--blue); }
.nd-read   { background: var(--border); }
.notif-text {
  flex: 1;
  font-size: 13px;
  color: var(--text);
  line-height: 1.45;
}
.notif-time {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
}
</style>