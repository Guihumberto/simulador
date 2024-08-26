<template>
  <v-app :theme="theme ? 'dark':'light'">
    <v-main>
      <div class="headerbar bg-primary">
        <div class="header">
          <div class="mr-2">SEFAZ MA</div>
          <v-btn @click="theme = !theme" variant="text" :icon="theme ? 'mdi-lightbulb':'mdi-lightbulb-on-10'"></v-btn>
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
.headerbar{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1;
}
.header{
  width: min(900px, 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
}
</style>
