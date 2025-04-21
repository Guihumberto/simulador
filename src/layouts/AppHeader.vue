<template>
    <v-app-bar flat app color="#1E3A8A" density="compact">
      <div class="headerbar">
          <div class="header">
            <div class="mr-2 pa-2 d-flex align-center justify-center" @click="$router.push('/')"> 
              <img width="25px" src="../assets/brasao.png" /> 
              <h3 class=" ml-2 pt-1">SEFAZ</h3> 
              <span class="animate" style="--i:1"></span>
            </div>
            <div style="position: relative;">
              <v-btn @click="theme = !theme" variant="text" :icon="theme ?
              'mdi-lightbulb':'mdi-lightbulb-on-10'"></v-btn>
              <span class="animate" style="--i:2"></span>
            </div>
          </div>
      </div>
    </v-app-bar>
</template>

<script setup>
    import { inject } from 'vue';

    const theme = inject('theme')

</script>

<style scoped>

</style>