<!-- src/components/SolicitacoesMensaisChart.vue -->
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
      name: "Solicitações",
      data: [120, 135, 140, 150, 165, 180, 175, 160, 155, 170, 190, 200]
    }
  ]);
  
  const chartOptions = ref({
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4
      }
    },
    xaxis: {
      categories: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
      ]
    },
    yaxis: {
      title: {
        text: "Número de Solicitações"
      }
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `${val} solicitações`
      }
    },
    colors: ['#1E88E5']
  });
  </script>
  