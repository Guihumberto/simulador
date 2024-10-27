<template>
  <div class="content_wrapper">
      <div class="content">
        <div class="title_trib">
          <div class="mb-5 d-flex align-center">
            <img
              class="mb-4"
              height="60"
              src="@/assets/brasao.png"
            />
            <div class="ml-2" style="line-height: 1.2;">
              <h2>Simulador SEFAZ</h2>
              <p>Ferramenta de dados e simulação</p>
            </div>
          </div>
          <div class="tabs">
            <!-- <input @click="tab = 1" type="radio" id="ipva" name="tabs">
            <label for="ipva">IPVA</label> -->
            <!-- <input @click="tab = 2" type="radio" id="itcd" name="tabs">
            <label for="itcd">ITCD</label> -->
            <input @click="tab = 3" type="radio" id="juros" name="tabs" checked>
            <label for="juros">JUROS</label>
          </div>
        </div>
        <div class="mb-5">
          <h2 class="d-flex align-center"><v-icon size="1.5rem" class="mr-2">mdi-calculator</v-icon>Calculadora de débito</h2>
          <small class="text-caption">Selic atualizada em 25/10/2024.</small>
        </div>
        <v-form @submit.prevent="calcular()" ref="form">
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Principal"
                variant="outlined"
                density="compact"
                placeholder="Digite o valor do Principal"
                v-money="moneyOptions"
                v-model="dados.principal"
                prepend-inner-icon="mdi-currency-usd"
                :rules="[rules.required, rules.requiprincipal]"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Juros Inicial"
                variant="outlined"
                density="compact"
                placeholder="Digite o valor juros inicial"
                v-money="moneyOptions"
                v-model="dados.juros"
                prepend-inner-icon="mdi-currency-usd"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Multa"
                variant="outlined"
                density="compact"
                placeholder="Digite o valor da multa"
                v-money="moneyOptions"
                v-model="dados.multa"
                prepend-inner-icon="mdi-currency-usd"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="mb-5 pa-2 text-center" style="background: #4B5563;">
            <span class="text-grey">Valor Total do Débito: </span><b class="text-white">{{ formatarParaReal(valor_debito) }}</b> 
          </div>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Data do Vencimento"
                variant="outlined"
                density="compact"
                v-model="dados.date_vcmto"
                prepend-inner-icon="mdi-calendar"
                type="date"
                :rules="[rules.required]"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Data do Cálculo"
                variant="outlined"
                density="compact"
                v-model="dados.date_calculo"
                prepend-inner-icon="mdi-calendar"
                type="date"
                :rules="[rules.required ]"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn variant="text"
            :disabled="!parseInt(converterParaNumero(dados.juros)) && !parseInt(converterParaNumero(dados.multa))"
            class="mb-2 pa-0"
            color="success"
            @click="refis = !refis" :append-icon="refis ? 'mdi-arrow-down':'mdi-arrow-right'">
            Informar Benefício/Redução</v-btn>
          <div v-if="refis && (parseInt(converterParaNumero(dados.juros)) || parseInt(converterParaNumero(dados.multa)))">
            <v-row>
              <v-col cols="12" sm="4" v-if="parseInt(converterParaNumero(dados.juros))">
                <v-text-field
                  label="Desconto Juros"
                  variant="outlined"
                  density="compact"
                  v-model="dados.red_juros"
                  prepend-inner-icon="mdi-percent"
                  clearable
                  v-mask="['###,##', '##,##', '#,##']"
                ></v-text-field>
                <v-chip-group
                  selected-class="text-success"
                  column
                >
                <v-chip
                  density="compact"
                  class="mr-1 mb-2"
                  @click="dados.red_juros = al.value, result = false"
                  v-for="al, a in  aliquotas_red" :key="a">{{ al.label }}</v-chip>
              </v-chip-group>
              </v-col>
              <v-col cols="12" sm="4" v-if="parseInt(converterParaNumero(dados.multa))">
                <v-text-field
                  label="Desconto Multa"
                  variant="outlined"
                  density="compact"
                  v-model="dados.red_multa"
                  prepend-inner-icon="mdi-percent"
                  clearable
                  v-mask="['###,##', '##,##', '#,##']"
                ></v-text-field>
                <v-chip-group
                  selected-class="text-success"
                  column
                >
                  <v-chip
                    density="compact"
                    class="mr-1 mb-2"
                    @click="dados.red_multa = al.value, result = false"
                    v-for="al, a in  aliquotas_red" :key="a">{{ al.label }}</v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </div>
          <div class="btns_form">
            <v-btn variant="text" @click="limpar()" class="mr-1">Limpar</v-btn>
            <v-btn variant="flat" type="submit" color="#1E3A8A">calcular</v-btn>
          </div>
        </v-form>

        <v-alert v-if="msg_erro" type="error" class="mt-5" :text="msg_erro"></v-alert>
        <span id="resultado"></span>
        <div v-if="result && !msg_erro" class="border mt-2 pa-2">
          <p class="ml-3 font-weight-bold">Selic Acumulada: {{ (selic_final *100).toFixed(2) }} % </p>
          <v-checkbox
            label="incluir 1%"
            v-model="um_por_cento"
            color="success"
          ></v-checkbox>

          <div>
            <h4 class="text-h5 my-3 px-2 d-flex align-center"> <v-icon class="mr-1" size="1.5rem">mdi-calculator-variant-outline</v-icon>Cálculo Padrão</h4>
            <div class="pa-2 tabela">
              <v-row>
                <v-col cols="2" :sm="refis? 3 : 4" class="bg-teal d-none d-sm-flex">Débito</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4" class="bg-teal">Inicial</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4" class="bg-teal">Atualizado</v-col>
                <v-col cols="4" sm="3" v-if="refis" class="bg-teal">Benefício</v-col>
              </v-row>
              <v-row>
                <v-col cols="2" :sm="refis? 3 : 4" class="d-none d-sm-flex">Principal</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4">{{ dados.principal }}</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4">{{ dados.principal }}</v-col>
                <v-col cols="4" sm="3" v-if="refis">{{ dados.principal }}</v-col>
              </v-row>
              <v-row v-if="parseInt(converterParaNumero(dados.multa))">
                <v-col cols="2" :sm="refis? 3 : 4" class="d-none d-sm-flex">Multa</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4">{{ dados.multa}}</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4">{{ dados.multa}}</v-col>
                <v-col cols="4" sm="3" v-if="refis"> {{ formatarParaReal(valor_multa_beneficio) }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="2" :sm="refis? 3 : 4" class="d-none d-sm-flex">Juros</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4" >{{ dados.juros }}</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4">{{ formatarParaReal(juros_corrigido) }}</v-col>
                <v-col cols="4" sm="3" v-if="refis">{{ formatarParaReal(valor_juros_beneficio) }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="2" :sm="refis? 3 : 4" class="bg-teal d-none d-sm-flex">TOTAL</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4" class="bg-teal">{{ formatarParaReal(valor_debito) }}</v-col>
                <v-col :cols="refis? 4 : 6" :sm="refis? 3 : 4" class="bg-teal">{{ formatarParaReal(valor_total_atualizado) }}</v-col>
                <v-col cols="4" sm="3" class="bg-teal" v-if="refis">{{ formatarParaReal(valor_total_com_beneficio) }}</v-col>
              </v-row>
            </div>
          </div>

        </div>

      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { mask } from 'vue-the-mask'
import {VMoney} from 'v-money'
import selic from './../../public/selic.json';
import { computed } from 'vue';

const form = ref(null)
const hoje = new Date();
const dataFormatada = hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0') + '-' + String(hoje.getDate()).padStart(2, '0');

const scrollToElement = (item) => {
  const element = document.getElementById(item)
  setTimeout(()=> {
    element.scrollIntoView({ behavior: 'smooth' });
  }, 500)
}

const rules = {
    required: value => !!value || "campo obrigatório",
    minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
    requiprincipal: (v) =>  v != 'R$ 0,00' || "campo não pode ser zero."
}

const moneyOptions = {
  precision: 2, // Casas decimais
  decimal: ',', // Separador decimal
  thousands: '.', // Separador de milhar
  prefix: 'R$ ', // Prefixo (moeda)
};

const um_por_cento = ref(true)
const refis = ref(false)
const result = ref(false)
const selic_acumulada = ref(0)
const msg_erro = ref(null)


const dados = ref({
  principal: null,
  juros: null,
  multa: null,
  date_vcmto: null,
  date_calculo: dataFormatada,
  red_multa: "0.00",
  red_juros:  "0.00"
})


watch(dados.value.juros, (newjuros) => {
  console.log("oi")
})



const aliquotas_red = ref([
  {label: '90%', value: 9000},
  {label: '95%', value: 9500},
  {label: '100%', value: 10000}
])

const valor_debito = computed(() => {
    return  (parseFloat(converterParaNumero(dados.value.principal)) +
            parseFloat(converterParaNumero(dados.value.multa)) +
            parseFloat(converterParaNumero(dados.value.juros))).toFixed(2)
})

const selic_final = computed(() => {

  return um_por_cento.value
  ? selic_acumulada.value + 0.01
  : selic_acumulada.value
})

const converterParaNumero = (valor) => {
  return !!valor
   ? valor.replace("R$", "")
         .replace(/\./g, "")
         .replace(",", ".")
         .trim()
     : 0
}
function datam(data) {
  let novaData = new Date(data);
  novaData.setMonth(novaData.getMonth() - 1);

  if (novaData.getDate() !== new Date(data).getDate()) {
    novaData.setDate(0);
  }

  return novaData.toISOString().split('T')[0];
}

const calcular = async () => {
    msg_erro.value = null
    const { valid } = await form.value.validate()
    if(valid){
        if(valida_data(dados.value.date_vcmto, dados.value.date_calculo)){
          um_por_cento.value = false
          selic_acumulada.value = 0.00
          scrollToElement('resultado')
          return
        } else {
          um_por_cento.value = true
        }
        result.value= true
        const start = datam(dados.value.date_vcmto ).split('-').map(item => parseInt(item)).slice(0,2).join('')
        const end = datam(dados.value.date_calculo ).split('-').map(item => parseInt(item)).slice(0,2).join('')
        const acum1 = selic.find(x => x.Periodo == start).selic_acumulada
        const acum2 = selic.find(x => x.Periodo == end).selic_acumulada

        selic_acumulada.value = acum1 - acum2
        scrollToElement('resultado')
    }
}

const limpar = () => {
  result.value = false
  msg_erro.value = null
  dados.value = {
    principal: null,
    juros: null,
    multa: null,
    date_vcmto: '',
    date_calculo: dataFormatada,
    red_multa: '',
    red_juros:  ''
  }
}

const formatarParaReal = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor);
}

const juros_corrigido = computed(() => {
  return (parseFloat(converterParaNumero(dados.value.principal)) *
         parseFloat(selic_final.value) +
         parseFloat(converterParaNumero(dados.value.juros))).toFixed(2)
})

const valor_total_atualizado = computed(() => {
  return (parseFloat(converterParaNumero(dados.value.principal)) +
         parseFloat(juros_corrigido.value) +
         parseFloat(converterParaNumero(dados.value.multa))).toFixed(2)
})

const valor_multa_beneficio = computed(()=> {
    const valor = converterParaNumero(dados.value.multa)
    let percentual = 100 - dados.value.red_multa.replace(',', '.')
    const valorfinal = (valor * percentual/100).toFixed(2)
    return valorfinal
})

const valor_juros_beneficio = computed(()=> {
   const valor = converterParaNumero(dados.value.juros)
    let percentual = 100 - dados.value.red_juros.replace(',', '.')
    const valorfinal = (valor * percentual/100).toFixed(2)
    return valorfinal
})

const valor_total_com_beneficio = computed(() => {
  return (parseFloat(converterParaNumero(dados.value.principal)) +
         parseFloat(valor_juros_beneficio.value) +
         parseFloat(valor_multa_beneficio.value)
        ).toFixed(2)
})

const valida_data =(start, end) => {
  const dataStart = new Date(start);
  const dataEnd = new Date(end);

  return dataStart > dataEnd;
}

</script>

<style lang="scss" scoped>
.content_wrapper{
  margin: 0 .3rem;
  margin-top: 4rem;
}
.content{
  width: min(900px, 100%);
  margin-inline: auto;
  border: 1px solid grey;
  min-height: 25vh;
  padding: 1rem;
}
.tabela{
  overflow-y: hidden;
  overflow-x: auto;
}
.btns_form{
  text-align: left;
  margin-top: 2rem
}
.title_trib {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 1s ease-in-out;
  width: 100%;
}
.tabs{
  display: flex;
  height: 2rem;
  border-block-end: 1px solid #e9ebec;
  width: 200px
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
@media (max-width: 900px) {
  .title_trib{
    flex-direction: column;
    align-items: start;
    margin-right: 1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  }
}
@media (max-width: 606px) {
  .title_trib{
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 500px) {
  .v-col-4 {
    font-size: .8rem;
  }
  .btns_form{
    text-align: center;
    margin-top: 2rem
  }
}
</style>
