<script setup>
import SectionForm from './SectionForm.vue';
import SectionDetails from './SectionDetails.vue'

import { ref, onMounted, inject, onUnmounted } from 'vue'
import { sectionStore } from '@/stores'
import { storeToRefs } from 'pinia';

import { useConfirmComposable } from '@/composables/ConfirmComposable';
import { stockClass } from '@/utils/table-styles'

const { confirmRequest } = useConfirmComposable()
// Store states
const { allSections, totalSections, limit, page } = storeToRefs(sectionStore)

// Component states
const loading = ref(false)
const formDialog = ref(false)
const activeSectionId = ref(null)

const appState = inject('appState')

onMounted(() => {
    loadSections()
})

onUnmounted(() => {
    page.value = 1;
    limit.value = 10
})

const loadSections = async () => {
    loading.value = true
    setTimeout(async () => {
        await sectionStore.fetchAllSections()
        loading.value = false
    }, Math.random() * 1000 + 250);
}

const editSection = async (sectionId) => {
    // Fetch details first
    const sectionDetails = await sectionStore.fetchSectionDetails(sectionId)
    // Then setup edit 
    if (sectionDetails) {
        // Load details on store
        sectionStore.editSection(sectionDetails)
        // open dialog
        formDialog.value = true
    }
}

const viewDetails = (id) => {
    activeSectionId.value = id
}

const confirmDelete = (sectionId) => {
    const message = 'Are you sure you want to delete this section?'
    confirmRequest(sectionId, sectionStore.deleteSection, message)
}

const onPage = async (event) => {
    page.value = event.page
    limit.value = event.rows
    await loadSections()
}
</script>

<template>
    <div>
        <CustomTable :allData="allSections" :totalRecords="totalSections" :entity="'Sections'" :loading="loading"
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
                            <div class="max-h-3rem overflow-hidden">
                                <p> {{ slotProps.data.description[appState.lang] }} </p>
                            </div>
                        </template>

                        <template v-else>
                            No Description
                        </template>
                    </template>
                </Column>
                <Column field="questionsCount" header="QUESTIONS" style="width: 10%;">

                    <template #body="slotProps">
                        <template v-if="slotProps.data.questionsCount">
                            <div :class="stockClass(slotProps.data.questionsCount)">
                                {{ slotProps.data.questionsCount }}
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
                            @click="editSection(slotProps.data._id)" />
                        <Button icon="pi pi-trash" rounded severity="danger"
                            @click="confirmDelete(slotProps.data._id)" />
                    </template>
                </Column>
            </template>
        </CustomTable>

        <!-- Question Form -->
        <SectionForm v-if="formDialog" editMode @hide-dialog="formDialog = false" />

        <!-- Section Details form -->
        <SectionDetails v-if="activeSectionId" :id="activeSectionId" @hide-dialog="activeSectionId = null" />
    </div>
</template>