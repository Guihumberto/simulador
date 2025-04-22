<!-- src/components/InadimplenciaMensalChart.vue -->
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
      name: "Valor Inadimplido (R$)",
      data: [
        100000, 120000, 90000, 110000, 105000,
        98000, 115000, 130000, 125000, 140000,
        135000, 150000
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
      labels: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      },
      title: {
        text: "Valor Inadimplido"
      }
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      }
    },
    colors: ['#EF5350']
  });
  </script>
  