<template>
  <Transition name="fade">
    <div v-if="store.showNewModal" class="overlay" @click.self="close">
      <div class="modal">
        <div class="modal-title">Nuevo manuscrito</div>
        <div class="modal-sub">Completa los campos para agregar el manuscrito.</div>
 
        <div class="field">
          <label>Nombre del manuscrito</label>
          <input v-model="form.title" placeholder="Título del manuscrito" maxlength="150" @keyup.enter="submit"/>
        </div>
        <div class="field">
          <label>Estado de revisión</label>
          <select v-model="form.status">
            <option value="" disabled>Seleccionar estado…</option>
            <option>Enviado</option>
            <option>En revisión</option>
            <option>Decisión</option>
            <option>Aceptado</option>
            <option>Rechazado</option>
          </select>
        </div>
        <div class="field">
          <label>Fecha</label>
          <input v-model="form.date" type="date"/>
        </div>
 
        <div class="actions">
          <button class="btn-cancel" @click="close">Cancelar</button>
          <button class="btn-submit" :disabled="!canSubmit" @click="submit">Agregar</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
 
<script setup>
import { reactive, computed } from 'vue'
import { useAuthorStore } from '@/stores'
 
const store = useAuthorStore()
const form = reactive({ title: '', status: '', date: '' })
 
const canSubmit = computed(() => form.title.trim() && form.status && form.date)
 
function close() {
  store.showNewModal = false
  form.title = ''; form.status = ''; form.date = ''
}
 
function submit() {
  if (!canSubmit.value) return
  // Format date as dd/mm/yyyy
  const [y, m, d] = form.date.split('-')
  const formatted = `${d}/${m}/${y}`
  store.addManuscript(form.title.trim(), form.status, formatted)
  close()
}
</script>
 
<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 40px rgba(0,0,0,.1);
}
.modal-title { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.modal-sub   { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
.field { margin-bottom: 14px; }
.field label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 5px; }
.field input, .field select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 14px;
  color: var(--text);
  background: var(--white);
  outline: none;
  transition: border-color .15s;
}
.field input:focus, .field select:focus { border-color: var(--blue); }
.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 20px;
}
.btn-cancel {
  background: none;
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--muted);
  transition: background .15s;
}
.btn-cancel:hover { background: var(--light); }
.btn-submit {
  background: var(--blue);
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  transition: opacity .15s;
}
.btn-submit:hover:not(:disabled) { opacity: .87; }
.btn-submit:disabled { opacity: .4; cursor: not-allowed; }
 
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>