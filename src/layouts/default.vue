<template>
  <v-app :theme="theme ? 'dark':'light'" class="app-layout">
    <AppHeader />
    <v-main class="main-content">
      <v-fade-transition mode="slide-left">
        <router-view />
      </v-fade-transition>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
    import {provide, ref} from 'vue'
    
    import AppFooter from './AppFooter.vue'
    import AppHeader from './AppHeader.vue'
    
    import { useVeiculoStore  } from '@/stores/veiculosStore'
    const veiculosStore = useVeiculoStore()

    setTimeout(()=>{
      veiculosStore.initMassaTeste()
    }, 1000)

    const theme = ref(true)
    provide('theme', theme) 

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
html, body{
  overflow: hidden;
}
:root{
  --bg-color:#f8fafc;
  --second-bg-color: #94a3b8;
  --text-color: #ededed;
  --main-color: #1E3A8A;
  --second-color: #42c1e8;
}
.app-layout {
  height: 100vh;
  overflow: hidden;
}

.main-content {
  overflow-y: auto;
}

.headerbar{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1;
  background: var(--main-color);
  color: white;
  user-select: none;
}

.header{
  width: min(1200px, 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header div{
  position: relative;
  font-weight: 600;
}

.animate{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--main-color);
    animation: show-right 1s ease-out forwards;
    animation-delay: calc(.3s * var(--i));
}

.animate.bg{
  animation: fade-in 1s ease-out forwards;
  animation-delay: 3.2s;
  background: #121212;
}

@keyframes show-right {
  100%{
    width: 0;
  }
}

@keyframes fade-in {
  100%{
    opacity: 0;
  }
}

@media (max-width: 700px) {
  html{
    font-size: 75%;
  }
  .header div{
    font-weight: 500;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.4s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
