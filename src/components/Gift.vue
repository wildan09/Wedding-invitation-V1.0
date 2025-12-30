<script setup>
    import { ref } from 'vue';
    
    // Data Rekening (Silakan ganti dengan data asli Bapak)
    const bankAccounts = [
      {
        id: 1,
        bankName: 'BCA',
        accountNumber: '8945179259', // Ganti No. Rek
        holderName: 'MUHAMMAD WILDAN VICKI FAHMI AKBAR',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png'
      },
      {
        id: 2,
        bankName: 'BRI',
        accountNumber: '1440017892974', // Ganti No. Rek
        holderName: 'DEVA PUTRI DYANA',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_MANDIRI_logo.svg.png'
      }
    ];
    
    // State untuk notifikasi "Berhasil Disalin"
    const copiedId = ref(null);
    
    // Fungsi Salin No. Rekening
    const copyToClipboard = async (text, id) => {
      try {
        await navigator.clipboard.writeText(text);
        copiedId.value = id;
        
        // Kembalikan tombol ke semula setelah 2 detik
        setTimeout(() => {
          copiedId.value = null;
        }, 2000);
      } catch (err) {
        alert('Gagal menyalin. Silakan salin manual.');
      }
    };
    </script>
    
    <template>
      <section class="py-24 bg-dark-surface relative text-white">
        
        <div class="container mx-auto px-6 max-w-4xl">
          <div class="text-center mb-16" data-aos="fade-down">
            <h2 class="font-heading text-4xl text-gold mb-4">Wedding Gift</h2>
            <p class="text-gray-400 max-w-lg mx-auto">
              Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:
            </p>
          </div>
    
          <div class="grid md:grid-cols-2 gap-8">
            
            <div 
              v-for="bank in bankAccounts" 
              :key="bank.id"
              class="relative group"
              data-aos="flip-up"
              :data-aos-delay="bank.id * 100"
            >
              <div class="bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-2xl p-6 shadow-xl relative overflow-hidden group-hover:border-gold/50 transition duration-500">
                
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-gold),_transparent)]"></div>
    
                <div class="flex justify-between items-start mb-8 relative z-10">
                  <img :src="bank.logo" :alt="bank.bankName" class="h-8 bg-white/90 px-2 py-1 rounded">
                  <div class="w-10 h-8 bg-yellow-600/80 rounded flex items-center justify-center overflow-hidden relative">
                    <div class="absolute inset-0 border border-yellow-400/50 rounded grid grid-cols-2 gap-0.5">
                      <div class="border-r border-yellow-400/50"></div>
                      <div></div>
                    </div>
                  </div>
                </div>
    
                <div class="mb-2 relative z-10">
                  <p class="text-gray-400 text-xs mb-1 tracking-widest uppercase">Nomor Rekening</p>
                  <p class="font-mono text-2xl md:text-3xl text-white tracking-wider text-shadow">
                    {{ bank.accountNumber }}
                  </p>
                </div>
    
                <div class="mb-8 relative z-10">
                  <p class="font-heading text-gold text-lg uppercase tracking-wide">
                    {{ bank.holderName }}
                  </p>
                </div>
    
                <button 
                  @click="copyToClipboard(bank.accountNumber, bank.id)"
                  class="w-full py-3 rounded-lg font-bold text-sm transition relative overflow-hidden z-10 flex items-center justify-center gap-2"
                  :class="copiedId === bank.id ? 'bg-green-600 text-white' : 'bg-gold text-dark hover:bg-white'"
                >
                  <span v-if="copiedId === bank.id" class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Berhasil Disalin!
                  </span>
                  <span v-else class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    Salin No. Rekening
                  </span>
                </button>
    
              </div>
            </div>
    
          </div>
    
        </div>
      </section>
    </template>
    
    <style scoped>
    /* Efek bayangan teks biar lebih timbul */
    .text-shadow {
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    </style>