<script setup>
import { ref } from 'vue';

const emit = defineEmits(['hide-dialog', 'submitted'])

const props = defineProps({
    header: String,
    width: String
})

// component states
const visible = ref(true)

</script>

<template>
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width }"
        :breakpoints="{ '1199px': '60vw', '575px': '80vw' }" @hide="emit('hide-dialog')">
        <!-- Our content goes here -->
        <template #header>
            <slot name="header"/>
        </template>

        <slot />


        <template #footer>
            <Button label="Cancel" class="mr-2" severity="danger" raised />
            <Button label="Submit" raised />
        </template>
    </Dialog>
</template>

