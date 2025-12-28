<script setup>
    import { ref } from 'vue';
    
    // State: Apakah musik sedang main?
    const isPlaying = ref(false);
    const audioRef = ref(null);
    
    // Link Lagu (Ganti dengan file MP3 Bapak, misal: '/audio/song.mp3')
    // Ini saya pakai link dummy instrumen piano dulu
    const audioSource = "../../public/audio/Gending Temanten Adat Jawa  kebo giro.mp3"; 
    
    // 1. Fungsi Toggle (Dipanggil saat tombol musik diklik)
    const toggleMusic = () => {
      if (isPlaying.value) {
        audioRef.value.pause();
        isPlaying.value = false;
      } else {
        audioRef.value.play();
        isPlaying.value = true;
      }
    };
    
    // 2. Fungsi Play Eksternal (Dipanggil oleh App.vue saat tombol "Buka Undangan" diklik)
    const playMusic = () => {
      if (audioRef.value) {
        audioRef.value.play()
          .then(() => {
            isPlaying.value = true;
          })
          .catch((err) => {
            console.log("Autoplay dicegah browser, user harus interaksi dulu:", err);
          });
      }
    };
    
    // Expose fungsi ini agar bisa dipanggil dari luar komponen
    defineExpose({
      playMusic
    });
    </script>
    
    <template>
      <div class="fixed bottom-6 left-6 z-50">
        
        <audio ref="audioRef" loop>
          <source :src="audioSource" type="audio/mpeg">
        </audio>
    
        <button 
          @click="toggleMusic"
          class="w-12 h-12 bg-gold/90 text-dark rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.6)] border-2 border-white/20 backdrop-blur-sm transition hover:scale-110"
        >
          <div :class="isPlaying ? 'animate-spin-slow' : ''">
            <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" x2="23" y1="1" y2="23"/><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
        </button>
    
      </div>
    </template>
    
    <style scoped>
    /* Animasi Putar Pelan (Seperti Piringan Hitam) */
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin 4s linear infinite;
    }
    </style>