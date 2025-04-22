<template>
    <div class="content">
        <v-container fluid>
            <!-- Linha 1: KPIs -->
            <v-row>
                <v-col cols="12" md="3" v-for="kpi in kpis" :key="kpi.title">
                    <v-card>
                    <v-card-title>{{ kpi.title }}</v-card-title>
                    <v-card-text>
                        <div class="text-h5">{{ kpi.value }}</div>
                        <div class="text-caption" :class="kpi.trend >= 0 ? 'text-success' : 'text-error'">
                        {{ kpi.trend >= 0 ? '+' : '' }}{{ kpi.trend }}%
                        </div>
                    </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Linha 2: Gráficos principais -->
            <v-row>
                <v-col cols="12" md="8">
                    <v-card>
                        <v-card-title>Arrecadação Mensal</v-card-title>
                        <v-card-text>
                            <!-- Gráfico de linhas ou barras aqui -->
                            <ArrecadacaoMensalChart />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Inadimplência por Município</v-card-title>
                        <v-card-text>
                            <!-- Gráfico de pizza aqui -->
                            <!-- <TipoTransmissaoChart /> -->
                            <InadimplenciaPorMunicipioChart />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Linha 3: Doações, isenções, inadimplência -->
            <v-row>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Doações X Causas Mortis</v-card-title>
                        <v-card-text>
                           <TipoTransmissaoChart />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Doações</v-card-title>
                        <v-card-text>
                            <DoacoesChart />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Inadimplência</v-card-title>
                        <v-card-text>
                            <!-- <InadimplenciaMensalChart /> -->
                            <InadimplenciaProporcaoChart />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

             <!-- Linha 4: Doações, isenções, inadimplência -->
            <v-row>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Isenções</v-card-title>
                        <v-card-text>
                            <IsencoesMensaisChart />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Isenções por Tipo</v-card-title>
                        <v-card-text>
                            <!-- <IsencoesPorTipoChart /> -->
                            <IsencoesPorTipoValoresChart />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Inadimplência</v-card-title>
                        <v-card-text>
                            <InadimplenciaMensalChart />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Linha 5: Tempo médio e distribuição geográfica -->
            <v-row>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Solicitacoes Mensais</v-card-title>
                        <v-card-text>
                           <SolicitacoesPorStatusChart />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Solicitações por Status</v-card-title>
                        <v-card-text>
                          <SolicitacoesMensaisChart />
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-title>Solicitações por Tipo</v-card-title>
                        <v-card-text>
                            <SolicitacoesPorTipoChart />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Linha 6: Tempo médio e distribuição geográfica -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-card>
                    <v-card-title>Tempo Médio de Processamento</v-card-title>
                    <v-card-text>
                        <TempoMedioChart />
                    </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card>
                    <v-card-title>Distribuição por Município</v-card-title>
                    <v-card-text>
                        <DistribuicaoMapa />
                    </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
    import ArrecadacaoMensalChart from './compITCD/ArrecadacaoMensalChart.vue';
    import DoacoesChart from './compITCD/DoacoesChart.vue';
    import InadimplenciaMensalChart from './compITCD/InadimplenciaMensalChart.vue';
    import InadimplenciaPorMunicipioChart from './compITCD/InadimplenciaPorMunicipioChart.vue';
    import InadimplenciaProporcaoChart from './compITCD/InadimplenciaProporcaoChart.vue';
    import IsencoesMensaisChart from './compITCD/IsencoesMensaisChart.vue';
    import IsencoesPorTipoChart from './compITCD/IsencoesPorTipoChart.vue';
    import IsencoesPorTipoValoresChart from './compITCD/IsencoesPorTipoValoresChart.vue';
    import SolicitacoesMensaisChart from './compITCD/SolicitacoesMensaisChart.vue';
    import SolicitacoesPorStatusChart from './compITCD/SolicitacoesPorStatusChart.vue';
    import SolicitacoesPorTipoChart from './compITCD/SolicitacoesPorTipoChart.vue';
    import TipoTransmissaoChart from './compITCD/TipoTransmissaoChart.vue';

    const kpis = [
        { title: 'Total Arrecadado', value: 'R$ 18.200.000', trend: 8.3 },
        { title: 'Solicitações', value: '3.450', trend: -2.1 },
        { title: 'Isenções', value: 'R$ 2.100.000', trend: 5.6 },
        { title: 'Inadimplência', value: 'R$ 1.300.000', trend: -1.2 },
    ]
</script>

<style scoped>
.content{
    min-height: 100vh;
    padding-bottom: 10rem;
}

</style>