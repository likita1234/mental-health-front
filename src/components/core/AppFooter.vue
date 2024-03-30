<script setup>

</script>

<template>
    <div class="layout-footer">
        <div>
            <router-link to="/">
                <div class="layout-topbar-logo" id="footerlogolink" style="cursor: points;outline:none;">
                    <img  :src="'/images/logo/logo-transparent.png'" class="w-full h-4rem" id="app-logo" alt="logo">
                </div>
            </router-link>
        </div>
        <div class="social-icons">
            <a><i class="pi pi-github"></i></a>
            <a><i class="pi pi-facebook"></i></a>
            <a><i class="pi pi-twitter"></i></a>
        </div>
    </div>
</template>