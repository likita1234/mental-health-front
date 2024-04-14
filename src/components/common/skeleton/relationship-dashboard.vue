<template>
    <div class="card">
        <div class="flex justify-content-between my-3 gap-3">
            <Skeleton width="100%" height="5rem"></Skeleton>
            <Skeleton width="100%" height="5rem"></Skeleton>
            <Skeleton width="100%" height="5rem"></Skeleton>
        </div>
        <div class="my-2 border-round surface-card">
            <Skeleton width="100%" height="150px"></Skeleton>
        </div>
        <div class="flex justify-content-center">
            <ProgressSpinner />
        </div>
        <div class="my-2 border-round surface-card">
            <Skeleton width="100%" height="150px"></Skeleton>
        </div>
    </div>
</template>

<script setup>
</script>