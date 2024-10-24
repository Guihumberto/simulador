<template>
  <div class="content">
      <div>
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
                :rules="[rules.required]"
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
          <div class="mb-5 ml-1">
            <v-text-field
                label="Valor do Débito"
                variant="solo"
                density="compact"
                v-money="moneyOptions"
                v-model="valor_debito"
                prepend-inner-icon="mdi-cash-multiple"
                readonly
              ></v-text-field>
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
            class="mb-2 pa-0"
            color="success"
            @click="refis = !refis" :append-icon="refis ? 'mdi-arrow-down':'mdi-arrow-right'">
            Informar Benefício/Redução</v-btn>
          <div v-if="refis">
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Desconto Juros"
                  variant="outlined"
                  density="compact"
                  v-model="dados.red_juros"
                  prepend-inner-icon="mdi-percent"
                  clearable
                  v-mask="['###,##', '##,##', '#,##']"
                ></v-text-field>
                <v-chip
                  density="compact"
                  class="mr-1 mb-2"
                  @click="dados.red_juros = al.value"
                  v-for="al, a in  aliquotas_red" :key="a">{{ al.label }}</v-chip>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Desconto Multa"
                  variant="outlined"
                  density="compact"
                  v-model="dados.red_multa"
                  prepend-inner-icon="mdi-percent"
                  clearable
                  v-mask="['###,##', '##,##', '#,##']"
                ></v-text-field>
                <v-chip
                  density="compact"
                  class="mr-1 mb-2"
                  @click="dados.red_multa = al.value"
                  v-for="al, a in  aliquotas_red" :key="a">{{ al.label }}</v-chip>
              </v-col>
            </v-row>
          </div>
          <div class="text-left">
            <v-btn @click="limpar()" class="mr-1">Limpar</v-btn>
            <v-btn type="submit" color="primary">calcular</v-btn>
          </div>
        </v-form>

        <v-alert v-if="msg_erro" type="error" class="mt-5" :text="msg_erro"></v-alert>

        <div v-if="result && !msg_erro" class="border mt-2 pa-2">
          <p class="ml-3 font-weight-bold">Selic Acumulada: {{ (selic_final *100).toFixed(2) }} % </p>
          <v-checkbox
            label="incluir 1%"
            v-model="um_por_cento"
            color="success"
          ></v-checkbox>

          <div>
            <h4 class="text-h5 my-3 bg-grey px-2 d-flex align-center"> <v-icon class="mr-1" size="1.5rem">mdi-calculator-variant-outline</v-icon>Cálculo Padrão</h4>
            <div class="pa-2">
              <v-row>
                <v-col cols="3">Débito</v-col>
                <v-col cols="3">Inicial</v-col>
                <v-col cols="3">Atualizado</v-col>
                <v-col cols="3" v-if="refis">Com benefício</v-col>
              </v-row>
              <v-row>
                <v-col cols="3">Principal</v-col>
                <v-col cols="3">{{ dados.principal }}</v-col>
                <v-col cols="3">{{ dados.principal }}</v-col>
                <v-col cols="3" v-if="refis">{{ dados.principal }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="3">Multa</v-col>
                <v-col cols="3">{{ dados.multa}}</v-col>
                <v-col cols="3">{{ dados.multa}}</v-col>
                <v-col cols="3" v-if="refis"> {{ formatarParaReal(valor_multa_beneficio) }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="3">Juros</v-col>
                <v-col cols="3">{{ dados.juros }}</v-col>
                <v-col cols="3">{{ formatarParaReal(juros_corrigido) }}</v-col>
                <v-col cols="3" v-if="refis">{{ formatarParaReal(valor_juros_beneficio) }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="3">TOTAL</v-col>
                <v-col cols="3">{{ formatarParaReal(valor_debito) }}</v-col>
                <v-col cols="3">{{ formatarParaReal(valor_total_atualizado) }}</v-col>
                <v-col cols="3" v-if="refis">{{ formatarParaReal(valor_total_com_beneficio) }}</v-col>
              </v-row>
            </div>
          </div>

        </div>

      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mask } from 'vue-the-mask'
import {VMoney} from 'v-money'
import selic from './../../public/selic.json';
import { computed } from 'vue';

const form = ref(null)
const hoje = new Date();
const dataFormatada = hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0') + '-' + String(hoje.getDate()).padStart(2, '0');

const rules = {
    required: value => !!value || "campo obrigatório",
    minfield: (v) => (v||'').length >= 3 || "Mínimo 4 caracteres",
    validarDatas: () => {
      if (!dados.date_vcmto.value || !dados.date_calculo.value) return true; // Verifica se ambos os campos têm valores
      return new Date(dados.date_vcmto.value) <= new Date(dados.date_calculo.value) || "Data do Vencimento não pode ser maior que a Data do Cálculo";
    }
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
  principal: '10000.00',
  juros: '10000.00',
  multa: '10000.00',
  date_vcmto: '2020-01-01',
  date_calculo: dataFormatada,
  red_multa: 9000,
  red_juros:  9000
})

const aliquotas_red = ref([
  {label: '90%', value: 9000},
  {label: '95%', value: 9500}
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
          msg_erro.value = "A data do vencimento não poderá ser maior que a data do cálculo"
          result.value = false
          return
        }
        result.value= true
        const start = datam(dados.value.date_vcmto ).split('-').map(item => parseInt(item)).slice(0,2).join('')
        const end = datam(dados.value.date_calculo ).split('-').map(item => parseInt(item)).slice(0,2).join('')
        const acum1 = selic.find(x => x.Periodo == start).selic_acumulada
        const acum2 = selic.find(x => x.Periodo == end).selic_acumulada

        selic_acumulada.value = acum1 - acum2
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
    const valor = juros_corrigido.value
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
.content{
  border: 1px solid grey;
  min-height: 25vh;
  padding: 1rem;

}
</style>
