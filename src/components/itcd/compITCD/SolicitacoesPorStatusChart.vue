<!-- src/components/SolicitacoesPorStatusChart.vue -->
<template>
    <apexchart
      type="bar"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </template>
  
  <script setup>
   import { inject, ref } from 'vue';
   const theme = inject('theme');
  
  const series = ref([
    {
      name: "Quantidade",
      data: [300, 120, 35]
    }
  ]);
  
  const chartOptions = ref({
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4
      }
    },
    xaxis: {
      categories: ["Concluídas", "Em Análise", "Indeferidas"]
    },
    dataLabels: {
      enabled: true
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `${val} solicitações`
      }
    },
    colors: ['#4CAF50']
  });
  </script>
  