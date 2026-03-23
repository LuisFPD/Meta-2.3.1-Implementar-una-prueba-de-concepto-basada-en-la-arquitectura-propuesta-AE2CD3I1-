<template>
  <button class="nav-item" :class="{ active }" @click="$emit('click')">
    <component :is="iconComponent" class="nav-icon" />
    <span>{{ label }}</span>
    <span v-if="badge" class="nav-badge">{{ badge }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  label: String,
  active: Boolean,
  badge: [Number, String, null]
})

defineEmits(['click'])

// Inline SVG icon map
const icons = {
  dashboard: {
    render() {
      return h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', class: 'nav-icon' }, [
        h('path', { d: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' })
      ])
    }
  },
  document: {
    render() {
      return h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', class: 'nav-icon' }, [
        h('path', { 'fill-rule': 'evenodd', d: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z', 'clip-rule': 'evenodd' })
      ])
    }
  },
  bell: {
    render() {
      return h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', class: 'nav-icon' }, [
        h('path', { d: 'M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' })
      ])
    }
  },
  chat: {
    render() {
      return h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', class: 'nav-icon' }, [
        h('path', { 'fill-rule': 'evenodd', d: 'M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z', 'clip-rule': 'evenodd' })
      ])
    }
  },
  calendar: {
    render() {
      return h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', class: 'nav-icon' }, [
        h('path', { 'fill-rule': 'evenodd', d: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', 'clip-rule': 'evenodd' })
      ])
    }
  },
  settings: {
    render() {
      return h('svg', { viewBox: '0 0 20 20', fill: 'currentColor', class: 'nav-icon' }, [
        h('path', { 'fill-rule': 'evenodd', d: 'M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z', 'clip-rule': 'evenodd' })
      ])
    }
  }
}

import { h } from 'vue'
const iconComponent = computed(() => icons[props.icon] || icons.document)
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted);
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  transition: all 0.15s;
}

.nav-item:hover {
  background: var(--surface-2);
  color: var(--text);
}

.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 500;
}

.nav-icon {
  width: 18px; height: 18px;
  flex-shrink: 0;
  opacity: 0.8;
}

.nav-badge {
  margin-left: auto;
  background: var(--accent);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 100px;
  min-width: 20px;
  text-align: center;
}
</style>
