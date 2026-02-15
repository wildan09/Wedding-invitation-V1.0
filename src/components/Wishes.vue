<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../lib/supabase';

// --- STATE VARIABLES ---
const name = ref('');
const message = ref('');
const attendance = ref('Hadir'); 
const wishes = ref([]); 
const isLoading = ref(false);

// --- 1. AMBIL DATA ---
const fetchWishes = async () => {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error('Error fetching:', error);
  else wishes.value = data;
};

// --- 2. HITUNG STATISTIK ---
const totalHadir = computed(() => wishes.value.filter(w => w.attendance === 'Hadir').length);
const totalTidak = computed(() => wishes.value.filter(w => w.attendance === 'Tidak Hadir').length);
const totalRagu = computed(() => wishes.value.filter(w => w.attendance === 'Masih Ragu').length);

// --- 3. KIRIM DATA ---
const submitWish = async () => {
  if (!name.value || !message.value) {
    alert("Mohon isi nama dan ucapan.");
    return;
  }

  isLoading.value = true;

  const { error } = await supabase
    .from('wishes')
    .insert([{ 
        name: name.value, 
        message: message.value, 
        attendance: attendance.value 
    }]);

  isLoading.value = false;

  if (error) {
    alert("Gagal mengirim ucapan. Coba lagi.");
  } else {
    name.value = '';
    message.value = '';
    attendance.value = 'Hadir';
    fetchWishes(); 
  }
};

onMounted(() => {
  fetchWishes();
});
</script>

<template>
  <section class="py-24 relative overflow-hidden font-sans min-h-screen flex items-center">
    
    <div class="absolute inset-0 z-0">
      <img 
        src="/images/BACKGROUND-GREEN-PII.webp" 
        class="w-full h-full object-cover fixed top-0 left-0"
      />
      <div class="absolute inset-0 bg-[#1a2e25]/40 "></div>
      
      <div class="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10 max-w-6xl">
      
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="font-serif text-4xl md:text-5xl text-yellow-500 mb-4 drop-shadow-lg">
          Wishes & RSVP
        </h2>
        <p class="text-gray-300 font-light tracking-wide text-lg shadow-black drop-shadow-md">
          Doa restu Anda adalah kado terindah bagi kami.
        </p>
      </div>

      <div class="grid lg:grid-cols-12 gap-10 items-start">
        
        <div class="lg:col-span-5 lg:sticky lg:top-10" data-aos="fade-right">
          <div class="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            
            <h3 class="text-xl text-yellow-500 font-serif mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <span class="text-2xl">✍️</span>
              Kirim Ucapan
            </h3>
            
            <form @submit.prevent="submitWish" class="space-y-5 relative z-10">
              
              <div class="group/input">
                <label class="block text-[11px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Nama Lengkap</label>
                <input v-model="name" type="text" placeholder="Isi nama anda..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black/50 transition-all">
              </div>

              <div class="group/input">
                <label class="block text-[11px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Ucapan & Doa</label>
                <textarea v-model="message" rows="4" placeholder="Tuliskan doa terbaik anda..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:bg-black/50 transition-all resize-none"></textarea>
              </div>

              <div class="group/input">
                <label class="block text-[11px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Konfirmasi Kehadiran</label>
                <div class="relative">
                  <select v-model="attendance" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-yellow-500 focus:bg-black/50 transition-all cursor-pointer">
                    <option value="Hadir" class="bg-gray-900">Saya akan Hadir</option>
                    <option value="Tidak Hadir" class="bg-gray-900">Maaf, Tidak Bisa Hadir</option>
                    <option value="Masih Ragu" class="bg-gray-900">Masih Ragu</option>
                  </select>
                </div>
              </div>

              <button type="submit" :disabled="isLoading" class="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                <span v-if="isLoading">Sedang Mengirim...</span>
                <span v-else>Kirim Doa Restu</span>
              </button>

            </form>
          </div>
        </div>

        <div class="lg:col-span-7" data-aos="fade-left">
          
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div class="bg-green-900/40 border border-green-500/30 p-4 rounded-2xl text-center backdrop-blur-md">
              <span class="block text-3xl font-bold text-green-400 font-serif">{{ totalHadir }}</span>
              <span class="text-[10px] text-green-200 uppercase tracking-wider font-bold">Hadir</span>
            </div>
            <div class="bg-red-900/40 border border-red-500/30 p-4 rounded-2xl text-center backdrop-blur-md">
              <span class="block text-3xl font-bold text-red-400 font-serif">{{ totalTidak }}</span>
              <span class="text-[10px] text-red-200 uppercase tracking-wider font-bold">Tidak Hadir</span>
            </div>
            <div class="bg-gray-800/60 border border-gray-500/30 p-4 rounded-2xl text-center backdrop-blur-md">
              <span class="block text-3xl font-bold text-gray-300 font-serif">{{ totalRagu }}</span>
              <span class="text-[10px] text-gray-300 uppercase tracking-wider font-bold">Ragu</span>
            </div>
          </div>

          <div class="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-1 flex flex-col h-[600px] shadow-2xl">
            <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-3xl">
              <h3 class="text-white font-serif text-lg flex items-center gap-2">
                💌 Doa Masuk
              </h3>
              <div class="text-xs text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                Total: {{ wishes.length }}
              </div>
            </div>
            
            <div class="overflow-y-auto p-6 space-y-4 custom-scrollbar flex-1 scroll-smooth">
              <TransitionGroup name="list">
                <div v-for="item in wishes" :key="item.id" class="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 group shadow-md">
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 border-2 border-black/50 flex items-center justify-center text-white font-serif font-bold text-lg shadow-lg">
                        {{ item.name.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <h4 class="font-bold text-white text-sm tracking-wide">{{ item.name }}</h4>
                        <span class="text-[10px] text-gray-400 block flex items-center gap-1">
                          🕒 {{ new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }} • {{ new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit' }) }}
                        </span>
                      </div>
                    </div>
                    
                    <span class="text-[10px] font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md"
                      :class="{
                        'bg-green-500/20 text-green-300 border-green-500/30': item.attendance === 'Hadir',
                        'bg-red-500/20 text-red-300 border-red-500/30': item.attendance === 'Tidak Hadir',
                        'bg-gray-500/20 text-gray-300 border-gray-500/30': !item.attendance || item.attendance === 'Masih Ragu'
                      }">
                      {{ item.attendance }}
                    </span>
                  </div>
                  <p class="text-gray-200 text-sm leading-relaxed pl-[52px] font-light">"{{ item.message }}"</p>
                </div>
              </TransitionGroup>

              <div v-if="wishes.length === 0" class="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                <p>Belum ada ucapan.</p>
                <p class="text-xs mt-1">Jadilah yang pertama mendoakan!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 20px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ca8a04; }

.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(20px); }
</style>