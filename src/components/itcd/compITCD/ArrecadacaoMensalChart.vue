<!-- src/components/ArrecadacaoMensalChart.vue -->
<template>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </template>
  
  <script setup>
    import { ref, watch } from 'vue';
    import { useTheme } from 'vuetify';
    const theme = useTheme();

    const isDark = ref(theme.global.current.value.dark);

    watch(() => theme.global.current.value.dark, (val) => {
      isDark.value = val;
      updateTooltipTheme();
    });

    
    const series = ref([
      {
        name: "Arrecadação (R$)",
        data: [1200000, 1500000, 1800000, 1700000, 1600000, 1900000, 2000000, 2100000, 1800000, 1750000, 1900000, 2200000],
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
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
          "Jul", "Ago", "Set", "Out", "Nov", "Dez"
        ]
      },
      yaxis: {
        labels: {
          formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`
        }
      },
      tooltip: {
        theme: isDark.value ? 'dark' : 'light',
        y: {
          formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`
        }
      },
      colors: ['#1976D2']
    });

    function updateTooltipTheme() {
      chartOptions.value.tooltip.theme = isDark.value ? 'dark' : 'light';
    }
  </script>
  