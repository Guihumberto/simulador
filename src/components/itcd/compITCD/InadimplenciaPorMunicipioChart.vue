<!-- src/components/InadimplenciaPorMunicipioChart.vue -->
<template>
    <apexchart
      type="bar"
      height="350"
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
      data: [350000, 290000, 230000, 200000, 150000, 120000]
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
      categories: [
        "São Luís", "Imperatriz", "Caxias", "Ribamar",
        "Timon", "Santa Inês"
      ],
      labels: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      },
      title: {
        text: "Valor Total (R$)"
      }
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      }
    },
    dataLabels: {
      enabled: true,
      formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
    },
    colors: ['#F44336']
  });
  </script>
  