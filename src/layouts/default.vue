<template>
  <v-app :theme="theme ? 'dark':'light'">
    <v-main>
      <div class="headerbar bg-primary">
        <div class="mr-2">SEFAZ MA</div>
        <v-btn @click="theme = !theme" variant="text" :icon="theme ? 'mdi-lightbulb':'mdi-lightbulb-on-10'"></v-btn>
      </div>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
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
</style>
