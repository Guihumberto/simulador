<!-- src/components/IsencoesPorTipoValoresChart.vue -->
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
      name: "Valor Isento (R$)",
      data: [800000, 500000, 400000, 250000] // valores fictícios
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
        borderRadius: 4,
      }
    },
    dataLabels: {
      enabled: true,
      formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
    },
    xaxis: {
      title: {
        text: "Valor Total (R$)"
      },
      labels: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      },
      categories: ["Imóvel Único", "PCD", "Judicial", "Outros"]
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      }
    },
    colors: ['#26A69A']
  });
  </script>
  