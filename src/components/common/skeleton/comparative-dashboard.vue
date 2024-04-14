<template>
    <div class="card">
        <div class="my-2 border-round surface-card">
            <DataTable :value="data">
                <Column field="TITLE" header="TITLE">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="RESPONDENTS" header="RESPONDENTS">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="WEIGHTEDMEAN" header="WEIGHTED MEAN">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column field="STANDARDDEVIATION" header="STANDARD DEVIATION">
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="flex justify-content-center">
            <ProgressSpinner />
        </div>
        <div class="my-2 border-round surface-card">
            <Skeleton width="100%" height="150px"></Skeleton>
        </div>
        <div class="my-2 border-round surface-card">
            <Skeleton width="100%" height="150px"></Skeleton>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const data = ref(new Array(2));
</script>