import { ref } from 'vue'
import { defineStore } from 'pinia'
 
export const useAuthorStore = defineStore('author', () => {
  const manuscripts = ref([
    { id: 1, title: 'Prueba de artículo enviado',     date: '01/04/2025', status: 'Enviado' },
    { id: 2, title: 'Prueba de artículo en revisión', date: '15/03/2025', status: 'En revisión' },
    { id: 3, title: 'Prueba de artículo en decisión', date: '02/02/2025', status: 'Decisión' },
    { id: 4, title: 'Prueba de artículo aceptado',    date: '18/01/2025', status: 'Aceptado' },
    { id: 5, title: 'Prueba de artículo rechazado',   date: '05/12/2024', status: 'Rechazado' },
  ])
 
  const toasts = ref([])
  const showNewModal = ref(false)
 
  function addManuscript(title, status, date) {
    manuscripts.value.unshift({ id: Date.now(), title, status, date })
    pushToast('Manuscrito agregado')
  }
 
  function removeManuscript(id) {
    manuscripts.value = manuscripts.value.filter(m => m.id !== id)
    pushToast('Manuscrito eliminado')
  }
 
  function pushToast(msg) {
    const id = Date.now()
    toasts.value.push({ id, msg })
    setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 3000)
  }
 
  return { manuscripts, toasts, showNewModal, addManuscript, removeManuscript, pushToast }
})