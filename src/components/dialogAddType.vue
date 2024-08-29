<template>
    <div class="text-center">
      <v-btn @click="dialog = true" density="comfortable" variant="outlined" icon="mdi-plus" class="my-1"></v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-plus-circle"
          text="Adicione um novo tipo de veículo."
          title="Adcionar Tipo de Veículo"
        >
          <v-card-text>
  
          </v-card-text>
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Fechar"
              @click="dialog = false"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props:{
      detalhes: Object
    }
  }
</script>