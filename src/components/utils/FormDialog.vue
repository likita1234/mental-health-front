<script setup>
import { ref } from 'vue';

const emit = defineEmits(['hide-dialog', 'submit'])

const props = defineProps({
    header: String,
    width: String
})

// component states
const visible = ref(true)

// functions
const hideDialog = () => {
    emit('hide-dialog', true)
}

</script>

<template>
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width }"
        :breakpoints="{ '1199px': '60vw', '575px': '80vw' }" @hide="hideDialog">
        <!-- Our content goes here -->
        <template #header>
            <slot name="header" />
        </template>

        <slot />


        <template #footer>
            <div class="mt-2">
                <Button label="Cancel" @click="hideDialog" class="mr-2" severity="danger" raised />
                <Button label="Submit" raised @click="emit('submit', true)" />
            </div>
        </template>
    </Dialog>
</template>

