<template>
    <div class="text-center">
      <v-btn @click="dialog = true" class="text-lowercase" variant="outlined">
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
          <v-card-text>
            {{ detalhes }}
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