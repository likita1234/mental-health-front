<script setup>
import AssessmentForm from './AssessmentForm.vue';

import { ref, onMounted, inject } from 'vue'
import { formStore } from '@/stores'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

import { useConfirmComposable } from '@/composables/ConfirmComposable';
import { stockClass } from '@/utils/table-styles'

const router = useRouter()
const { confirmRequest } = useConfirmComposable()
// Store states
const { allForms, totalForms, limit, page } = storeToRefs(formStore)

// Component states
const loading = ref(false)
const formDialog = ref(false)

const appState = inject('appState')

onMounted(() => {
    loadAssessmentForms()
})

const loadAssessmentForms = async () => {
    loading.value = true
    setTimeout(async () => {
        await formStore.fetchAllForms()
        loading.value = false
    }, Math.random() * 1000 + 250);
}

const editAssessmentForm = async (formId) => {
    // Fetch details first
    const formDetails = await formStore.fetchFormDetails(formId)
    // Then setup edit 
    if (formDetails) {
        // Load details on store
        formStore.editForm(formDetails)
        // open dialog
        formDialog.value = true
    }
}

const viewDetails = async (formId) => {
    return router.push({ name: 'form-details', params: { id: formId } })
}

const confirmDelete = (formId) => {
    const message = 'Are you sure you want to delete this form?'
    confirmRequest(formId, formStore.deleteForm, message)
}

const onPage = async (event) => {
    page.value = event.page
    limit.value = event.rows
    await loadAssessmentForms()
}
</script>

<template>
    <div>
        <CustomTable :allData="allForms" :totalRecords="totalForms" :entity="'Assessment Form'" :loading="loading"
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
                        <template v-if="slotProps.data.description[appState.lang]">
                            {{ slotProps.data.description[appState.lang] }}
                        </template>

                        <template v-else>
                            No Description
                        </template>
                    </template>
                </Column>
                <Column field="type" header="TYPE" style="width: 10%">

                    <template #body="{ data }">
                        <DataTypeTag :entity="'form'" :type="data.type" />
                    </template>
                </Column>
                <Column field="sectionsCount" header="SECTIONS" style="width: 10%;">

                    <template #body="slotProps">
                        <template v-if="slotProps.data.sectionsCount">
                            <div :class="stockClass(slotProps.data.sectionsCount)">
                                {{ slotProps.data.sectionsCount }}
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
                        <Button icon="pi pi-eye" rounded class="mr-2" @click="viewDetails(slotProps.data._id)" />
                        <Button icon="pi pi-pencil" rounded severity="secondary" class="mr-2"
                            @click="editAssessmentForm(slotProps.data._id)" />
                        <Button icon="pi pi-trash" rounded severity="danger"
                            @click="confirmDelete(slotProps.data._id)" />
                    </template>
                </Column>
            </template>
        </CustomTable>

        <!-- Question Form -->
        <AssessmentForm v-if="formDialog" editMode @hide-dialog="formDialog = false" />
    </div>
</template>