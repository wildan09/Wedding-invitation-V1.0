<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    
    // 1. SET TANGGAL ACARA DISINI (Format: YYYY-MM-DDTHH:mm:ss)
    // Contoh: 5 Juni 2026, jam 08:00 pagi
    const targetDate = new Date('2026-06-05T08:00:00').getTime();
    
    // State untuk angka-angka
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    let timerInterval = null;
    
    // Fungsi Hitung Mundur
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
    
      if (distance < 0) {
        // Kalau waktu sudah lewat
        clearInterval(timerInterval);
        return;
      }
    
      // Rumus Matematika Waktu
      days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
    };
    
    // Pasang Timer saat komponen muncul
    onMounted(() => {
      updateTimer();
      timerInterval = setInterval(updateTimer, 1000); // Update tiap 1 detik
    });
    
    // Bersihkan Timer saat komponen hilang (biar memori aman)
    onUnmounted(() => {
      if (timerInterval) clearInterval(timerInterval);
    });
    </script>
    
    <template>
      <section class="py-20 bg-dark text-white relative overflow-hidden">
        <div class="absolute top-0 left-0 w-32 h-32 bg-gold opacity-10 blur-[80px] rounded-full"></div>
        <div class="absolute bottom-0 right-0 w-32 h-32 bg-gold opacity-10 blur-[80px] rounded-full"></div>
    
        <div class="container mx-auto px-6 text-center relative z-10">
          
          <h2 
            class="font-heading text-3xl md:text-4xl text-gold mb-12" 
            data-aos="fade-up"
          >
            Menuju Hari Bahagia
          </h2>
    
          <div 
            class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div class="p-6 bg-dark-surface border border-gray-800 rounded-xl shadow-lg hover:border-gold/50 transition duration-500 group">
              <p class="font-heading text-5xl md:text-6xl text-gold mb-2 group-hover:scale-110 transition duration-300">
                {{ days }}
              </p>
              <p class="text-xs tracking-[0.2em] uppercase text-gray-400">Hari</p>
            </div>
    
            <div class="p-6 bg-dark-surface border border-gray-800 rounded-xl shadow-lg hover:border-gold/50 transition duration-500 group">
              <p class="font-heading text-5xl md:text-6xl text-gold mb-2 group-hover:scale-110 transition duration-300">
                {{ hours }}
              </p>
              <p class="text-xs tracking-[0.2em] uppercase text-gray-400">Jam</p>
            </div>
    
            <div class="p-6 bg-dark-surface border border-gray-800 rounded-xl shadow-lg hover:border-gold/50 transition duration-500 group">
              <p class="font-heading text-5xl md:text-6xl text-gold mb-2 group-hover:scale-110 transition duration-300">
                {{ minutes }}
              </p>
              <p class="text-xs tracking-[0.2em] uppercase text-gray-400">Menit</p>
            </div>
    
            <div class="p-6 bg-dark-surface border border-gray-800 rounded-xl shadow-lg hover:border-gold/50 transition duration-500 group">
              <p class="font-heading text-5xl md:text-6xl text-gold mb-2 group-hover:scale-110 transition duration-300">
                {{ seconds }}
              </p>
              <p class="text-xs tracking-[0.2em] uppercase text-gray-400">Detik</p>
            </div>
          </div>
    
          <p class="mt-12 text-gray-400 italic font-body text-sm" data-aos="fade-up" data-aos-delay="400">
            "Kami menantikan kehadiran Anda untuk berbagi kebahagiaan ini."
          </p>
    
        </div>
      </section>
    </template>