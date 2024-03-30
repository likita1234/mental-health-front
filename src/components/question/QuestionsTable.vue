<script setup>
import QuestionForm from './QuestionForm.vue';
import QuestionDetails from './QuestionDetails.vue'

import { ref, onMounted, inject } from 'vue'
import { questionStore } from '@/stores'
import { storeToRefs } from 'pinia';

import { useConfirmComposable } from '@/composables/ConfirmComposable';
import { stockClass } from '@/utils/table-styles'

const { confirmRequest } = useConfirmComposable()
// Store states
const { allQuestions, totalQuestions, limit, page } = storeToRefs(questionStore)

// Component states
const loading = ref(false)
const formDialog = ref(false)
const detailsDialog = ref(false)
const questionDetails = ref(null)

const appState = inject('appState')

onMounted(() => {
    loadQuestions()
})

const loadQuestions = async () => {
    loading.value = true
    setTimeout(async () => {
        await questionStore.fetchAllQuestions()
        loading.value = false
    }, Math.random() * 1000 + 250);
}

const viewDetails = async (id) => {
    questionDetails.value = await questionStore.fetchQuestionDetails(id)
    detailsDialog.value = true
}

const editQuestion = async (id) => {
    // Fetch question details first
    const questionDetails = await questionStore.fetchQuestionDetails(id)
    // Then setup edit question
    if (questionDetails) {
        // Load question details on question state on store
        questionStore.editQuestion(questionDetails)
        // open question dialog
        formDialog.value = true
    }
}

const confirmDelete = (id) => {
    const message = 'Are you sure you want to delete this question?'
    confirmRequest(id, questionStore.deleteQuestion, message)
}

const onPage = async (event) => {
    page.value = event.page
    limit.value = event.rows
    await loadQuestions()
}
</script>

<template>
    <div>
        <CustomTable :allData="allQuestions" :totalRecords="totalQuestions" :entity="'Questions'" :loading="loading"
            @on-page="onPage">
            <template #columns>
                <Column field="title[appState.lang]" header="TITLE" style="width: 20%">
                    <template #body="slotProps">
                        <div>
                            {{ slotProps.data.title[appState.lang] }}
                        </div>
                    </template>
                </Column>
                <Column field="description[appState.lang]" header="DESCRIPTION" style="width: 25%">

                    <template #body="slotProps">
                        <div>
                            {{ slotProps.data.description[appState.lang] }}
                        </div>
                    </template>
                </Column>
                <Column field="type" header="TYPE" style="width: 10%">

                    <template #body="{ data }">
                        <DataTypeTag :entity="'question'" :type="data.type" />
                    </template>
                </Column>
                <Column field="optionsCount" header="OPTIONS" style="width: 10%;">

                    <template #body="slotProps">
                        <template v-if="slotProps.data.optionsCount">
                            <div :class="stockClass(slotProps.data.optionsCount)">
                                {{ slotProps.data.optionsCount }}
                            </div>
                        </template>

                        <template v-else>
                            <div>
                                None
                            </div>
                        </template>
                    </template>
                </Column>
            </template>

            <template #actions>
                <Column header="ACTIONS" :exportable="false" style="width:15%">
                    <template #body="slotProps">
                        <!-- <Button icon="pi pi-eye" rounded severity="info" class="mr-2" /> -->
                        <Button icon="pi pi-eye" rounded severity="primary" class="mr-2"
                            @click="viewDetails(slotProps.data._id)" />
                        <Button icon="pi pi-pencil" rounded severity="secondary" class="mr-2"
                            @click="editQuestion(slotProps.data._id)" />
                        <Button icon="pi pi-trash" rounded severity="danger"
                            @click="confirmDelete(slotProps.data._id)" />
                    </template>
                </Column>
            </template>
        </CustomTable>

        <!-- Question Form -->
        <QuestionForm v-if="formDialog" editMode @hide-dialog="formDialog = false" />

        <!-- Question Details Dialog -->
        <QuestionDetails v-if="detailsDialog" :question="questionDetails" @hide-dialog="detailsDialog = false" />
    </div>
</template>