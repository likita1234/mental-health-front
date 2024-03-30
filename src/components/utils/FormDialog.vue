<script setup>
import { ref } from 'vue';

const emit = defineEmits(['hide-dialog', 'submit'])

const props = defineProps({
    header: String,
    width: String,
    hideSubmission: {
        type: Boolean,
        default: false
    }
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
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="hideDialog">
        <!-- Our content goes here -->
        <template #header>
            <slot name="header" />
        </template>

        <slot />


        <template #footer>
            <div class="mt-2">
                <Button @click="hideDialog" class="mr-2" severity="danger" raised>
                    <slot name="cancel-label">Cancel</slot>
                </Button>
                <Button v-if="!hideSubmission" label="Submit" raised @click="emit('submit', true)" />
            </div>
        </template>
    </Dialog>
</template>
