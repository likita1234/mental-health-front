 
<script setup>
import AppSubmenu from "./AppSubmenu.vue";
import { ref } from "vue";

const emit = defineEmits(["menuitem-click", "root-menuitem-click"])

const props = defineProps({
    model: Array,
    menuMode: String,
    active: Boolean,
    mobileMenuActive: Boolean
})

const filteredMenuItems = ref([])

const onMenuItemClick = (event) => {
    emit("menuitem-click", event);
}

const onRootMenuItemClick = (event) => {
    emit("root-menuitem-click", event);
}
</script>

<template>
    <div class="layout-menu-container">
        <AppSubmenu class="layout-menu" :items="filteredMenuItems" :menuMode="menuMode" :parentMenuItemActive="true"
            :menuActive="active" :mobileMenuActive="mobileMenuActive" :root="true" @menuitem-click="onMenuItemClick"
            @root-menuitem-click="onRootMenuItemClick" />
    </div>
</template>
   