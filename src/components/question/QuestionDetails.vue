<script setup>

const emit = defineEmits(['hide-dialog'])

defineProps({
    question: Object
})

</script>

<template>
    <FormDialog :header="'Question Details'" width="30vw" @hide-dialog="emit('hide-dialog')" hideSubmission>
        <CustomQuestion :question="question" />
        <template #cancel-label>
            Close
        </template>
    </FormDialog>
</template>