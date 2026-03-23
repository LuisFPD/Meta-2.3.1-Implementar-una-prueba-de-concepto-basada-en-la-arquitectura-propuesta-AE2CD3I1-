import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReviewerStore = defineStore('reviewer', () => {
  // ── Static data ────────────────────────────────────────────────
  const invitations = ref([
    {
      id: 1,
      title: 'Federated Learning con Privacidad Diferencial en Dispositivos Móviles',
      area: 'Machine Learning · Privacidad',
      deadline: '10 abr 2025',
      respondBy: '24 mar 2025',
      offlineAvailable: true,
    },
    {
      id: 2,
      title: 'Detección Automática de Desinformación en Redes Sociales Mediante LLMs',
      area: 'NLP · Ética IA',
      deadline: '5 abr 2025',
      respondBy: '25 mar 2025',
      offlineAvailable: false,
    },
  ])

  const activeReviews = ref([
    {
      id: 10,
      title: 'Optimización de Transformers para Inferencia en Dispositivos Edge',
      area: 'Deep Learning · Edge Computing',
      daysLeft: 1,
      progress: 65,
      offlineAvailable: true,
    },
    {
      id: 11,
      title: 'Análisis de Sesgos en LLMs para Contextos Biomédicos en Español',
      area: 'NLP · Biomedicina',
      daysLeft: 2,
      progress: 30,
      offlineAvailable: true,
    },
    {
      id: 12,
      title: 'Sistemas Multi-Agente para Coordinación de Drones en Búsqueda y Rescate',
      area: 'Robótica · Sistemas Multi-Agente',
      daysLeft: 14,
      progress: 0,
      offlineAvailable: false,
    },
  ])

  const completedReviews = ref([
    {
      id: 20,
      title: 'Graph Neural Networks para Predicción de Interacciones Proteína-Fármaco',
      area: 'Bioinformática',
      completedAt: '14 mar 2025',
      verdict: 'Revisiones menores',
    },
    {
      id: 21,
      title: 'Ataques de Envenenamiento en Aprendizaje por Refuerzo con RLHF',
      area: 'Seguridad IA',
      completedAt: '2 mar 2025',
      verdict: 'Aceptar',
    },
    {
      id: 22,
      title: 'Compresión Neuronal Sin Pérdida para Modelos Fundacionales',
      area: 'ML Systems',
      completedAt: '18 feb 2025',
      verdict: 'Revisiones mayores',
    },
    {
      id: 23,
      title: 'Evaluación de Alucinaciones en LLMs para Generación de Código Clínico',
      area: 'LLMs · Salud',
      completedAt: '5 feb 2025',
      verdict: 'Rechazar',
    },
  ])

  // ── Toast ──────────────────────────────────────────────────────
  const toasts = ref([])

  function pushToast(msg) {
    const id = Date.now()
    toasts.value.push({ id, msg })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  // ── Actions ────────────────────────────────────────────────────
  function acceptInvitation(id) {
    const inv = invitations.value.find(i => i.id === id)
    if (!inv) return
    // Move to active reviews
    activeReviews.value.unshift({
      id: Date.now(),
      title: inv.title,
      area: inv.area,
      daysLeft: 21,
      progress: 0,
      offlineAvailable: false,
    })
    invitations.value = invitations.value.filter(i => i.id !== id)
    pushToast(`Invitación aceptada. El artículo aparece en "En curso".`)
  }

  function declineInvitation(id) {
    invitations.value = invitations.value.filter(i => i.id !== id)
    pushToast('Invitación declinada. El editor será notificado.')
  }

  return {
    invitations,
    activeReviews,
    completedReviews,
    toasts,
    pushToast,
    acceptInvitation,
    declineInvitation,
  }
})
