<template>
     <div class="content">
        <v-container fluid>
            <!-- Linha 1: KPIs -->
            <h1 class="text-h4 text-red mb-5">Previsão de Receita ITCD {{ selectedPeriodo }}</h1>
            <v-row>
                <v-col cols="12" md="6" v-for="kpi in kpis" :key="kpi.title">
                    <v-card>
                        <v-card-title class="d-flex justify-space-between align-center">
                            {{ kpi.title }}
                            <DialogDetails />
                        </v-card-title>
                        <v-card-text>
                            <div class="text-h5">{{ kpi.value }}</div>
                            <div class="text-caption" :class="kpi.trend >= 0 ? 'text-success' : 'text-error'">
                            {{ kpi.trend >= 0 ? '+' : '' }}{{ kpi.trend }}%
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <h1 class="text-h4 text-red my-5">Simulador</h1>
            <Calculadora />
            <h1 class="text-h4 text-red my-5">Resumo dos Parametros</h1>
            <h1 class="text-h4 text-red my-5">Cálculo</h1>
        </v-container>
    </div>
</template>

<script setup>
import Calculadora from './compSimuladorITCD/calculadora.vue';
import DialogDetails from './compSimuladorITCD/dialogDetails.vue';

    const selectedPeriodo = (new Date(). getFullYear()) + 1
    const kpis = [
        { title: 'Previsão da Receita', value: 'R$ 18.200.000', trend: 8.3 },
        { title: 'Previsão de Solicitações', value: '3.450', trend: -2.1 },
        { title: 'Previsão de Isenções', value: 'R$ 2.100.000', trend: 5.6 },
        { title: 'Previsão de Inadimplência', value: 'R$ 1.300.000', trend: -1.2 },
    ]

</script>

<style scoped>

</style>