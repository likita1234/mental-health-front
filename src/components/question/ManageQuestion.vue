<script setup>
import QuestionsTable from './QuestionsTable.vue'
</script>


<template>
    <div>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                    :disabled="!selectedProducts || !selectedProducts.length" />
            </template>
            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
                    class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
            </template>
        </Toolbar>
        <div class="card">
            <QuestionsTable />
        </div>

    </div>
</template>