<template>
    <div class="text-center pa-4">
      <v-btn @click="dialog = true" class="text-lowercase">
        Detalhar o cálculo
      </v-btn>
  
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          prepend-icon="mdi-details"
          text="Detalhes do aumento potencial da arrecadação comparativo de acordo com o tipo do veículo."
          title="Em construção"
        >
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
  }
</script>