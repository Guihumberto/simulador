<template>
    <apexchart
      type="line"
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
      name: "Valor das Doações",
      data: [
        350000, 420000, 480000, 390000, 520000,
        510000, 570000, 600000, 580000, 620000,
        640000, 700000
      ]
    }
  ]);
  
  const chartOptions = ref({
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 5,
      colors: ['#43A047'],
      strokeColors: '#fff',
      strokeWidth: 2
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
        text: "Valor (R$)"
      }
    },
    tooltip: {
      theme: theme ? 'dark' : 'light',
      y: {
        formatter: val => `R$ ${val.toLocaleString('pt-BR')}`
      }
    },
    colors: ['#43A047']
  });
  </script>
  