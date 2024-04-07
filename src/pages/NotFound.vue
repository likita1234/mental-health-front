<template>
    <div class="exception-body notfound-page">
        <div class="exception-top">
            <img src="/images/icons/icon-error.png" alt="not-found-image" />
        </div>

        <div class="exception-bottom">
            <div class="exception-wrapper">
                <span class="exception-summary">Page Not Found</span>
                <span class="exception-detail">The resource you are looking for does not exist.</span>
                <router-link :to="{ name: 'default-dashboard' }">
                    <Button label="Go to Dashboard" icon="pi pi-home"></Button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>