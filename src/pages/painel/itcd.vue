<template>
    <div class="container">
      <div class="ml-5">
        <v-breadcrumbs :items="items" class="ml-n4">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
        <h1 class="text-h5">Painel ITCD</h1>
      </div>
        <HomeITCD />
    </div>
</template>

<script setup>
import HomeITCD from '@/components/itcd/homeITCD.vue';


const items = [
    {
      title: 'Início',
      disabled: false,
      href: '/',
    },
    {
      title: 'Painel IPVA',
      disabled: true,
      href: 'painel/ipva',
    },
  ]

</script>

<style scoped>
.container{
  width: min(100%, 1200px);
  margin-inline: auto;
  height: calc(100vh - 155px);
}

</style>