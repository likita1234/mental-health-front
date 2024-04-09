<template>
    <div class="exception-body access-page">
        <div class="exception-top">
            <img src="/images/icons/icon-access.png" alt="access-image" />
        </div>

        <div class="exception-bottom">
            <div class="exception-wrapper">
                <span class="exception-summary">Access Denied</span>
                <span class="exception-detail">You Don't Have Permissions To Access This Resource</span>
                <router-link :to="{ name: 'default-dashboard' }">
                    <Button label="Go to Dashboard" icon="pi pi-home"></Button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>