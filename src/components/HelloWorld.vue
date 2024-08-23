<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div :class="efeito ? 'upDIv':''">
        <v-img
          class="mb-4"
          height="150"
          src="@/assets/brasao.png"
        />

        <div class="text-center">
          <div class="text-body-2 font-weight-light mb-n1">Bem-vindo ao</div>
          <h1 class="text-h3 font-weight-bold">Simulador SEFAZ</h1>
          <v-btn @click="entrar()" class="mt-5" prepend-icon="mdi-calculator-variant">ENTRAR</v-btn>
        </div>
      </div>

      <div :class="efeito2 ? 'upForm': 'tabsWrapper'">
        <div class="title_trib">
          <div class="mb-5">
            <h2>Simulador SEFAZ</h2>
            <p>Ferramenta de dados e simulação</p>
          </div>
          <div class="tabs">
            <input @click="tab = 1" type="radio" id="ipva" name="tabs" checked>
            <label for="ipva">IPVA</label>
            <input @click="tab = 2" type="radio" id="itcd" name="tabs">
            <label for="itcd">ITCD</label>
          </div>
        </div>

        <div class="tab-content-1" v-if="tab == 1">
          <div class="d-flex align-center">
            <v-icon>mdi-car-multiple</v-icon>
            <h2 class="mx-2">IPVA {{ anoSelect }}</h2>
            <v-btn-toggle
              variant="flat"
              divided
              density="compact"
            >
              <v-btn :disabled="anoSelect <= 2020" @click="selectAno(true)">
                <v-icon>mdi-menu-left</v-icon>
              </v-btn>
  
              <v-btn :disabled="anoSelect >= 2024" @click="selectAno(false)">
                <v-icon>mdi-menu-right</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
          <div class="wrapperbox">
            <div class="box">
              <div class="box-item">
                <v-icon  size="2.5rem" class="mr-2">mdi-car</v-icon>
                <h1>2.000.000</h1>
              </div>
              Quantidade Renavan
            </div>
            <div class="box">
              <div class="box-item">
                <v-icon  size="2.5rem" class="mr-2">mdi-currency-usd</v-icon>
                <h1>2.000.000</h1>
              </div>
              Potencial de Arrecadação
            </div>
            <div class="box">
              <div class="box-item">
                <v-icon  size="2.5rem" class="mr-2">mdi-gold</v-icon>
                <h1>2.000.000</h1>
              </div>
              Arrecadação até o momento
            </div>
          </div>
  
          <div class="graficWrapper">
            <div class="grafic">
              Arrecadação
              <div class="text-center">
                <v-progress-circular model-value="60" :size="130" :width="42" color="teal">
                  <template v-slot:default> 60 % </template>
                </v-progress-circular>
              </div>
            </div>
            <div class="boxGrafics">
              <h3 class="mb-3">Benefícios IPVA</h3>
              <div class="isencao">
                <div class="isencao-item">
                  <v-icon class="mr-2">mdi-car-electric</v-icon>
                  Carros Elétricos
                </div>
                <div class="isencao-item">
                  <v-icon class="mr-2">mdi-car</v-icon>
                  Carros Usados
                </div>
                <div class="isencao-item">
                  <v-icon class="mr-2">mdi-home</v-icon>
                  PNE
                </div>
                <div class="isencao-item">
                  <v-icon class="mr-2">mdi-home</v-icon>
                  Outros benefícios
                </div>
              </div>
            </div>
          </div>
  
          <div class="simulador">
            <div class="wrapperBoxSimulator">
              <v-list class="pa-0">
                <v-list-subheader>Escolha o Tipo de Veículo</v-list-subheader>
                <v-list-item v-for="item, i in tipoVeiculos" :key="i" link color="primary" :value="i" @click="selectType(item)">
                  <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>
                  <v-list-item-title v-text="item.tipo"></v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <v-form class="formSim" @submit.prevent="calcularSimulacao()" ref="form" v-if="tipoSelect.icon">
              <div class="d-flex justify-center mb-5 bg-primary pa-1">
                <v-icon class="mr-2">{{ tipoSelect.icon }}</v-icon>
                <h3>{{ tipoSelect.tipo }}</h3>
              </div>
              <div class="d-flex mb-2" v-for="item, i in tipoSelect.parametros" :key="i">
                <v-text-field
                  label="Valor"
                  placeholder="150.000,00"
                  variant="outlined"
                  density="compact"
                  prepend-icon="mdi-less-than-or-equal"
                  prepend-inner-icon="mdi-currency-usd"
                  class="mr-2 w-50"
                  v-model="item.valor"
                  :rules="[rules.required]"
                  v-mask="['###.###,##','##.####.####,##']"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Alíquota"
                  placeholder="2"
                  variant="outlined"
                  density="compact"
                  append-inner-icon="mdi-percent"
                  v-model="item.aliquota"
                  :rules="[rules.required]"
                  v-mask="['##,##', '#,##']"
                  clearable
                  class="w-50"
                > 
                  <template v-slot:append>
                    <div>
                      <v-btn 
                        :color="lastParametro == i ? 'green' : 'error'" 
                        density="compact" :icon="lastParametro == i ? 'mdi-plus' : 'mdi-minus'"
                        @click="lastParametro == i ? addParametro() : removeParametro(i)"
                      >
                      </v-btn>
                    </div>
                  </template>
                </v-text-field>
              </div>
              <div class="text-center mt-5">
                <v-btn block prepend-icon="mdi-calculator-variant" type="submit">CALCULAR</v-btn>
                <v-btn 
                  @click="clearAllParametros()" 
                  class="mt-1 text-lowercase text-overline" 
                  density="compact" variant="text">Limpar tudo
                </v-btn>
              </div>
            </v-form>
            <v-alert type="info" v-else>
              Escolha o Tipo de Veículo no menu ao lado 
            </v-alert>
          </div>
        </div>
        <div class="tab-content-2" v-if="tab == 2">
          <h2>ITCD</h2>
          <div class="content_itcd"></div>
        </div>
        <!-- reusultado -->
         <div class="resultado">
          <h3 class="mb-2">Resultado Simulação</h3>
          <div class="my-5" v-if="veiculosAdds.length">
            <div v-for="tipo, t in veiculosAdds" :key="t" class="mb-5">
              {{ tipo.tipo }}
              <ul class="ml-5 mt-2">
                <li 
                  v-for="pa, p in tipo.parametros" 
                  v-show="pa.valor && pa.aliquota"
                  :key="p">Veículos até : R$ {{ pa.valor }} <v-icon>mdi-arrow-right</v-icon> Alíquota : {{ pa.aliquota }}
                </li>
              </ul>
            </div>
          </div>
          <v-alert variant="outlined" v-else class="my-5" type="info">
            Adicione os tipos de veílcuos para iniciar a simulação
          </v-alert variant="outlined">
          <div class="boxResultadoWrapper">
            <div class="boxSimulador">
              <h3>Valor Potencial da Arrecadação</h3>
            </div>
            <div class="boxSimulador">
              <h3>Aumento/Redução da Arrecadação</h3>
            </div>
            <div class="boxSimulador">
              <h3>Aumento/Redução da Arrecadação</h3>
            </div>
          </div>
         </div>
      </div>
    </v-responsive>
  </v-container>
</template>

<script>
  import {mask} from 'vue-the-mask'

  export default {
    directives:{ mask },
    data(){
      return{
        efeito: false, 
        efeito2:false,
        tab: 1,
        parametros: [
          {valor: null, aliquota: null},
          {valor: null, aliquota: null},
        ],
        rules:{
            required: (value) => !!value || "Campo obrigatório",
            mincpf: (v) => (v||'').length == 14 || "11 dígitos",
            minnome: (v) => (v||'').length > 4 || "mínimo de 4 caracteres"
        },
        tipoVeiculos:[
          {id:1, tipo: 'Caminhões', icon: 'mdi-truck-minus', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
          {id:2, tipo: 'Ônibus e microônibus', icon: 'mdi-bus-side', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
          {id:3, tipo: 'Caminhonetes cabine simples - até 3 passageiros', icon: 'mdi-car-pickup', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
          {id:4, tipo: 'Motocicletas, ciclomotores, motonetas, triciclos e qudriciclos', icon: 'mdi-motorbike', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
          {id:5, tipo: 'Embarcações', icon: 'mdi-ferry', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
          {id:6, tipo: 'Aeronaves', icon: 'mdi-airplane', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
          {id:7, tipo: 'Veículos de Locadoras', icon: 'mdi-car-multiple', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
          {id:8, tipo: 'Demais Veículos', icon: 'mdi-car-side', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null},
            ],
          },
        ],
        tipoSelect: {
          id:0, tipo: '', icon: '', parametros: [
              {valor: null, aliquota: null},
              {valor: null, aliquota: null}]
        },
        veiculosAdds:[],
        anoSelect: 2024,
      }
    },
    computed:{
      lastParametro(){
        return this.tipoSelect.parametros.length - 1
      }
    },
    methods:{
      entrar(){
        this.efeito = true
        setTimeout(()=>{
          this.efeito2 = true
        }, 500)
      },
      addParametro(){
        this.tipoSelect.parametros.push({valor: '', aliquota: null})
      },
      removeParametro(indice){
        this.tipoSelect.parametros.splice(indice, 1)
      },
      clearAllParametros(){
        this.tipoSelect.parametros.forEach(x => {
          x.valor = null
          x.aliquota = null
        })
      },
      async calcularSimulacao(){
        const { valid } = await this.$refs.form.validate()
        if(valid){
          this.veiculosAdds.push(this.tipoSelect)
        }
      },
      selectAno(tipo){
        if(tipo){
          this.anoSelect--
        } else {
          this.anoSelect++
        }
      },
      selectType(item){
        this.tipoSelect = item
      }
    }
  }
</script>

<style>
.upDIv{
  transition: .5s ease;
  animation: slideUp .5s ease-in forwards;
}

@keyframes slideUp {
    0%{
        opacity: 1;
        transform: translateY(0);
    }
    100%{
        opacity: 0;
        transform: translateY(-200px);
        display: none;
    }
}
.tabsWrapper{
  display: none;
  transition: .7s ease-in-out;
}
.upForm{
  opacity: 0;
  transition: 1s ease-in-out;
  animation: aparecer .7s ease-in forwards;
  animation-delay: .7s;
}
@keyframes aparecer {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.tabs{
  display: flex;
  height: 3.5rem;
  border-block-end: 1px solid #e9ebec;
  width: 200px;
}
.tabs input {
  display: none;

}
.tabs label{
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #656d7b;
  cursor: pointer;
  transition: color 0.5s ease-in-out;
}
.tabs input:checked + label {
  color: red;
}
.tabs::after {
  pointer-events: none;
  position: absolute;
  content: "";
  inset: 0;
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
}
.wrapperbox{
  display: flex;
  gap: 1rem;
}
.box{
  width: 33%;
  height: 100px;
  text-align: center;
}
.graficWrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.grafic{
  width: 65%;
  height: 200px;
}
.boxGrafics{
  width: 32%;
  height: 200px;
}
.simulador, .boxGrafics, .grafic, .box, .resultado, .content_itcd {
  padding: 1rem;
  border: 1px solid white;
}
.wrapperbox, .graficWrapper, .simulador, .resultado {
  margin-top: 1rem;
}
.simulador{
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}
.formSim{
  width: 50%;
}
.wrapperBoxSimulator {
  width: 50%;
}
.boxResultadoWrapper{
  display: flex;
  gap: 1rem;
}
.boxSimulador{
  width: 48%;
  height: 110px;
  border: 1px solid white;
  padding: 0.5rem;
}
.isencao{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.isencao-item{
  display: flex;
  align-items: center;
}

.title_trib {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 1s ease-in-out;
}
.box-item{
  display: flex;
  align-items: center;
  justify-content: center;
}
.content_itcd{
  height: 50vh;
}
@media (max-width: 900px) {
  .title_trib{
    flex-direction: column;
    align-items: start;
    margin-right: 1rem;
  }
  .wrapperbox{
    flex-direction: column;
    margin-right: 1rem;
  }
  .box{
    width: 100%;
  }
  .graficWrapper{
    flex-direction: column;
    gap: 1rem;
    margin-right: 1rem;
  }
  .grafic{
    width: 100%;
  }
  .boxGrafics{
    width: 100%;
  }
  .simulador{
    flex-direction: column;
    margin-right: 1rem;
  }
  .resultado{
    margin-right: 1rem;
  }
  .boxResultadoWrapper{
    flex-direction: column;
  }
  .wrapperBoxSimulator{
    width: 100%;
  }
  .formSim{
    width: 100%;
  }
  .boxSimulador{
    width: 100%;
  }
  .tabs{
    width: 100%;
    margin-bottom: 1rem;
  }
  .content_itcd{
    margin-right: 1rem;
  }
}
</style>
