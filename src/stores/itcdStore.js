import { defineStore } from "pinia";

export const useVeiculoStore = defineStore("veiculo", {
    state: () => ({
        veiculos:[ ],
        load: false,
    }),
    getters: {
        readVeiculo(){
            return this.veiculos
        },
        readLoad(){
            return this.load
        }
    },
    actions:{

    }
});