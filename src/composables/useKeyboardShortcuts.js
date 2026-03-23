import { onMounted, onUnmounted } from 'vue'
import { useAuthorStore } from '@/stores'
 
export function useKeyboardShortcuts() {
  const store = useAuthorStore()
 
  function onKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault()
      store.showNewModal = true
    }
    if (e.key === 'Escape') {
      store.showNewModal = false
    }
  }
 
  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
}