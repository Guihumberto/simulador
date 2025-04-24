<template>
    <div class="container">
      <div class="mx-5">
        <breadcrumbs :items="breadItems" />
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center ga-1">
            <v-icon size="2rem">mdi-city-variant</v-icon>
            <h1 class="text-h5">Painel ITCD</h1>
            <v-select
              label="Período"
              :items="[2025, 2024, 2023, 2022, 2021, 2020]"
              v-model="selectedPeriodo"
              variant="outlined"
              density="compact"
              class="ml-5"
              hide-details
              style="width: 150px"
            ></v-select>
          </div>
          <v-btn @click="$router.push('/simulador/simuladorITCD')">Ir para simulador ITCD</v-btn>
        </div>
        <h2 class="text-red text-h2">{{ selectedPeriodo }}</h2>
      </div>
        <HomeITCD />
    </div>
</template>

<script setup>
  import HomeITCD from '@/components/itcd/homeITCD.vue';

  const selectedPeriodo = ref(new Date(). getFullYear())


  const breadItems = [
      {
        title: 'Início',
        disabled: false,
        href: '/',
      },
      {
        title: 'Painel ITCD',
        disabled: true,
        href: 'painel/ipva',
      },
  ]

</script>

<style scoped>
.container{
  width: min(100%, 1200px);
  margin-inline: auto;
  height: calc(100vh - 155px);
}

</style>