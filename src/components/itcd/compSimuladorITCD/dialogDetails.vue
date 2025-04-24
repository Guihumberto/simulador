<template>
    <v-btn variant="text" class="my-2" icon="mdi-information" @click="dialog = true"></v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                Detalhes
                <v-btn variant="text" icon="mdi-close" @click="dialog = false"></v-btn>
            </v-card-title>
            <v-card-text>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref } from 'vue'

    const dialog = ref(false)
  
</script>

<style scoped>

</style>