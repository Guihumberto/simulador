import { defineStore } from "pinia";

export const useVeiculoStore = defineStore("veiculo", {
    state: () => ({
        veiculos:[ ],
        beneficios:[],
        combustivel:[],
        tipo:[],
        anolcmto: [],
        veiculo: {
            anolancamento: 2024,
            description: 'carro modelo',
            anoVeiculo: 2024,
            combustivel: 1,
            tipo: 1,
            uso: 1,
            valor_veiculo: 120000.00,
            valor_lcmto: 3000.00,
            valor_pago: 1000.00   
        },
        load: true,
        carrosMais15Anos: [],
        carrosMenos15Anos: []
    }),
    getters: {
        readVeiculo(){
            return this.veiculos
        },
        readLoad(){
            return this.load
        },
        readQtdRenavan(){
            return this.readVeiculo.length
        },
        readValorPontencial(){
            let soma = 0;

            this.readVeiculo.forEach(item => {
            soma += item.valor_lcmto;
            });

            return soma
        },
        readValorArrecadado(){
            let soma = 0;

            this.readVeiculo.forEach(item => {
            soma += item.valor_pago;
            });

            return soma
        },
        readAtualizacaoValorVeiculosMenos15anos(){
            const veiculos = this.carrosMenos15Anos

            return veiculos
        },
        beneficioCarroMais15anos(){
            const total = this.carrosMais15Anos.reduce((acc, item)=>{ return acc + (item.valor_lcmto)}, 0)
            return [ total, this.carrosMais15Anos.length ]
        },
        readProximoAno(){
            return new Date().getFullYear() + 1
        }
    },
    actions:{
        popularVeiculos(tipo, veiculo){
            for(let i = 1; i <= 2; i++){
                let veiculo_novo = { ...veiculo }
                veiculo_novo.tipo = tipo
                this.veiculos.push(veiculo_novo)
            }
            for(let i = 1; i <=5; i++){
                let veiculo_novo = { ...veiculo }
                veiculo_novo.anoVeiculo = 2009
                this.veiculos.push(veiculo_novo)
            }
            for(let i = 1; i <=5; i++){
                let veiculo_novo = { ...veiculo }
                veiculo_novo.tipo = tipo
                veiculo_novo.anoVeiculo = 2020
                this.veiculos.push(veiculo_novo)
            }
            for(let i = 1; i <=5; i++){
                let veiculo_novo = { ...veiculo }
                veiculo_novo.tipo = 5
                veiculo_novo.anoVeiculo = 2015
                this.veiculos.push(veiculo_novo)
            }
        },
        async initMassaTeste(){
            this.corteVeiculos15anos()
            try {
                for(let i = 1; i <= 5; i++){
                    await this.popularVeiculos(i, this.veiculo)
                }
            } catch (error) {
                console.log('nao carregou');
            } finally {
                this.load = false
                console.log('carregamento completo');
                this.corteVeiculos15anos()
            }
        },
        corteVeiculos15anos(){
            const carros = this.readVeiculo

            this.carrosMais15Anos = carros.filter(carro => this.readProximoAno - carro.anoVeiculo > 15);
            this.carrosMenos15Anos = carros.filter(carro => this.readProximoAno - carro.anoVeiculo <= 15);

            this.depreciacaoVeiculo(this.carrosMenos15Anos)
        },
        depreciacaoVeiculo(item){
            const depreciacaoVeiculos = []
            item.forEach(v => {
                const faixadepreciacao = (this.readProximoAno - v.anoVeiculo)
   
                if(faixadepreciacao <= 3){
                    v.valor_veiculo = v.valor_veiculo * (1 - 0.15)
                }
                else if (faixadepreciacao > 3 && faixadepreciacao <= 5) {
                    v.valor_veiculo = v.valor_veiculo * (1 - 0.10)
                } else {
                    v.valor_veiculo = v.valor_veiculo * (1 - 0.05)
                }
                depreciacaoVeiculos.push(v)
            })

            this.carrosMenos15Anos = [ ...depreciacaoVeiculos ]
        }
    }
});