import { createRouter, createWebHashHistory } from 'vue-router';

// --- BAGIAN INI SAYA KEMBALIKAN SEPERTI SEMULA ---
// Pastikan titiknya satu (.) kalau file router sejajar dengan folder components
// Atau titiknya dua (..) kalau file router ada di dalam folder 'router'
import Invitation from '@/components/Invitation.vue'; 
import Dashboard from '@/components/Dashboard.vue';
import QrScanner from '@/components/QrScanner.vue';

const routes = [
  { 
    path: '/',          
    name: 'Home', 
    component: Invitation 
  },
  { 
    path: '/admin',     
    name: 'Admin', 
    component: Dashboard 
  },
  {
    path : '/scan',
    name : 'scan',
    component : QrScanner
  }
];

const router = createRouter({
  // Kita pakai Hash Mode (Pasti Aman)
  history: createWebHashHistory(), 
  routes,
});

export default router;