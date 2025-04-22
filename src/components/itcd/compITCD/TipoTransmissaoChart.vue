<!-- src/components/TipoTransmissaoChart.vue -->
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
  
  const series = ref([65, 35]); // % valores: Doação, Causa Mortis
  
  const chartOptions = ref({
    labels: ["Doação", "Causa Mortis"],
    colors: ['#4CAF50', '#FFC107'],
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
  