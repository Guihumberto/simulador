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
                :rules="[rules.required, validarDatas]"
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
                :rules="[rules.required, validarDatas]"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn variant="text"
            class="mb-2 pa-0"
            color="success"
            @click="refis = !refis" :append-icon="refis ? 'mdi-close':'mdi-check'">
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
                  v-mask="['##,##', '#,##']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Desconto Multa"
                  variant="outlined"
                  density="compact"
                  v-model="dados.red_multa"
                  prepend-inner-icon="mdi-percent"
                  clearable
                  v-mask="['##,##', '#,##']"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <div class="text-left">
            <v-btn @click="limpar()" class="mr-1">Limpar</v-btn>
            <v-btn type="submit" color="primary">calcular</v-btn>
          </div>
        </v-form>

        <div v-if="result">
          Selic Acumulada + 1% <br>

          <div>
            <h4 class="text-h5 my-3 bg-grey px-2 d-flex align-center"> <v-icon class="mr-1" size="1.5rem">mdi-calculator-variant-outline</v-icon>Cálculo Padrão</h4>
            <v-row>
              <v-col cols="3">Débito</v-col>
              <v-col cols="3">Inicial</v-col>
              <v-col cols="3">Atualizado</v-col>
              <v-col cols="3">Com benefício</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">Principal</v-col>
              <v-col cols="3">{{ dados.principal }}</v-col>
              <v-col cols="3">{{ dados.principal }}</v-col>
              <v-col cols="3">{{ dados.principal }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">Multa</v-col>
              <v-col cols="3">{{ dados.multa}}</v-col>
              <v-col cols="3">{{ dados.multa}}</v-col>
              <v-col cols="3">{{ subtrair(dados.red_multa)  }} </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">Juros</v-col>
              <v-col cols="3">{{ dados.juros }}</v-col>
              <v-col cols="3"></v-col>
              <v-col cols="3">{{ subtrair(dados.red_juros) }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">TOTAL</v-col>
              <v-col cols="3">R$ {{ valor_debito }}</v-col>
              <v-col cols="3"></v-col>
              <v-col cols="3"></v-col>
            </v-row>
          </div>

        </div>

      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { mask } from 'vue-the-mask'
import {VMoney} from 'v-money'

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

const refis = ref(false)
const result = ref(false)

const dados = ref({
  principal: null,
  juros: null,
  multa: null,
  date_vcmto: '',
  date_calculo: dataFormatada,
  red_multa: '',
  red_juros:  ''
})

const valor_debito = computed(() => {
    return converterParaNumero(dados.value.principal) + converterParaNumero(dados.value.multa) + converterParaNumero(dados.value.juros)
})

const converterParaNumero = (valor) => {
  return !!valor
   ? parseFloat(
    valor.replace("R$", "")  // Remove o símbolo de moeda
         .replace(/\./g, "") // Remove separadores de milhar (pontos)
         .replace(",", ".")  // Substitui a vírgula por ponto
         .trim()             // Remove espaços em branco
    )
  : 0
}

const calcular = async () => {
    const { valid } = await form.value.validate()
    if(valid){
        result.value= true
        console.log(dados.value)
    }
}

const limpar = () => {
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

const subtrair = (valor) => {
  const calc = 100 - parseFloat(valor.replace(",", "."));
  return calc
}


</script>

<style lang="scss" scoped>
.content{
  border: 1px solid grey;
  min-height: 75vh;
  padding: 1rem;

}
</style>
