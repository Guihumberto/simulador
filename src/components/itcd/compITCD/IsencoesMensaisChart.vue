<!-- src/components/IsencoesMensaisChart.vue -->
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
      name: "Isenções (R$)",
      data: [
        180000, 200000, 220000, 250000, 230000,
        260000, 240000, 280000, 270000, 260000,
        300000, 320000
      ]
    }
  ]);
  
  const chartOptions = ref({
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
      ]
    },
    yaxis: {
      labels: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      },
      title: {
        text: "Valor das Isenções"
      }
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      }
    },
    colors: ['#FF9800']
  });
  </script>
  