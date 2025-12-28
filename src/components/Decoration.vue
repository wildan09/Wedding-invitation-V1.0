<script setup>
    // Komponen khusus untuk dekorasi background
    </script>
    
    <template>
      <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    
        <img 
          src="../../public/images/merak-768x553.webp" 
          alt="Dekorasi Merak" 
          class="absolute -bottom-5 -right-5 w-72 md:w-96 animate-sway origin-bottom"
        />
    
        </div>
    </template>
    
    <style scoped>
    /* --- DEFINISI ANIMASI GOYANG (SWAY) --- */
    @keyframes sway {
      0% {
        transform: rotate(-2deg); /* Miring sedikit ke kiri */
      }
      50% {
        transform: rotate(2deg);  /* Miring sedikit ke kanan */
      }
      100% {
        transform: rotate(-2deg); /* Kembali ke kiri */
      }
    }
    
    /* --- PENERAPAN KELAS ANIMASI --- */
    .animate-sway {
      /* - Menjalankan animasi 'sway'
         - Durasi 8 detik (gerakan lambat & anggun)
         - ease-in-out (gerakan halus di awal dan akhir)
         - infinite (berulang terus menerus)
      */
      animation: sway 8s ease-in-out infinite;
      
      /* PENTING: origin-bottom
         Ini memastikan titik putarnya ada di bawah (kaki merak), 
         bukan di tengah gambar. Jadi dia bergoyang seperti bertengger.
         (Sudah ditambahkan di class Tailwind 'origin-bottom' di template, tapi dipertegas di sini juga oke)
      */
      transform-origin: bottom center;
    }
    </style>