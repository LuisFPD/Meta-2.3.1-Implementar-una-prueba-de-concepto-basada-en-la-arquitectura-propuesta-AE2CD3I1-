<template>
  <SectionEditorDashboard
    :manuscritos="store.manuscritos"
    @asignar-revisor="onAsignarRevisor"
  />
</template>

<script setup>
import { useEditorialStore } from './stores/index.js'
import SectionEditorDashboard from './components/SectionEditorDashboard.vue'

const store = useEditorialStore()

function onAsignarRevisor(manuscrito) {
  // Conectar aquí la lógica de asignación de revisor
  console.log('Asignar revisor a:', manuscrito)
}
</script>
