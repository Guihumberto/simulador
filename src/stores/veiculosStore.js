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
            valor_lcmto: 2000.00,
            valor_pago: 1000.00   
        },
        load: true
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
        }
    },
    actions:{
        popularVeiculos(tipo, veiculo){
            for(let i = 1; i <= 100000; i++){
                veiculo.tipo = tipo
                this.veiculos.push(veiculo)
            }
        },
        async initMassaTeste(){
            try {
                for(let i = 1; i <= 8; i++){
                    await this.popularVeiculos(i, this.veiculo)
                }
            } catch (error) {
                console.log('nao carregou');
            } finally {
                this.load = false
                console.log('carregamento completo');
            }
        }
    }
});