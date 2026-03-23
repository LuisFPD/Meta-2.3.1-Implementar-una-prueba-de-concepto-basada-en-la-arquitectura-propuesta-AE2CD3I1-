<template>
  <!--
    ReviewerDashboard.vue
    Main view for the reviewer role.
    Sections:
      1. Invitaciones pendientes  — uses InvitationCard + v-for + v-if
      2. Revisiones en curso      — uses DeadlineBar, highlights urgent rows
      3. Revisiones completadas   — history list
  -->
  <div class="wrap">

    <!-- ── Header ─────────────────────────────────────────── -->
    <header class="topbar">
      <div class="brand">Dashboard del revisor</div>
      <div v-if="offlineCount > 0" class="offline-pill">
        <span class="offline-dot"></span>
        {{ offlineCount }} artículo{{ offlineCount !== 1 ? 's' : '' }} offline
      </div>
    </header>

    <!-- ── 1. Invitaciones pendientes ─────────────────────── -->
    <section class="section">
      <div class="section-label">
        Invitaciones pendientes
        <span v-if="store.invitations.length > 0" class="count-badge orange">
          {{ store.invitations.length }}
        </span>
      </div>

      <!-- Empty state -->
      <div v-if="store.invitations.length === 0" class="empty">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.4">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div class="empty-text">Sin invitaciones pendientes</div>
      </div>

      <!-- Invitation cards list -->
      <TransitionGroup v-else name="list" tag="div" class="cards-list">
        <InvitationCard
          v-for="inv in store.invitations"
          :key="inv.id"
          :invitation="inv"
          @accept="store.acceptInvitation($event)"
          @decline="store.declineInvitation($event)"
        />
      </TransitionGroup>
    </section>

    <!-- ── 2. Revisiones en curso ──────────────────────────── -->
    <section class="section">
      <div class="section-label">
        Revisiones en curso
        <span v-if="store.activeReviews.length > 0" class="count-badge blue">
          {{ store.activeReviews.length }}
        </span>
      </div>

      <div v-if="store.activeReviews.length === 0" class="empty">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.4">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0
               002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2
               0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <div class="empty-text">No tienes revisiones en curso</div>
      </div>

      <div v-else class="table-box">
        <!-- Table header -->
        <div class="table-head">
          <span class="col-title">Artículo</span>
          <span class="col-deadline">Plazo</span>
          <span class="col-offline">Offline</span>
        </div>

        <!-- Table rows — v-for over activeReviews -->
        <div
          v-for="rev in store.activeReviews"
          :key="rev.id"
          class="table-row"
          :class="{ 'row-urgent': rev.daysLeft < 3 }"
        >
          <!-- Article info -->
          <div class="col-title">
            <div class="rev-title">{{ rev.title }}</div>
            <div class="rev-area">{{ rev.area }}</div>

            <!-- Progress bar (only when progress > 0) -->
            <div v-if="rev.progress > 0" class="prog-wrap">
              <div class="prog-bar">
                <div
                  class="prog-fill"
                  :class="rev.daysLeft < 3 ? 'fill-urgent' : 'fill-normal'"
                  :style="{ width: rev.progress + '%' }"
                ></div>
              </div>
              <span class="prog-label">{{ rev.progress }}%</span>
            </div>
          </div>

          <!-- Deadline badge -->
          <div class="col-deadline">
            <DeadlineBar :days-left="rev.daysLeft" />
          </div>

          <!-- Offline availability -->
          <div class="col-offline">
            <span v-if="rev.offlineAvailable" class="offline-chip">
              <svg width="9" height="9" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0
                     010-1.414l6-6a1 1 0 011.414 1.414L5.414
                     9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0
                     010 1.414z"
                  clip-rule="evenodd"/>
              </svg>
              Leer offline
            </span>
            <span v-else class="no-offline">—</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 3. Revisiones completadas ──────────────────────── -->
    <section class="section">
      <div class="section-label">
        Revisiones completadas
        <span v-if="store.completedReviews.length > 0" class="count-badge green">
          {{ store.completedReviews.length }}
        </span>
      </div>

      <div v-if="store.completedReviews.length === 0" class="empty">
        <div class="empty-text">Aún no has completado ninguna revisión</div>
      </div>

      <div v-else class="table-box">
        <div
          v-for="rev in store.completedReviews"
          :key="rev.id"
          class="table-row completed-row"
        >
          <div class="col-title">
            <div class="rev-title">{{ rev.title }}</div>
            <div class="rev-area">{{ rev.area }} · {{ rev.completedAt }}</div>
          </div>
          <span class="verdict-badge" :class="verdictClass(rev.verdict)">
            {{ rev.verdict }}
          </span>
        </div>
      </div>
    </section>

  </div>

  <ToastContainer />
</template>

<script setup>
import { computed } from 'vue'
import { useReviewerStore } from '@/stores'
import InvitationCard from '@/components/InvitationCard.vue'
import DeadlineBar from '@/components/DeadlineBar.vue'
import ToastContainer from '@/components/ToastContainer.vue'

const store = useReviewerStore()

/** Count of articles available for offline reading (active + invitations) */
const offlineCount = computed(
  () => store.activeReviews.filter(r => r.offlineAvailable).length
      + store.invitations.filter(i => i.offlineAvailable).length
)

/** Returns CSS class for each verdict string */
function verdictClass(verdict) {
  return {
    'Aceptar':            'v-accept',
    'Revisiones menores': 'v-minor',
    'Revisiones mayores': 'v-major',
    'Rechazar':           'v-reject',
  }[verdict] ?? ''
}
</script>

<style scoped>
/* ── Layout ── */
.wrap {
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

/* ── Topbar ── */
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.brand {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

.offline-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 100px;
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

.offline-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2563eb;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* ── Section ── */
.section { margin-bottom: 36px; }

.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin-bottom: 10px;
}

/* Count badges next to section labels */
.count-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 100px;
}

.count-badge.orange { background: var(--orange-soft); color: var(--orange); }
.count-badge.blue   { background: #eff6ff;            color: var(--blue); }
.count-badge.green  { background: var(--green-soft);  color: var(--green); }

/* ── Empty state ── */
.empty {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  background: var(--white);
  padding: 20px 16px;
  color: var(--muted);
}

.empty svg { flex-shrink: 0; color: #d4d4d8; }
.empty-text { font-size: 13px; }

/* ── Cards list (invitations) ── */
.cards-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── Table box (active & completed reviews) ── */
.table-box {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--white);
}

/* Table header (active reviews only) */
.table-head {
  display: grid;
  grid-template-columns: 1fr 130px 90px;
  padding: 8px 16px;
  background: var(--light);
  border-bottom: 1px solid var(--border);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  gap: 12px;
}

/* Table row */
.table-row {
  display: grid;
  grid-template-columns: 1fr 130px 90px;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid var(--border);
  transition: background 0.1s;
}

.table-row:last-child { border-bottom: none; }
.table-row:hover { background: var(--light); }

/* Completed rows have no deadline/offline columns → override grid */
.completed-row {
  grid-template-columns: 1fr auto;
}

/* Urgent row highlight (< 3 days) */
.row-urgent {
  background: #fff9f9;
  border-left: 3px solid var(--red);
}

.row-urgent:hover { background: #fff1f2; }

/* Column: title area */
.col-title { min-width: 0; }
.rev-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.rev-area { font-size: 11px; color: var(--muted); }

/* Progress bar */
.prog-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 7px;
}

.prog-bar {
  flex: 1;
  height: 3px;
  background: var(--surface-2);
  border-radius: 3px;
  overflow: hidden;
}

.prog-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.fill-normal { background: var(--blue); }
.fill-urgent { background: var(--red); }

.prog-label {
  font-size: 10px;
  color: var(--muted);
  flex-shrink: 0;
}

/* Column: deadline */
.col-deadline {
  display: flex;
  align-items: center;
}

/* Column: offline */
.col-offline {
  display: flex;
  align-items: center;
}

.offline-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 100px;
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

.no-offline { font-size: 12px; color: var(--border); }

/* Verdict badge (completed reviews) */
.verdict-badge {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
}

.v-accept { background: var(--green-soft); color: var(--green); }
.v-minor  { background: #eff6ff;           color: var(--blue); }
.v-major  { background: var(--orange-soft); color: var(--orange); }
.v-reject { background: var(--red-soft);   color: var(--red); }

/* ── Responsive ── */
@media (max-width: 540px) {
  .wrap { padding: 18px 14px 48px; }
  .table-head { grid-template-columns: 1fr 100px; }
  .table-head .col-offline { display: none; }
  .table-row  { grid-template-columns: 1fr 100px; }
  .table-row .col-offline { display: none; }
  .completed-row { grid-template-columns: 1fr auto; }
}
</style>
