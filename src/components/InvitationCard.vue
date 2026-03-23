<template>
  <!--
    InvitationCard.vue
    Props:
      invitation (Object, required) — { id, title, area, deadline, respondBy, offlineAvailable }
    Emits:
      accept  (id) — parent handles store update
      decline (id) — parent handles store update
    Slots:
      default — optional extra content below meta row
  -->
  <div class="inv-card">

    <!-- Title -->
    <div class="inv-title">{{ invitation.title }}</div>

    <!-- Meta chips row -->
    <div class="inv-meta">
      <span class="chip">{{ invitation.area }}</span>
      <span class="chip">Deadline: {{ invitation.deadline }}</span>
      <span v-if="invitation.offlineAvailable" class="chip chip-offline">
        <svg width="9" height="9" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0
               010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0
               110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"/>
        </svg>
        Disponible offline
      </span>
    </div>

    <!-- Optional slot for extra content -->
    <slot />

    <!-- Footer: respond-by note + action buttons -->
    <div class="inv-footer">
      <span class="respond-by">Responder antes del {{ invitation.respondBy }}</span>
      <div class="inv-actions">
        <button class="btn-accept" @click="$emit('accept', invitation.id)">
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0
                 01-1.414 0l-4-4a1 1 0 011.414-1.414L8
                 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"/>
          </svg>
          Aceptar
        </button>
        <button class="btn-decline" @click="$emit('decline', invitation.id)">
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10
                 8.586l4.293-4.293a1 1 0 111.414
                 1.414L11.414 10l4.293 4.293a1 1 0
                 01-1.414 1.414L10 11.414l-4.293
                 4.293a1 1 0 01-1.414-1.414L8.586
                 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"/>
          </svg>
          Declinar
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
/**
 * InvitationCard.vue
 * Displays a single pending review invitation.
 * Communicates up via emits — no store access inside this component.
 */
defineProps({
  invitation: { type: Object, required: true },
})

defineEmits(['accept', 'decline'])
</script>

<style scoped>
.inv-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  border-left: 3px solid var(--blue);
  transition: box-shadow 0.15s;
}

.inv-card:hover { box-shadow: var(--shadow); }

.inv-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  margin-bottom: 10px;
}

/* Meta chips */
.inv-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.chip {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 100px;
  background: var(--light);
  color: var(--muted);
  border: 1px solid var(--border);
}

.chip-offline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #eff6ff;
  color: #2563eb;
  border-color: #bfdbfe;
}

/* Footer */
.inv-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.respond-by {
  font-size: 11px;
  color: var(--muted);
}

.inv-actions {
  display: flex;
  gap: 8px;
}

/* Shared button base */
.btn-accept,
.btn-decline {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid;
  transition: opacity 0.15s;
}

.btn-accept:hover,
.btn-decline:hover { opacity: 0.8; }

.btn-accept {
  background: var(--green-soft);
  color: var(--green);
  border-color: #bbf7d0;
}

.btn-decline {
  background: var(--light);
  color: var(--muted);
  border-color: var(--border);
}

.btn-decline:hover {
  background: var(--red-soft);
  color: var(--red);
  border-color: #fecdd3;
  opacity: 1;
}
</style>
