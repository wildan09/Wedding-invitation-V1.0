<script setup>
import { onMounted, ref, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../utilities/data'; 

const dummyData = {
  groom: "Habib",
  bride: "Adiba",
  date: "Minggu, 30 Desember 2025"
};

gsap.registerPlugin(ScrollTrigger);

// Refs Layer
const heroSection = ref(null);
const layer1_Sky = ref(null);
const layer2_Landscape = ref(null);
const layer3_Gazebo = ref(null);
const layer5_Blur = ref(null);
const finalFrameLayer = ref(null); 
const titleWrapper = ref(null);
const divider = ref(null);
const saveBtn = ref(null);
const subtitleText = ref(null);
const dateText = ref(null);

onMounted(async () => {
  await nextTick();

  // --- SETUP INITIAL STATES ---
  gsap.set(finalFrameLayer.value, { opacity: 0, scale: 1.08 });
  gsap.set(layer5_Blur.value, { opacity: 0, scale: 1.05, y: 20 });
  gsap.set(titleWrapper.value, { opacity: 0 });
  gsap.set(subtitleText.value, { opacity: 0, y: 18, filter: 'blur(6px)' });
  gsap.set('[data-name]', { opacity: 0, y: 24, filter: 'blur(8px)' });
  gsap.set(divider.value, { opacity: 0, scaleX: 0 });
  gsap.set(dateText.value, { opacity: 0, y: 12, letterSpacing: '0.6em' });
  gsap.set(saveBtn.value, { opacity: 0, y: 16, scale: 0.94 });

  // --- WIND EFFECT (halus & natural) ---
  const windEffect = (element, delay = 0, strength = 1.8) => {
    if (!element) return;
    gsap.to(element, {
      rotation: strength,
      xPercent: 0.8,
      duration: 4.5,
      delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "bottom center"
    });
    // Subtle scale breathing
    gsap.to(element, {
      scale: 1.012,
      duration: 6,
      delay: delay + 1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  windEffect(layer5_Blur.value, 2.5, 2);

  // --- MAIN TIMELINE ---
  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

  tl
    // PHASE 1: Landscape layers dissolve out — lambat & dramatis
    .to(layer3_Gazebo.value, {
      scale: 1.35,
      opacity: 0,
      duration: 2.8,
      ease: "expo.inOut"
    }, 0)
    .to(layer2_Landscape.value, {
      scale: 1.18,
      opacity: 0,
      duration: 2.4,
      ease: "power2.inOut"
    }, 0.1)
    .to(layer1_Sky.value, {
      scale: 1.06,
      duration: 3,
      ease: "power1.inOut"
    }, 0)

    // PHASE 2: Final frame muncul dengan soft reveal + slight descale
    .to(finalFrameLayer.value, {
      opacity: 1,
      scale: 1,
      duration: 2.2,
      ease: "power2.out"
    }, 1.4)

    // PHASE 3: Bunga naik dari bawah dengan blur dissolve
    .to(layer5_Blur.value, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 2.0,
      ease: "power2.out"
    }, 1.9)

    // PHASE 4: Title wrapper reveal
    .to(titleWrapper.value, {
      opacity: 1,
      duration: 0.1,
    }, 2.6)

    // PHASE 5: Teks satu per satu — staggered blur dissolve
    .to(subtitleText.value, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.0,
      ease: "power2.out"
    }, 2.7)

    .to('[data-name]', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.0, // nama muncul bareng
      ease: "power3.out"
    }, 3.0)

    .to(divider.value, {
      opacity: 1,
      scaleX: 1,
      duration: 1.0,
      ease: "power2.inOut"
    }, 3.5)

    .to(dateText.value, {
      opacity: 1,
      y: 0,
      letterSpacing: '0.3em',
      duration: 1.0,
      ease: "power2.out"
    }, 3.8)

    .to(saveBtn.value, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: "back.out(1.4)"
    }, 4.2);

  // --- SUBTLE FLOAT: Nama bergerak perlahan setelah muncul ---
  tl.add(() => {
    gsap.to(titleWrapper.value, {
      y: -6,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, 5.0);
});
</script>

<template>
  <div ref="heroSection" class="relative w-full h-screen overflow-hidden bg-[#1a2e25]">
    
    <!-- Layer 1: Sky -->
    <div ref="layer1_Sky" class="absolute inset-0 z-0">
      <img 
        src="/images/GREEN-LAND-PII.webp" 
        class="w-full h-full object-cover opacity-60 blur-[2px]" 
        alt="Sky"
        fetchpriority="high"
        loading="eager"
      >
    </div>

    <!-- Layer 2: Landscape -->
    <div ref="layer2_Landscape" class="absolute inset-0 z-10">
      <img 
        src="/images/GREEN-LAND-PII.webp" 
        class="w-full h-full object-cover opacity-90 brightness-90" 
        alt="Landscape"
        fetchpriority="high"
        loading="eager"
      >
    </div>

    <!-- Layer 3: Gazebo -->
    <div ref="layer3_Gazebo" class="absolute inset-0 z-20 flex items-center justify-center">
      <div class="relative w-[85%] h-[60%] md:w-[60%] md:h-[70%] shadow-2xl overflow-hidden"
           style="mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%); 
                  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);">
        <img src="/images/BACKGROUND6-GREEN-PII-e1761201319990.jpg" class="w-full h-full object-cover" alt="Gazebo">
      </div>
    </div>

    <!-- Layer 4: Final Frame -->
    <div ref="finalFrameLayer" class="absolute inset-0 z-30 opacity-0">
      <img src="/images/FALLBACK-HIJAU-V2-MOTION-PII.webp" 
           class="w-full h-full object-cover" 
           alt="Final Frame">
      <div class="absolute inset-0 bg-black/10"></div>
    </div>

    <!-- Layer 5: Bunga Kiri-Kanan -->
    <div ref="layer5_Blur" class="absolute inset-0 z-40 pointer-events-none flex justify-between items-end origin-bottom">
      <img src="/images/BUNGA6-GREEN-PII.webp" 
           class="w-[100%] h-auto object-contain" 
           alt="Flower Left">
      <img src="/images/BUNGA6-GREEN-PII.webp" 
           class="w-[100%] h-auto object-contain -scale-x-100" 
           alt="Flower Right">
    </div>

    <!-- Layer 6: Text Content -->
    <div class="absolute inset-0 z-50 flex flex-col items-center justify-center text-center pointer-events-auto">
      <div ref="titleWrapper" class="p-8 opacity-0">

        <p ref="subtitleText" class="font-serif text-green md:text-3xl text-xl lg:text-xl mb-4 drop-shadow-lg tracking-wider">
          The Wedding of
        </p>
        
        <h1 class="font-snell text-marron lg:text-5xl text-4xl md:text-7xl mb-6 leading-tight font-bold">
          <span data-name>{{ weddingData?.groom?.nickName || dummyData.groom }}</span>
          <br class="md:hidden" />
          <span data-name> &amp; {{ weddingData?.bride?.nickName || dummyData.bride }}</span>
        </h1>
        
        <div ref="divider" class="w-24 h-1 bg-gold mx-auto mb-6 rounded-full shadow-lg origin-center"></div>

        <p ref="dateText" class="font-trajan text-green text-sm md:text-base uppercase tracking-[0.3em] font-bold">
          {{ weddingData?.akad?.date1 || dummyData.date }}
        </p>
       
        <a ref="saveBtn"
           href="https://calendar.app.google/apk9os4SF7K3BQLB6" 
           target="_blank"
           class="mt-8 group relative px-8 py-3 bg-[#2c574d] text-white font-sans text-xs tracking-[0.2em] uppercase rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-gold/50 cursor-pointer z-50 inline-block">
          
          <div class="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
          
          <span class="relative flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Save The Date
          </span>
        </a>

      </div>
    </div>
    
    <!-- Bottom gradient -->
    <div class="absolute bottom-0 w-full h-40 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent z-45 pointer-events-none"></div>

  </div>
</template>