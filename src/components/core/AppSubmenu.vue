
<script setup>
import AppSubmenu from './AppSubmenu.vue'

import { ref, onMounted, computed } from 'vue'
import EventBus from '@/utils/event-bus';

const emit = defineEmits(["root-menuitem-click", "menuitem-click"])

const props = defineProps({
    items: Array,
    menuMode: String,
    menuActive: Boolean,
    mobileMenuActive: Boolean,
    root: {
        type: Boolean,
        default: false,
    },
    parentMenuItemActive: {
        type: Boolean,
        default: false,
    },
})
const activeIndex = ref(null)

onMounted(() => {

    EventBus.on('reset-active-index', () => {
        if (props.menuMode === 'horizontal') {
            activeIndex.value = null;
        }
    });
})

const onMenuItemClick = (event, item, index) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    //execute command
    if (item.command) {
        item.command({ originalEvent: event, item: item });
        event.preventDefault();
    }

    if (item.items) {
        event.preventDefault();
    }

    if (props.root) {
        emit("root-menuitem-click", {
            originalEvent: event,
        });
    }

    if (item.items) {
        activeIndex.value = index === activeIndex.value ? null : index;
    }
    // else {
    //     if (props.menuMode !== 'static') {
    //         const ink = this.getInk(event.currentTarget);
    //         if (ink) {
    //             this.removeClass(ink, 'p-ink-active');
    //         }
    //     }
    // }

    emit("menuitem-click", {
        originalEvent: event,
        item: item,
    });
}
const onMenuItemMouseEnter = (index) => {
    if (props.root && props.menuActive && props.menuMode === 'horizontal' && !isMobile.value) {
        activeIndex.value = index;
    }
}
const visible = (item) => {
    return typeof item.visible === "function" ? item.visible() : item.visible !== false;
}
const isMobile = computed(() => {
    return window.innerWidth <= 1091;
}) 
</script>

<template>
    <ul v-if="items" role="menu">
        <template v-for="(item, i) of items">
            <li v-if="visible(item)" :key="item.label || i"
                :class="[{ 'layout-root-menuitem': root, 'active-menuitem': activeIndex === i && !item.disabled }]"
                role="menuitem">
                <div v-if="root && menuMode !== 'horizontal' && item.visible !== false">
                    <span class="layout-menuitem-text">{{ item.label }}</span>
                </div>
                <router-link v-if="item.to" :to="item.to" :style="item.style"
                    :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]" exact-active-class="active-route"
                    :target="item.target" exact @click="onMenuItemClick($event, item, i)"
                    @mouseenter="onMenuItemMouseEnter(i)" v-ripple>
                    <i :class="['layout-menuitem-icon', item.icon]"></i>
                    <span class="layout-menuitem-text">{{ item.label }}</span>
                    <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                </router-link>
                <a v-if="!item.to" :href="item.url || '#'" :style="item.style"
                    :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]" :target="item.target"
                    @click="onMenuItemClick($event, item, i)" @mouseenter="onMenuItemMouseEnter(i)" v-ripple>
                    <i :class="['layout-menuitem-icon', item.icon]"></i>
                    <span class="layout-menuitem-text">{{ item.label }}</span>
                    <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                </a>
                <transition name="layout-menu">
                    <AppSubmenu
                        v-show="item.items && (root && (menuMode !== 'horizontal' || (menuMode === 'horizontal' && (mobileMenuActive || activeIndex !== null))) ? true : activeIndex === i)"
                        :items="visible(item) && item.items" :menuActive="menuActive" :menuMode="menuMode"
                        :parentMenuItemActive="activeIndex === i" @menuitem-click="$emit('menuitem-click', $event)">
                    </AppSubmenu>
                </transition>
            </li>
        </template>
    </ul>
</template>
