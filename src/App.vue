<template>
  <div class="wrap">
    <AppTopbar />
 
    <button class="btn-new" @click="store.showNewModal = true">
      <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
      </svg>
      Enviar nuevo manuscrito
    </button>
 
    <ManuscriptList />
  </div>
 
  <NewManuscriptModal />
  <ToastContainer />
</template>
 
<script setup>
import { useAuthorStore } from '@/stores'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import AppTopbar from '@/components/AppTopbar.vue'
import ManuscriptList from '@/components/ManuscriptList.vue'
import NewManuscriptModal from '@/components/NewManuscriptModal.vue'
import ToastContainer from '@/components/ToastContainer.vue'
 
const store = useAuthorStore()
useKeyboardShortcuts()
</script>
 
<style scoped>
.wrap {
  max-width: 660px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}
.btn-new {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 11px 20px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 32px;
  transition: opacity .15s;
}
.btn-new:hover { opacity: .87; }
@media (max-width: 480px) {
  .wrap { padding: 18px 14px 48px; }
}
</style>