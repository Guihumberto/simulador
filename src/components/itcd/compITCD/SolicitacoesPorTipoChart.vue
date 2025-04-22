<!-- src/components/SolicitacoesPorTipoChart.vue -->
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
  
  const series = ref([45, 35, 15, 5]); // Ex: 45% doações, 35% herança, etc
  
  const chartOptions = ref({
    labels: ["Doação", "Herança", "Judicial", "Outros"],
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
  