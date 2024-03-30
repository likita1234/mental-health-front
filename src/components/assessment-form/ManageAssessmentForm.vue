<script setup>
import { ref } from 'vue';
import AssessmentFormTable from './AssessmentFormTable.vue'
import AssessmentForm from './AssessmentForm.vue'

const formDialog = ref(false)

const toggleFormDialog = (flag) => {
    formDialog.value = flag
}
</script>


<template>
    <div>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="success" @click="toggleFormDialog(true)" class="mr-2" />
            </template>
        </Toolbar>
        <div class="card">
            <AssessmentFormTable />
        </div>
        <!-- Question Form Dialog -->
        <AssessmentForm v-if="formDialog" @hide-dialog="toggleFormDialog(false)" />
    </div>
</template>