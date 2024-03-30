<template>
    <div class="flex justify-content-around align-items-end">
        <FileUpload ref="csvFile" mode="basic" :customUpload="true" :accept="'.csv, text/csv, application/csv'" b F="Only csv format supported" />
        <Button class="p-button-warning mx-2" label="Upload" @click="upload" />
    </div>
</template>

<script setup>
import papa from 'papaparse';
import { ref, watch, defineEmits } from 'vue';
import { showToast } from '@/utils/show-toast';

const emit = defineEmits(['json-created']);

const csvFile = ref(null);
const csvData = ref([]);

const upload = async () => {
    const uploadedFile = csvFile.value?.files[0];
    if (uploadedFile) {
        await papa.parse(uploadedFile, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: false,
            async complete(result) {
                csvData.value = result.data;
            },
        });
    } else {
        showToast({}, 'No File selected');
    }
};

watch(csvData, () => {
    if (csvData.value && csvData.value.length) {
        emit('json-created', csvData.value);
    }
});
</script>
