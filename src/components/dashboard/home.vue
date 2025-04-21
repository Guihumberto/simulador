<template>
    <div class="container">
        <div class="d-flex align-center ma-2 ml-4 ga-2">
          <v-icon size="2rem">mdi-view-dashboard</v-icon>
          <h4 class="text-h4">Painel de Informação</h4>
        </div>
        <div class="content">
          <div class="cards">
            <v-item-group selected-class="selected" class="w-100 border rounded-lg">
              <v-container >
                <v-row>
                  <v-col
                    v-for="n in items"
                    :key="n"
                    cols="4"
                    class="col-agg "
                  >
                    <v-item v-slot="{ isSelected, selectedClass, toggle }">
                      <v-card
                        :class="['d-flex align-center', selectedClass]"
                        variant="outlined"
                        class="card"
                        dark
                        @click="() => { toggle(); selectResumo(n.title, isSelected) }"
                        hover
                      >
                        <div
                          class="text-h5 flex-grow-1"
                        >
                          <div class="d-flex align-center justify-center ga-1">
                            <v-icon>{{ n.icon }}</v-icon> <span v-show="!mobile">{{ isSelected ? n.title : n.title }}</span>
                          </div>
                          <v-btn class="mt-2" :color="isSelected ? 'white':'primary'" @click.stop="goTo(n.id)" variant="outlined">Entrar</v-btn>
                        </div>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </div>

          <div class="totais border rounded-lg">
            <div class="tabela">
              <h2>{{ resumo || 'Resumo Geral' }}</h2>
              <!-- Tabela ou cards aqui -->
              <p>Lista de dados, filtros, e botões conforme o esboço</p>
            </div>
            <div class="valor">
                <h2>Totais Arrecadados</h2>
                <p>R$ 00.000,00</p>
            </div>
          </div>

          <div class="painel border rounded-lg pa-2">
            <v-row no-gutters>
              <v-col>
                <v-sheet class="pa-2 py-10 ma-1 text-center rounded-lg" :class="theme ? 'bg-blue-darken-4' : 'bg-blue-lighten-5'">
                  IPVA
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet class="pa-2 py-10 ma-1 text-center rounded-lg" :class="theme ? 'bg-blue-darken-4' : 'bg-blue-lighten-5'">
                  ITCD
                </v-sheet>
              </v-col>

              <v-responsive width="100%"></v-responsive>

              <v-col>
                <v-sheet class="pa-2 py-10 ma-1 text-center rounded-lg" :class="theme ? 'bg-blue-darken-4' : 'bg-blue-lighten-5'">
                  Dados Gerais
                </v-sheet>
              </v-col>

              <v-col>
                <v-sheet class="pa-2 py-10 ma-1 text-center rounded-lg" :class="theme ? 'bg-blue-darken-4' : 'bg-blue-lighten-5'">
                  Detalhes
                </v-sheet>
              </v-col>
            </v-row>
          </div>

          <v-list class="border rounded-lg resumo " >
            <v-list-subheader>Arrecadação Diária</v-list-subheader>
            <v-list-item v-for="item, i in 30" :key="i">
              Informação {{ i + 1 }}
            </v-list-item>
          </v-list>
        </div>
        
    </div>
</template>

<script setup>
  import { ref, inject } from 'vue'

  import { useDisplay } from 'vuetify'
  const { mobile } = useDisplay()

  import { useRouter } from 'vue-router'
  const router = useRouter()

  const theme = inject('theme')

  const items = [
    { id:1, icon: 'mdi-car', title: "IPVA"},
    { id:2, icon: 'mdi-city-variant', title: "ITCD"},
    { id:3, icon: 'mdi-calculator-variant-outline', title: "Simuladores"}
  ]

  const resumo = ref('Resumo Geral')

  const goTo = (id) => {
    if(id === 1) router.push('/painel/ipva')
    if(id === 2) router.push('/painel/itcd')
    if(id === 3) router.push('/simuladores')
  }

const selectResumo =  (title, selected) => {
  if(selected || title == 'Simuladores') {
    resumo.value = `Resumo Geral` 
    return
  } 
  resumo.value = `Resumo ${title}`
}
</script>

<style scoped>
.container{
  width: min(100%, 1200px);
  margin-inline: auto;
  height: calc(100vh - 155px);
}

.content{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
}
.col-agg{
}
.cards{
}
.card{
  padding: 2rem;
  border: 1px solid rgb(233, 229, 229);
  user-select: none;
}
.card div{
  text-align: center;
}
.selected{
  background-color: var(--main-color);
  color: white;
}
.totais{
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
.painel{
  
}
.resumo{
  flex-grow: 1;
  margin: .5rem;
  overflow-y: auto;
  min-height: 0; 
}

@media (max-width: 768px) {
  .col-agg{
    padding: .1rem;
  }
  .card{
    padding-left: 0rem;
    padding-right: 0rem;
    text-align: center;
  }
}
  
</style>