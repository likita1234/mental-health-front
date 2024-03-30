
<script setup>
import { useRoute } from 'vue-router';

import { ref, onMounted, watch } from 'vue';

const route = useRoute()
const home = ref({ icon: 'pi pi-home', to: '/' })
const items = ref([])

watch(
    () => route,
    () => {
        watchRouter()
    }, {
    deep: true
}
)

onMounted(() => {
    watchRouter()
})

const watchRouter = () => {
    if (route.meta.breadcrumb) {
        items.value = route.meta.breadcrumb[0];
    }
}

</script>

<template>
    <div class="layout-breadcrumb">
        <div class="breadcrumb">
            <div class="route-bar-breadcrumb">
                <template v-for="(item, index) of items" :key="item">
                    <li>
                        <router-link to="item.routerLink" class="p-link" v-if="item.routerLink">{{ item }}</router-link>
                        <template v-if="!item.routerLink">{{ item }}</template>
                    </li>
                    <li v-if="index !== 'label'"><i
                            :class="['pi', { 'pi-angle-right': !$appState.isRTL, 'pi-angle-left': $appState.isRTL }]"></i>
                    </li>
                </template>
            </div>
        </div>
    </div>
</template>