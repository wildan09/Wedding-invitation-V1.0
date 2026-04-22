<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'; 
import { weddingData } from '../utilities/data';

const emit = defineEmits(['open']);
const route = useRoute();
const isHiding = ref(false); 

const guestName = computed(() => {
  const name = route.query.to; 
  if (name) {
    return name; 
  }
  return 'Tamu Spesial';
});

const openInvitation = () => {

  isHiding.value = true;

 
  setTimeout(() => {
    emit('open');
  }, 800);
};
</script>

<template>
  <div 
    class="fixedw-full h-full relative inset-0 z-50 flex flex-col items-center justify-end pb-20 bg-black transition-transform duration-1000 ease-in-out"
    :class="{ '-translate-y-full': isHiding }"
  >
    <div class="absolute inset-0 bg-[url('../../public/images/BCK_2629.webp')] bg-cover bg-center opacity-40"></div>
    
    <div class="relative z-10 text-center px-4">
      <p class="font-body tracking-[0.3em] text-gray-300 mb-4 text-sm animate-pulse">THE WEDDING OF</p>
      
      <h1 class="font-alcantera text-5xl md:text-5xl text-gold leading-tight drop-shadow-sm mt-4 mb-4">
          {{ weddingData.groom.nickName }} &
          <!-- <!-- <span class="font-script text-4xl text-[#8B7355]">&</span>  -->
           {{ weddingData.bride.nickName }}
      </h1>

    

      <p class="font-body text-gray-300 mb-2 text-sm">
        Kepada Yth.<br>
        Bapak/Ibu/Saudara/i
      </p>
      
      <h2 class="font-bold text-2xl md:text-3xl text-gold mb-10 capitalize">
          {{ guestName }}
      </h2>

      <button 
        @click="openInvitation"
        class="group relative px-8 py-3 bg-gold text-dark font-medium rounded-full overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all hover:scale-105 active:scale-95"
      >
       <span class="relative z-10 flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
  Buka Undangan
</span>
      </button>
    </div>
    
  </div>
</template>