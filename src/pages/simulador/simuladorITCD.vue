<template>
    <div class="container">
        <div>
            <breadcrumbs :items="breadItems" />
            <div class="d-flex align-center ga-1">
                <v-icon size="2rem">mdi-city-variant</v-icon>
                <h1>Simulador ITCD</h1>
            </div>
        </div>
        <SimuladorHomeITCD />
    </div>
</template>

<script setup>
    import SimuladorHomeITCD from '@/components/itcd/simuladorHomeITCD.vue';
    
    const breadItems = [
        {
            title: 'Início',
            disabled: false,
            href: '/',
        },
        {
            title: 'Painel ITCD',
            disabled: false,
            href: '/painel/itcd',
        },
        {
            title: 'Simulador ITCD',
            disabled: true,
            href: 'simulador/simuladorITCD',
        },
    ]

</script>

<style scoped>
    .container{
    width: min(100%, 1200px);
    margin-inline: auto;
    height: calc(100vh - 155px);
    padding: 0 .5rem;
    }
</style>