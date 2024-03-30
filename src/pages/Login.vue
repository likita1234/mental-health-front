<script setup>
import AuthTemplate from './templates/AuthTemplate.vue';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const form = ref({
    email: null,
    password: null
})

const loginUser = () => {
    console.log('login works')
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Login Success', life: 3000 });
}
</script>

<template>
    <div>
        <AuthTemplate>
            <template #form-title>
                Sign in your Account
            </template>

            <template #form-inputs>
                <FormInputText v-model="form.email" label="Email" size="large" />
                <FormInputText v-model="form.password" type="password" label="Password" size="large" />
            </template>

            <template #action-button>
                <Button class="login-form-btn" label="Sign In" />
            </template>

            <template #footer-section>
                <span class="txt2">
                    Not a member?
                </span>
                <a href="#" class="txt2 bo1">
                    Sign up now
                </a>
            </template>
        </AuthTemplate>
    </div>
</template>
