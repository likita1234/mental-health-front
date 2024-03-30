<script setup>
import { ref } from 'vue';

// Emits
const emit = defineEmits(['on-page'])

// Props
const props = defineProps({
    allData: {
        type: Array,
        required: true
    },
    totalRecords: Number,
    entity: String,
    loading: Boolean,

})

const page = ref(1)
const limit = ref(10)

const onPage = async (event) => {
    page.value = event.page + 1
    limit.value = event.rows
    emit('on-page', { page: page.value, limit: limit.value })
}

</script>

<template>
    <div>
        <DataTable ref="dt" :value="allData" :lazy="true" :loading="loading" paginator :rows="limit"
            :totalRecords="totalRecords" @page="onPage($event)" tableStyle="min-width: 50rem"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="CurrentPageReport JumpToPageInput FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries :: Page No:">
            <template #header>
                <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                    <h4 class="m-0">Manage {{ entity }}</h4>
                </div>
            </template>
            <template #empty>
                No {{ entity }} found.
            </template>
            <template #loading>
                Loading {{ entity }}. Please wait...
            </template>
            <slot name="columns" />
            <Column field="created_at" header="CREATED AT" style="width:10%" />
            <slot name="actions" />
        </DataTable>
    </div>
</template>