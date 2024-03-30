<script setup>
import AuthTemplate from './templates/AuthTemplate.vue';
import { ref } from 'vue';

const form = ref({
    firstname: null,
    lastname: null,
    email: null,
    password: null
})

</script>

<template>
    <div>
        <AuthTemplate>
            <template #form-title>
                Create a new Account
            </template>

            <template #form-inputs>
                <FormInputText v-model="form.firstname" label="First Name" size="large" />
                <FormInputText v-model="form.lastname" label="Last Name" size="large" />
                <FormInputText v-model="form.email" label="Email" size="large" />
                <FormInputText v-model="form.password" type="password" label="Password" size="large" />
                <FormInputText v-model="form.confirmpassword" type="password" label=" Confirm Password" size="large" />
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
