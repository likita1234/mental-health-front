<script setup>
import CustomAssessment from '../../components/assessment-form/CustomAssessment.vue'

// props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

</script>
<template>
    <div class="flex justify-content-center">
        <div class="w-full lg:w-10">
            <CustomAssessment :id="id" />
        </div>
    </div>
</template>