<template>
    <v-breadcrumbs :items="breadItems" class="ml-n4">
        <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
    </v-breadcrumbs>
</template>

<script setup>
    const props = defineProps({
        breadItems: {
            type: Array,
            required: true,
        }
    })

</script>

<style scoped>

</style>