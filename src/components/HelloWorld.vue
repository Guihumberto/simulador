<template>
  <div class="container">
    <div class="wrapper_content">
      <div class="imgInit" :class="efeito ? 'upDIv':''">
        <img
          class="mb-4"
          height="150"
          src="@/assets/brasao.png"
        />

        <div class="text-center">
          <div class="text-body-2 font-weight-light mb-n1">Bem-vindo ao</div>
          <h1 class="texth3 font-weight-bold">Simulador SEFAZ</h1>
          <div v-if="load" class="my-5">
            <v-progress-linear
              color="cyan"
              indeterminate
            ></v-progress-linear>
            Carregando...
          </div>
          <v-btn :loading="load" @click="entrar()" class="mt-5" variant="outlined" prepend-icon="mdi-calculator-variant">ENTRAR</v-btn>
        </div>
      </div>
      <div :class="efeito2 ? 'upForm': 'tabsWrapper'">
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
            <input @click="tab = 1" type="radio" id="ipva" name="tabs" checked>
            <label for="ipva">IPVA</label>
            <!-- <input @click="tab = 2" type="radio" id="itcd" name="tabs">
            <label for="itcd">ITCD</label> -->
            <input @click="tab = 3" type="radio" id="juros" name="tabs">
            <label for="juros">JUROS</label>
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
                <v-icon  size="2.5rem" class="mr-2" color="teal">mdi-car</v-icon>
                <h2>{{qdtRenavan}}</h2>
              </div>
              Quantidade Renavan
            </div>
            <div class="box">
              <div class="box-item">
                <v-icon  size="2.5rem" class="mr-2" color="teal">mdi-cash</v-icon>
                <h2>{{ formatDecimal(valorPontencial)}}</h2>
              </div>
              Potencial de Arrecadação
            </div>
            <div class="box">
              <div class="box-item">
                <v-icon  size="2.5rem" class="mr-2" color="teal">mdi-gold</v-icon>
                <h2>{{ formatDecimal(valorArrecadado) }}</h2>
              </div>
              Arrecadação até o momento
            </div>
          </div>

          <div class="graficWrapper">
            <div class="grafic">
              <div class="d-flex align-center">
                <v-icon class="mr-1">mdi-cash</v-icon>
                Arrecadação
              </div>
              <div class="text-center">
                <v-progress-circular :model-value="valorArrecadado/valorPontencial * 100" :size="140" :width="42" color="teal">
                  <template v-slot:default> {{ (valorArrecadado/valorPontencial * 100).toFixed(2) }}% </template>
                </v-progress-circular>
              </div>
            </div>
            <div class="boxGrafics">
              <h3 class="mb-3"> <v-icon>mdi-cash-off</v-icon> Benefícios IPVA</h3>
              <div class="isencao">
                <div class="isencao-item">
                  <div>
                    <v-icon class="mr-2">mdi-car-electric</v-icon>
                    Carros Elétricos
                  </div>
                  <div>{{formatDecimal(10)}}</div>
                </div>
                <div class="isencao-item">
                  <div>
                    <v-icon class="mr-2">mdi-car</v-icon>
                    Carros Usados - mais de 15 anos
                  </div>
                  <div>{{formatDecimal(10)}}</div>
                </div>
                <div class="isencao-item">
                  <div>
                    <v-icon class="mr-2">mdi-human-wheelchair</v-icon>
                    PNE
                  </div>
                  <div>{{formatDecimal(10)}}</div>
                </div>
                <div class="isencao-item">
                  <div>
                    <v-icon class="mr-2">mdi-handshake</v-icon>
                    Outros benefícios
                  </div>
                  <div>{{formatDecimal(10)}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="simulador">
            <!-- lista de tipos de veículos -->
            <div class="wrapperBoxSimulator">
              <v-list class="pa-0">
                <div class="d-flex align-center justify-space-between px-4">
                  <span class="text-teal">Escolha o Tipo de Veículo</span>
                  <dialogAddType />
                </div>
                <v-list-item v-for="item, i in tipoVeiculos" :key="i" link color="primary" :value="i" @click="selectType(item)">
                  <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>
                  <v-list-item-title v-text="item.tipo"></v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
            <!-- formulario -->
            <v-form class="formSim" @submit.prevent="calcularSimulacao()" ref="form" v-if="tipoSelect.icon" >
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

                  class="mr-2 w-50"
                  v-model.lazy="item.valor"
                  :rules="[rules.required]"
                  v-money="money"

                >
                <template v-slot:prepend>
                  <v-btn
                    :icon="item.param ? 'mdi-less-than-or-equal': 'mdi-greater-than'" variant="outlined" density="comfortable"
                    :title="item.param ? 'menor ou igual' : 'maior que'"
                     @click="item.param = !item.param">
                  </v-btn>
                </template>
                </v-text-field>
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
              <v-btn @click="copyLast()" variant="text" class="text-lowercase text-caption">copiar para o último</v-btn>
              <!-- aviso -->
              <v-alert v-if="validarFormulario()" class="text-red">
                {{ validarFormulario() }}
              </v-alert>
              <div class="text-center mt-5">
                <v-btn block prepend-icon="mdi-calculator-variant" type="submit" variant="outlined">INCLUIR NO CÁLCULO</v-btn>
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
        <div class="resultado" v-if="tab == 1">
        <h3 class="mb-2"><v-icon size="1.3rem" class="mr-1">mdi-list-box</v-icon>Resultado da Simulação</h3>

        <div class="my-5" v-if="veiculosAdds.length">
          <div v-for="tipo, t in veiculosAdds" :key="t" class="mb-5">
            <div class="d-flex align-center">
              <v-icon size="1.2rem" class="mr-1">{{ tipo.icon }}</v-icon>
              {{ tipo.tipo }}
            </div>
            <ul class="ml-5 mt-2">
              <li
                class="mb-1"
                style="list-style-type: none"
                v-for="pa, p in tipo.parametros"
                v-show="pa.valor && pa.aliquota"
                :key="p">

                <v-chip><v-icon>{{ pa.param ? 'mdi-less-than-or-equal' : 'mdi-greater-than' }}</v-icon></v-chip>   R$ {{ pa.valor }}
                <v-chip><v-icon>mdi-arrow-right</v-icon></v-chip> Alíquota : {{ pa.aliquota }}%
              </li>
            </ul>
          </div>
          <v-btn block color="teal" @click="calculoFinal()">CALCULAR</v-btn>
        </div>

        <v-alert variant="outlined" v-else class="my-5" type="info">
          Adicione os tipos de veículos para iniciar a simulação
        </v-alert variant="outlined">

        <!-- aparecer apos confirmar o calculo -->
        <div v-if="calculo" id="calculofinal">
          Quantidade de Veículos: {{ listVeiculosMenos15anos.length }}
          <div class="boxResultadoWrapper mb-5">
            <div class="boxSimulador text-center">
              <h1>{{ formatDecimal(totalSimulacao) }}</h1>
              <h3>Valor Potencial da Arrecadação</h3>
            </div>
            <div class="boxSimulador  text-center">
              <h1>{{ formatDecimal(totalSimulacao - valorPontencial) }}</h1>
              <h3 :class="(totalSimulacao - valorPontencial) > 0 ? 'text-blue':'text-red'">
                <v-icon>{{(totalSimulacao - valorPontencial) > 0 ?'mdi-arrow-up':'mdi-arrow-down'}}</v-icon>
                {{(totalSimulacao - valorPontencial) > 0 ?'Aumento':'Redução'}} da Arrecadação
              </h3>
            </div>
          </div>
          <div class="border pa-5 bg-grey-lighten-5">
              Valor do IPVA em {{ new Date().getFullYear() +1 }} que será isento com veículos com mais de 15 anos de fabricação:

              {{ formatDecimal(beneficioMais15anos[0]) }} ({{ beneficioMais15anos[1] }})
          </div>
          <div class="text-center">
            <div class="text-left my-5">
              <h4>Informações da Depreciação do Veículo</h4>
              <ul class="ml-5">
                <li>Nos primeiros 3 anos: A depreciação costuma ser mais acentuada, em torno de 15% a 20% ao ano.</li>
                <li>Após os primeiros 3 anos: A depreciação tende a desacelerar, ficando entre 10% a 15% ao ano.</li>
                <li>Após 5 anos: A depreciação anual pode diminuir ainda mais, para algo entre 5% a 10% ao ano.</li>
              </ul>
              <h4 class="mt-5">Informações gerais consideradas na simulação</h4>
                <ul class="ml-5">
                  <li>Veículos com mais de 15 anos são desconsiderados do cálculo.</li>
                  <li>Veículos Elétricos adquiridos no Estado do Maranhão são isentos.</li>
                  <li>Outros benefícios aplicados ao IPVA sào desconsiderados no cálculo.</li>
                  <li>A depreciação dos veículos são aplicados em seus menores valores.</li>
                  <li>Prováveis veículos adquiridos futuramente ou transferências realizadas não são consideradas no cálculo da simulação.</li>
                </ul>
            </div>
            <dialogDetails :detalhes="this.calculoDet" />
            <v-btn variant="text" @click="newCalculo()" class="text-caption">nova simulação</v-btn>
          </div>
        </div>
        </div>
        <div class="tab-content-3" v-if="tab == 3">
           <h2 class="d-flex align-center"><v-icon size="1.5rem" class="mr-2">mdi-calculator</v-icon>Calculadora de débito</h2>
          <small class="text-caption">Selic atualizada em 25/10/2024.</small>
          <juros />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mask } from 'vue-the-mask'
  import { useVeiculoStore  } from '@/stores/veiculosStore'
  import {VMoney} from 'v-money'

  const veiculosStore = useVeiculoStore()

  export default {
    directives:{ mask, money: VMoney },
    data(){
      return{
        efeito: false,
        efeito2:false,
        tab: 1,
        parametros: [
          {valor: null, aliquota: null, param: true},
          {valor: null, aliquota: null, param: true},
        ],
        rules:{
            required: (value) => !!value || "Campo obrigatório",
            mincpf: (v) => (v||'').length == 14 || "11 dígitos",
            minnome: (v) => (v||'').length > 4 || "mínimo de 4 caracteres"
        },
        tipoVeiculos:[
          {id:1, tipo: 'Caminhões', icon: 'mdi-truck-minus', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
          {id:2, tipo: 'Ônibus e microônibus', icon: 'mdi-bus-side', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
          {id:3, tipo: 'Caminhonetes cabine simples - até 3 passageiros', icon: 'mdi-car-pickup', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
          {id:4, tipo: 'Motocicletas, ciclomotores, motonetas, triciclos e qudriciclos', icon: 'mdi-motorbike', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
          {id:5, tipo: 'Embarcações', icon: 'mdi-ferry', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
          {id:6, tipo: 'Aeronaves', icon: 'mdi-airplane', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
          {id:7, tipo: 'Veículos de Locadoras', icon: 'mdi-car-multiple', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
          {id:8, tipo: 'Demais Veículos', icon: 'mdi-car-side', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true},
            ],
          },
        ],
        tipoSelect: {
          id:0, tipo: '', icon: '', parametros: [
              {valor: null, aliquota: null, param: true},
              {valor: null, aliquota: null, param: true}]
        },
        veiculosAdds:[],
        anoSelect: 2024,
        calculo: false,
        calculoDet: null,
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false /* doesn't work with directive */
        }
      }
    },
    computed:{
      beneficioMais15anos(){
        return veiculosStore.beneficioCarroMais15anos
      },
      lastParametro(){
        return this.tipoSelect.parametros.length - 1
      },
      listVeiculos(){
        return veiculosStore.readVeiculo
      },
      listVeiculosMenos15anos(){
        return veiculosStore.readAtualizacaoValorVeiculosMenos15anos
      },
      rulesParam(){
        let rules = []
        this.veiculosAdds.forEach( x => {
          x.parametros.forEach(p => {
            let object = {
              type: x.id,
              parameter: p.param ? 'lte' : 'gt',
              value: (parseFloat(p.valor.replace(/\D/g, '')) / 100 ).toFixed(2),
              percent: p.aliquota.replace(',', '.') * 0.01

            }
            console.log(object.parameter);
            rules.push(object)
          })

        })

        return rules
      },
      load(){
        return veiculosStore.readLoad
      },
      qdtRenavan(){
        return veiculosStore.readQtdRenavan
      },
      valorPontencial(){
        return veiculosStore.readValorPontencial
      },
      valorArrecadado(){
        return veiculosStore.readValorArrecadado
      },
      readVeiculosNaoIncluidos(){
            let excluir = this.veiculosAdds.map(x => x.id)
            let list = this.listVeiculos.filter(x => !excluir.includes(x.tipo)).map(x => x.valor_lcmto)
            const sum = list.reduce((acc, value) => acc + value, 0)
            return sum
      },
      totalSimulacao(){
        const sum = Object.values(this.calculoDet).reduce((acc, value) => acc + value, 0);
        return sum + this.readVeiculosNaoIncluidos
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
        this.tipoSelect.parametros.push({valor: '', aliquota: null, param: true})
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
          const index = this.veiculosAdds.findIndex(item => item.id === this.tipoSelect.id);

          if (index !== -1) {
              // Substituir o objeto existente
              this.veiculosAdds[index] = this.tipoSelect;
          } else {
              this.veiculosAdds.push(this.tipoSelect)
          }

        }
      },
      validarFormulario(){
        const primeiroObjeto = this.tipoSelect.parametros[1]

        if(this.tipoSelect.parametros.length > 1) {

          const ultimoObjeto = this.tipoSelect.parametros[this.tipoSelect.parametros.length - 2]
          const novoObjeto = this.tipoSelect.parametros[this.tipoSelect.parametros.length - 1]

          if(novoObjeto.aliquota && ultimoObjeto.aliquota){
                if(novoObjeto.param && ultimoObjeto.param){
                  if(novoObjeto.valor < ultimoObjeto.valor || novoObjeto.aliquota < ultimoObjeto.aliquota) return 'Existem valores se sobrepondo.'
                  if(novoObjeto.valor > ultimoObjeto.valor && novoObjeto.aliquota > ultimoObjeto.aliquota){
                    return false
                  }  else {
                    if(novoObjeto.aliquota && novoObjeto.valor) return 'Quando o último campo for menor ou igual, o valor e a alíquota da dessa faixa precisa ser maior que da faixa anterior'
                  }
                }
                if(!novoObjeto.param && ultimoObjeto.param && novoObjeto.valor > ultimoObjeto.valor) return 'Existem faixas de valores não parametrizados.'
          }

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
      },
      formatDecimal(value) {
        return parseFloat(value).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      },
      copyLast(){
        const index = this.tipoSelect.parametros.length - 1
        const indexcopy = this.tipoSelect.parametros.length - 2
        this.tipoSelect.parametros[index] = {
          valor: this.tipoSelect.parametros[indexcopy].valor,
          aliquota: null,
          param: false
        }
      },
      calculoFinal(){
        this.calculo = true
        const vehicles = this.listVeiculosMenos15anos
        const totalsByType = {};

        vehicles.forEach(vehicle => {
            // Encontra as regras aplicáveis para o tipo e valor do veículo
            const applicableRules = this.rulesParam.filter(rule => {
                if (rule.type !== vehicle.tipo) return false;
                if (rule.parameter === "lte" && vehicle.valor_veiculo <= rule.value) {
                  console.log(vehicle.valor_veiculo);
                  console.log('lte', rule);
                  return true;
                }
                if (rule.parameter === "gt" && vehicle.valor_veiculo > rule.value) {
                  console.log(vehicle.valor_veiculo);
                  console.log('gt', rule);
                  return true;
                }
                return false;
            });

            // Calcula o valor aplicando o percentual
            const totalValue = applicableRules.reduce((acc, rule) => {
                return acc + (vehicle.valor_veiculo * rule.percent);
            }, 0);

            // Soma o total calculado ao tipo correspondente
            if (totalsByType[vehicle.tipo]) {
                totalsByType[vehicle.tipo] += totalValue;
            } else {
                totalsByType[vehicle.tipo] = totalValue;
            }
        });

        this.calculoDet = totalsByType;

        setTimeout(() => {
          const element = document.getElementById('calculofinal')
          element.scrollIntoView({behavior: "smooth"})
        }, 1000)

      },
      newCalculo(){
        this.calculo = false
        this.veiculosAdds = []
        this.calculoDet = null
      },
    }
  }
</script>

<style>
.container{
  min-height: 80vh;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}
.wrapper_content{
  width: min(900px, 100%);
  /* margin-inline: auto; */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  padding: 1rem;;
}
.imgInit{
  opacity: 0;
  transition: .5s ease-in-out;
  animation: aparecer .5s ease-in forwards;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
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
  width: 100%;
  margin-inline: 0 auto;
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
  gap: 1rem;
}
.grafic{
  width: 50%;
  height: 200px;
}
.boxGrafics{
  width: 50%;
  height: 200px;
}
.simulador, .boxGrafics, .grafic, .box, .resultado, .content_itcd {
  padding: 1rem;
  border: 1px solid grey;
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
  width: 50%;
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
  justify-content: space-between;
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
.texth3{
  font-size: rem;
  transition: 1s ease;
}
@media (max-width: 606px) {
  .title_trib{
    justify-content: center;
    align-items: center;
  }
  .simulador, .resultado {
    max-width: 370px;
  }
}
@media (max-width: 400px){
  .texth3{
    font-size: 2rem;
  }
}
</style>
