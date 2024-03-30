<script setup>
import AuthTemplate from '../templates/AuthTemplate.vue';
import { ref } from 'vue';

const form = ref({
    firstname: null,
    lastname: null,
    email: null,
    password: null
})

</script>

<template>
    <AuthTemplate>
        <template #form-title>
            Create a new Account
        </template>

        <template #form-inputs>
            <BaseTextInput v-model="form.firstname" label="First Name" size="large" />
            <BaseTextInput v-model="form.lastname" label="Last Name" size="large" />
            <BaseTextInput v-model="form.email" label="Email" size="large" />
            <BaseTextInput v-model="form.password" type="password" label="Password" size="large" />
            <BaseTextInput v-model="form.confirmpassword" type="password" label=" Confirm Password" size="large" />
        </template>

        <template #action-button>
            <Button class="login-form-btn" label="Register" />
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
