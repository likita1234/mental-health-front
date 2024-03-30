<template>
    <div>
        <dashboard-selection-dropdown :type="'comparative'" @dashboard-selected="loadSelectedDashboard" class=""/>
        <!-- Charts  -->
        <div class="flex">
            <div>

            </div>
        </div>
    </div>
</template>

<script setup>
import DashboardSelectionDropdown from '@/components/utils/DashboardSelectionDropdown.vue'


// Actions
const loadSelectedDashboard = async (dashboardId) => {
    console.log(dashboardId)
}
</script>