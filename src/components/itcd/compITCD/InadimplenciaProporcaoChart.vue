<!-- src/components/InadimplenciaProporcaoChart.vue -->
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
  
  // Exemplo: 75% pagos, 25% inadimplentes
  const series = ref([75, 25]);
  
  const chartOptions = ref({
    labels: ["Pagos", "Inadimplentes"],
    colors: ['#66BB6A', '#EF5350'],
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
  