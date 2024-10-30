<template>
  <v-app :theme="theme ? 'dark':'light'">
    <v-main>
      <div class="headerbar">
        <div class="header">
          <div class="mr-2 pa-2 d-flex align-center justify-center"> 
            <img width="25px" src="../assets/brasao.png" /> 
            <h3 class=" ml-2 pt-1">SEFAZ MA</h3> 
            <span class="animate" style="--i:1"></span>
          </div>
          <div style="position: relative;">
          <v-btn @click="theme = !theme" variant="text" :icon="theme ?
          'mdi-lightbulb':'mdi-lightbulb-on-10'"></v-btn>
           <span class="animate" style="--i:2"></span>
          </div>
        </div>
      </div>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
  import { useVeiculoStore  } from '@/stores/veiculosStore'
  import {ref, computed} from 'vue'

  const veiculosStore = useVeiculoStore()

  const load = computed(()=> veiculosStore.readLoad)

  setTimeout(()=>{
    veiculosStore.initMassaTeste()
  }, 1000)

  const theme = ref(true)

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
:root{
  --bg-color:#f8fafc;
  --second-bg-color: #94a3b8;
  --text-color: #ededed;
  --main-color: #1E3A8A;
  --second-color: #42c1e8;
}
.headerbar{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1;
  background: #1E3A8A;
  color: white;
}
.header{
  width: min(900px, 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
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
  }
</style>
