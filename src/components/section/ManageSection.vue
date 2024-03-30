<script setup>
import { ref } from 'vue';
import SectionTable from './SectionTable.vue'
import SectionForm from './SectionForm.vue';

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
            <SectionTable />
        </div>
        <!-- Question Form Dialog -->
        <SectionForm v-if="formDialog" @hide-dialog="toggleFormDialog(false)" />
    </div>
</template>