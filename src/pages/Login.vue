<script setup>
import AuthTemplate from './templates/AuthTemplate.vue';
import { ref } from 'vue';

import { authStore, formErrorStore } from '@/stores';
import { showToast } from '@/utils/show-toast';
import { LoginSchema, handleValidation } from '@/validations/schemas'
import { storeToRefs } from 'pinia';

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
    try {
        loading.value = true
        // 1) Validate input form
        const validated = await handleValidation(form.value, LoginSchema)

        // 2) If validated is true, then submit, if there are issues in login, show invalid credentials toast
        if (validated) {
            const loggedIn = await authStore.login(form.value)

            // 3) If successful, then redirect to the home page
            if (loggedIn) {
                showToast('success', 'Successful', 'Login Success');
            }
        }

    } catch (error) {
        console.log('Login.vue error')
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <div>
        <AuthTemplate>
            <template #form-title>
                Sign in your Account
            </template>

            <template #form-inputs>
                <FormInputText v-model="form.email" label="Email" size="large" :errorMessage="formErrors.email" />
                <FormInputText v-model="form.password" type="password" label="Password" size="large"
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
    </div>
</template>
