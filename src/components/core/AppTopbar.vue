<script setup>

const emit = defineEmits(['menu-button-click', 'topbar-item-click', 'search-click'])
const props = defineProps({
    activeTopbarItem: {
        type: String
    }
})

const onTopbarItemClick = (event, item) => {
    emit('topbar-item-click', { originalEvent: event, item: item });
    event.preventDefault();
}

const onTopbarSubItemClick = (event) => {
    event.preventDefault();
}

</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-wrapper">
            <div class="layout-topbar-left">
                <router-link to="/">
                    <div class="layout-topbar-logo" id="logolink" style="cursor: pointer; outline: none;">
                        <img :src="'public/images/logo/logo-transparent.png'" class="w-full h-3rem" id="app-logo"
                            alt="logo">

                    </div>
                </router-link>
            </div>

            <div class="layout-topbar-right">
                <a class="menu-button" href="#" @click="$emit('menu-button-click', $event)">
                    <i class="pi pi-bars"></i>
                </a>

                <ul class="layout-topbar-actions">
                    <li class="topbar-item user-profile"
                        :class="{ 'active-topmenuitem': props.activeTopbarItem === 'profile' }">
                        <a href="#" @click="onTopbarItemClick($event, 'profile')">
                            <Badge class="profile-image text-white mr-2" size="large">
                                <!-- <img class="profile-image" src="layout/images/avatar-profile.png" alt="demo"> -->
                                <span><i class="pi pi-user"></i></span>
                            </Badge>
                            <span class="profile-info mt-2">
                                <h6>{{ 'System Admin' }}</h6>
                            </span>
                        </a>

                        <ul class="fadeInDown">
                            <li class="layout-submenu-header">
                                <!-- <img class="profile-image" src="layout/images/avatar-profile.png" alt="demo"> -->
                                <div class="profile-info">
                                    <h6>{{ 'System Admin' }}</h6>
                                </div>
                            </li>
                            <li role="menuitem">
                                <a href="#" @click="onTopbarSubItemClick($event)">
                                    <i class="pi pi-cog"></i>
                                    <h6>Settings</h6>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" @click="onTopbarSubItemClick($event)">
                                    <i class="pi pi-power-off"></i>
                                    <h6>Logout</h6>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
