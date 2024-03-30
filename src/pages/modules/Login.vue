<script setup>
import AuthTemplate from '../templates/AuthTemplate.vue';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import router from '@/router';

import AppResponse from '@/utils/app-response'
import { authStore, formErrorStore } from '@/stores';
import { LoginSchema, handleValidation } from '@/validations/schemas'

// ================>Store states
const { formErrors } = storeToRefs(formErrorStore)

// ================> States

const loading = ref(false)

const form = ref({
    email: null,
    password: null
})


// ================Actions========>
const submit = async () => {
    loading.value = true
    // 1) Validate input form
    const validated = await handleValidation(form.value, LoginSchema)

    // 2) If validated is true, then submit, if there are issues in login, show invalid credentials toast
    if (validated) {
        const loggedIn = await authStore.login(form.value)
        // 3) If successful, then redirect to the home page
        if (loggedIn) {
            router.push({ name: 'home' })
            return new AppResponse(200, 'Logged in successfully')
        }
    }
    loading.value = false

}

</script>

<template>
    <AuthTemplate>
        <template #form-title>
            Sign in your Account
        </template>

        <template #form-inputs>
            <BaseTextInput v-model="form.email" label="Email" size="large" :errorMessage="formErrors.email" />
            <BaseTextInput v-model="form.password" type="password" label="Password" size="large"
                :errorMessage="formErrors.password" />
        </template>

        <template #action-button>
            <Button class="login-form-btn" label="Sign In" @click="submit" />
        </template>

        <template #footer-section>
            <div v-if="loading" class="flex justify-content-center">
                <ProgressSpinner style="width: 40px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
                    animationDuration=".5s" aria-label="Login Loader" />
            </div>
            <span>
                Not a member?
            </span>
            <RouterLink :to="{ name: 'register' }">
                Sign up now
            </RouterLink>
        </template>
    </AuthTemplate>
</template>
