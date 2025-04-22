<!-- src/components/IsencoesPorTipoChart.vue -->
<template>
    <apexchart
      type="donut"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </template>
  
  <script setup>
   import { inject, ref } from 'vue';
   const theme = inject('theme');
  
  const series = ref([40, 25, 20, 15]); // percentuais aproximados
  
  const chartOptions = ref({
    labels: ["Imóvel Único", "PCD", "Judicial", "Outros"],
    colors: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
    legend: {
      position: 'bottom'
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `${val}%`
      }
    }
  });
  </script>
  