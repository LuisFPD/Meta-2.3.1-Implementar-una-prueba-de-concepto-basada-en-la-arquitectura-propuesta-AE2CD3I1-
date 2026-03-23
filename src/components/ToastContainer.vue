<template>
  <div class="toast-wrap">
    <TransitionGroup name="toast">
      <div v-for="t in store.toasts" :key="t.id" class="toast">
        {{ t.msg }}
      </div>
    </TransitionGroup>
  </div>
</template>
 
<script setup>
import { useAuthorStore } from '@/stores'
const store = useAuthorStore()
</script>
 
<style scoped>
.toast-wrap {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.toast {
  background: #18181b;
  color: #fff;
  font-size: 13px;
  padding: 10px 18px;
  border-radius: 8px;
  white-space: nowrap;
}
.toast-enter-active, .toast-leave-active { transition: all .25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(8px); }
</style>