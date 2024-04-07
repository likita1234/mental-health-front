<script setup>
import AuthTemplate from '../templates/AuthTemplate.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import router from '@/router';

import AppResponse from '@/utils/app-response'
import { authStore, formErrorStore } from '@/stores';
import { SignupSchema, handleValidation } from '@/validations/schemas'

// ================>Store states
const { formErrors } = storeToRefs(formErrorStore)

// Component states
const loading = ref(false)
const form = ref({
    username: null,
    email: null,
    password: null,
    confirmPassword: null
})

// ================Actions========>
const submit = async () => {
    loading.value = true
    // 1) Validate input form
    const validated = await handleValidation(form.value, SignupSchema)

    // 2) If validated is true, then submit, if there are issues in login, show invalid credentials toast
    if (validated) {
        const newUser = await authStore.signup(form.value)
        // 3) If successful, then redirect to the home page
        if (newUser) {
            router.push({ name: 'default-dashboard' })
            return new AppResponse(200, 'Logging user into the app')
        }
    }
    loading.value = false

}

</script>

<template>
    <AuthTemplate>
        <template #form-title>
            Create a new Account
        </template>

        <template #form-inputs>
            <BaseTextInput v-model="form.username" label="Username" size="large" :errorMessage="formErrors.username" />
            <BaseTextInput v-model="form.email" label="Email" size="large" :errorMessage="formErrors.email" />
            <BaseTextInput v-model="form.password" type="password" label="Password" size="large"
                :errorMessage="formErrors.password" />
            <BaseTextInput v-model="form.confirmPassword" type="password" label=" Confirm Password" size="large"
                :errorMessage="formErrors.confirmPassword" />
        </template>

        <template #action-button>
            <Button class="login-form-btn" label="Register" @click="submit" />
        </template>

        <template #footer-section>
            <span class="txt2">
                Already have an account?
            </span>
            <RouterLink :to="{ name: 'login' }">
                Sign in
            </RouterLink>
        </template>
    </AuthTemplate>
</template>
