<template>
    <div class="flex flex-column gap-2">
        <label v-if="label" :for="label">{{ label }}</label>
        <Editor :id="id" v-model="descriptionVal" editorStyle="height: 150px" :readonly="readonly"
            :placeholder="placeholder" @text-change="emit('update:modelValue', descriptionVal)"
            :class="{ 'invalid-editor': errorMessage ?? false }" @paste="handlePaste">
            <template #toolbar>
                <div v-if="hideToolbar" class="ql-formats"></div>
                <div v-else>
                    <span class="ql-formats">
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-list" value="ordered"></button>
                        <button class="ql-list" value="bullet"></button>
                    </span>

                    <span class="ql-formats">
                        <button class="ql-link"></button>
                        <button class="ql-clean"></button>
                    </span>
                </div>
            </template>
        </Editor>
        <small class="p-invalid" v-if="errorMessage">{{ errorMessage }}</small>
    </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue';

const emit = defineEmits(['update:modelValue', 'text-change']);
const props = defineProps({
    id: String,
    modelValue: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    errorMessage: String,
    hideToolbar: {
        type: Boolean,
        default: false,
    },
});

const descriptionVal = ref(null);

onMounted(() => {
    if (props.modelValue) {
        descriptionVal.value = props.modelValue;
    }
});

const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData('text/plain');
    document.execCommand('insertText', false, pastedText);
};
</script>

<style>
.invalid-editor {
    border: 1px solid #f44336;
}
</style>
