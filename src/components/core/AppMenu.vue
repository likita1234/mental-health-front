 
<script setup>
import AppSubmenu from "./AppSubmenu.vue";
import { useMenu } from '@/composables/MenuComposable'

const emit = defineEmits(["menuitem-click", "root-menuitem-click"])

const props = defineProps({
    model: Array,
    menuMode: String,
    active: Boolean,
    mobileMenuActive: Boolean
})

const { menuItems } = useMenu()

const onMenuItemClick = (event) => {
    emit("menuitem-click", event);
}

const onRootMenuItemClick = (event) => {
    emit("root-menuitem-click", event);
}
</script>

<template>
    <div class="layout-menu-container">
        <AppSubmenu class="layout-menu" :items="menuItems" :menuMode="menuMode" :parentMenuItemActive="true"
            :menuActive="active" :mobileMenuActive="mobileMenuActive" :root="true" @menuitem-click="onMenuItemClick"
            @root-menuitem-click="onRootMenuItemClick" />
    </div>
</template>
   