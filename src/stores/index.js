import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEditorialStore = defineStore('editorial', () => {
  // Conectar con la API real — estructura esperada por manuscrito:
  // {
  //   id,
  //   titulo,
  //   estado,               // 'en_proceso' | 'pendiente_decision' | 'listo_decidir'
  //   revisores_asignados,  // número
  //   revisores_requeridos, // número
  //   ultimo_movimiento,    // fecha ISO string
  //   revision_vencida,     // boolean
  // }
  const manuscritos = ref([])

  return { manuscritos }
})
