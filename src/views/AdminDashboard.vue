<template>
  <div class="admin-container">
    <header class="dashboard-header">
      <h1> Panel de Control - Administrador</h1>
      <p>Gestión de usuarios y estado general de la plataforma</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <h3> Usuarios Activos</h3>
        <p class="stat-number">{{ activeUsersCount }}</p>
      </div>
      <div class="stat-card">
        <h3> Revisiones en Curso</h3>
        <p class="stat-number">14</p> </div>
      <div class="stat-card">
        <h3>⚠️ Errores Recientes</h3>
        <p class="stat-number" style="color: #e74c3c;">2</p> </div>
    </div>

    <div class="settings-section">
      <h2> Configuración del Sistema</h2>
      <div class="settings-grid">
        <div class="form-group">
          <label>Mínimo de Revisores por Manuscrito:</label>
          <input type="number" v-model="systemSettings.minReviewers" min="1" max="5">
        </div>
        <button class="btn-primary" @click="saveSettings" style="align-self: flex-end;">Guardar Configuración</button>
      </div>
    </div>

    <div class="users-section">
      <div class="section-header">
        <h2>Gestión de Usuarios</h2>
      </div>

      <div class="filters-zone">
        <input type="text" v-model="searchQuery" placeholder="🔍 Buscar por nombre o correo..." class="search-input">
        <select v-model="roleFilter" class="role-select">
          <option value="">Todos los roles</option>
          <option value="Autor">Autores</option>
          <option value="Revisor">Revisores</option>
          <option value="Editor de Seccion">Editores de Sección</option>
          <option value="Editor Jefe">Editores Jefe</option>
        </select>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Registro</th> <th>Estado</th>
            <th>Acciones</th> </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedUsers.length === 0">
            <td colspan="6" class="text-center">No se encontraron usuarios.</td>
          </tr>
          
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td><strong>{{ user.name }}</strong></td>
            <td>{{ user.email }}</td>
            <td><span :class="'badge role-' + user.role.toLowerCase().replace(/ /g, '-')">{{ user.role }}</span></td>
            <td>{{ user.registerDate }}</td> <td>
              <span :class="user.active ? 'status-active' : 'status-inactive'">
                {{ user.active ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="actions">
              <button 
                :class="user.active ? 'btn-danger' : 'btn-success'" 
                @click="toggleUserStatus(user.id)"
              >
                {{ user.active ? '🚫 Suspender' : '✅ Activar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-controls" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn-page">⬅️ Anterior</button>
        <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="btn-page">Siguiente ➡️</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// --- ESTADO DE LA CONFIGURACIÓN DEL SISTEMA ---
const systemSettings = ref({
  minReviewers: 2
});

const saveSettings = () => {
  alert(`Configuración guardada:\nMínimo de Revisores: ${systemSettings.value.minReviewers}`);
};

const users = ref([
  { id: 1, name: 'Axel Jimenez', email: 'axel.jimenez85@uabc.edu.mx', role: 'Autor', active: true, registerDate: '14/03/2026' },
  { id: 2, name: 'Leonel Rodriguez', email: 'oscar.araujo@uabc.edu.mx', role: 'Editor Jefe', active: true, registerDate: '14/03/2026' },
  { id: 3, name: 'Luz Jacobo', email: 'jacobo.luz@uabc.edu.mx', role: 'Revisor', active: true, registerDate: '14/03/2026' },
  { id: 4, name: 'Luis Prieto', email: 'luis.prieto@uabc.edu.mx', role: 'Editor de Seccion', active: true, registerDate: '14/03/2026' },
  { id: 5, name: 'Eduardo Hurtado', email: 'e1190534@uabc.edu.mx', role: 'Autor', active: true, registerDate: '14/03/2026' },
  { id: 6, name: 'Ricardo Romo', email: 'ricardo.romo@uabc.edu.mx', role: 'Revisor', active: true, registerDate: '14/03/2026' }
]);

const activeUsersCount = computed(() => {
  return users.value.filter(user => user.active).length;
});

// --- ACCIÓN: ACTIVAR/DESACTIVAR USUARIO ---
const toggleUserStatus = (id) => {
  const user = users.value.find(u => u.id === id);
  if (user) {
    user.active = !user.active; // Invierte el estado
  }
};

// --- LÓGICA DE BÚSQUEDA Y PAGINACIÓN ---
const searchQuery = ref('');
const roleFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = 5;

watch([searchQuery, roleFilter], () => {
  currentPage.value = 1;
});

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = roleFilter.value === '' || user.role === roleFilter.value;
    return matchesSearch && matchesRole;
  });
});

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredUsers.value.slice(startIndex, endIndex);
});

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
</script>

<style scoped>
/* Agrega estos nuevos estilos al final de tu etiqueta <style> existente */
.admin-container { padding: 20px 40px; font-family: sans-serif; color: #333; }
.dashboard-header p { color: #666; margin-top: 5px; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
.stat-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #42b983; }
.stat-number { font-size: 2rem; font-weight: bold; margin: 10px 0 0 0; color: #2c3e50; }

/* Nueva sección de configuración */
.settings-section { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 30px; border-top: 4px solid #34495e;}
.settings-grid { display: flex; gap: 20px; margin-top: 15px; align-items: center; flex-wrap: wrap;}
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group input { padding: 8px; border: 1px solid #ccc; border-radius: 5px; width: 100px;}

.users-section { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.filters-zone { display: flex; gap: 15px; margin-bottom: 20px; background: #f8f9fa; padding: 15px; border-radius: 8px; }
.search-input, .role-select { padding: 10px; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem; }
.search-input { flex-grow: 1; }
.users-table { width: 100%; border-collapse: collapse; }
.users-table th, .users-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
.users-table th { background-color: #f8f9fa; }
.badge { padding: 5px 10px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; }
.role-autor { background: #e1f5fe; color: #0288d1; }
.role-editor-jefe { background: #fce4ec; color: #c2185b; }
.role-editor-de-seccion { background: #fff3e0; color: #f57c00; }
.role-revisor { background: #e8f5e9; color: #388e3c; }
.status-active { color: #27ae60; font-weight: bold; }
.status-inactive { color: #e74c3c; font-weight: bold; }
.text-center { text-align: center; color: #888; }
.pagination-controls { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 20px; }
.btn-page { padding: 8px 15px; background: #fff; border: 1px solid #ddd; border-radius: 5px; cursor: pointer; font-weight: bold; }
.btn-page:disabled { background: #f1f1f1; color: #aaa; cursor: not-allowed; }
.page-info { font-weight: bold; color: #555; }

/* Botones nuevos */
.btn-primary { background: #42b983; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; }
.btn-danger { background: #ffeded; color: #e74c3c; border: 1px solid #e74c3c; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-weight: bold; }
.btn-danger:hover { background: #e74c3c; color: white; }
.btn-success { background: #eafaf1; color: #27ae60; border: 1px solid #27ae60; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-weight: bold; }
.btn-success:hover { background: #27ae60; color: white; }
</style>