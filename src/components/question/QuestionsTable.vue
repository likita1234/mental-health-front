<script setup>
import QuestionForm from './QuestionForm.vue';

import { ref, onMounted, inject } from 'vue'
import { questionStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { FilterMatchMode, FilterOperator } from 'primevue/api'

// Store states
const { allQuestions } = storeToRefs(questionStore)

// Component states
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'label': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
})
const loading = ref(false)
const selectedQuestions = ref([])
const formDialog = ref(false)

const appState = inject('appState')

onMounted(() => {
    initFilters()
    loadQuestions()
})

// =======> Filters helpers starts
const initFilters = () => {
    filters.value = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'label': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
    }
}

const clearFilters = () => {
    initFilters()
}

const stockClass = (count) => {
    return [
        'border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm',
        {
            'bg-red-100 text-red-900': count === 0,
            'bg-blue-100 text-blue-900': count > 0 && count < 5,
            'bg-teal-100 text-teal-900': count > 5
        }
    ];
};


// ======> Filters helpers ends

const loadQuestions = async () => {
    loading.value = true
    await questionStore.fetchAllQuestions()
    loading.value = false
}

const editQuestion = async (questionId) => {
    // Fetch question details first
    const questionDetails = await questionStore.fetchQuestionDetails(questionId)
    // Then setup edit question
    if (questionDetails) {
        // Load question details on question state on store
        questionStore.editQuestion(questionDetails)
        // open question dialog
        formDialog.value = true
    }
}
</script>

<template>
    <div>
        <DataTable ref="dt" :value="allQuestions" v-model:selection="selectedQuestions" v-model:filters="filters"
            :filters="filters" :loading="loading" :globalFilterFields="['title', 'label', 'description']" resizableColumns
            stripedRows paginator rowHover :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <h4 class="m-0">Manage Questions</h4>
                    <div class="flex gap-2">
                        <span class="p-input-icon-left mb-2">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%" />
                        </span>
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2"
                            @click="clearFilters()" />
                    </div>
                </div>
            </template>
            <template #empty>
                No questions found.
            </template>
            <template #loading>
                Loading questions. Please wait.
            </template>
            <Column field="title[appState.lang]" header="TITLE" style="width: 20%">
                <template #body="slotProps">
                    <div>
                        {{ slotProps.data.title[appState.lang] }}
                    </div>
                </template>
            </Column>
            <Column field="description[appState.lang]" header="DESCRIPTION" style="width: 35%">
                <template #body="slotProps">
                    <div>
                        {{ slotProps.data.description[appState.lang] }}
                    </div>
                </template>
            </Column>
            <Column field="type" header="TYPE" style="width: 10%">
                <template #body="{ data }">
                    <Tag :value="data.type" class="capitalize question" :class="` type-${data.type}`" />
                </template>
            </Column>
            <Column field="optionsCount" header="OPTIONS" style="width: 10%;">
                <template #body="slotProps">
                    <div :class="stockClass(slotProps.data.optionsCount)">
                        {{ slotProps.data.optionsCount }}
                    </div>
                </template>
            </Column>
            <Column field="created_at" header="CREATED AT" style="width:10%" />
            <Column header="ACTIONS" :exportable="false" style="width:15%">
                <template #body="slotProps">
                    <Button icon="pi pi-eye" rounded severity="info" class="mr-2" />
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="editQuestion(slotProps.data._id)" />
                    <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDelete(slotProps.data)" />
                </template>
            </Column>
            <!-- Extra features that could be useful in the future -->
            <!-- <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
            </template> -->
        </DataTable>

        <!-- Question Form -->
        <QuestionForm v-if="formDialog" editMode @hide-dialog="formDialog = false" />
    </div>
</template>