<script setup>
import QuestionsTable from './QuestionsTable.vue'
</script>


<template>
    <div>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
            </template>
        </Toolbar>
        <div class="card">
            <QuestionsTable />
        </div>

    </div>
</template>