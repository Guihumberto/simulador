<template>
    <div class="container">
      <v-breadcrumbs :items="items" class="ml-n4">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
        <h1 class="text-h5">Painel IPVA</h1>
    </div>
</template>

<script setup>

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