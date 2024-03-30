<template>
    <div class="layout-dashboard">
        <div class="grid">
            <div class="col-12 md:col-12 xl:col-3">
                <div class="card overview-box blue">
                    <div class="card-header">
                        <h6>Revenue Status</h6>
                        <div class="header-buttons">
                            <a href="#"><i class="pi pi-arrow-up"></i></a>
                        </div>
                    </div>
                    <div class="overview-content">
                        <h3>87363</h3>
                        <div class="overview-graph">
                            <span style="height: 12px;"><span class="graph-tooltip">12</span></span>
                            <span style="height: 40px;"><span class="graph-tooltip">40</span></span>
                            <span style="height: 26px;"><span class="graph-tooltip">26</span></span>
                            <span style="height: 17px;"><span class="graph-tooltip">17</span></span>
                            <span style="height: 36px;"><span class="graph-tooltip">36</span></span>
                            <span style="height: 51px;"><span class="graph-tooltip">51</span></span>
                        </div>
                    </div>
                    <div class="overview-footer">
                        <span><i class="pi pi-arrow-up"></i> <span>55%</span> increase in today sales</span>
                    </div>
                </div>
            </div>

            <div class="col-12 md:col-12 xl:col-3">
                <div class="card overview-box teal">
                    <div class="card-header">
                        <h6>Page View</h6>
                        <div class="header-buttons">
                            <a href="#"><i class="pi pi-arrow-up"></i></a>
                        </div>
                    </div>
                    <div class="overview-content">
                        <h3>5592</h3>
                        <div class="overview-graph">
                            <span style="height: 30px;"><span class="graph-tooltip">30</span></span>
                            <span style="height: 43px;"><span class="graph-tooltip">43</span></span>
                            <span style="height: 48px;"><span class="graph-tooltip">48</span></span>
                            <span style="height: 40px;"><span class="graph-tooltip">40</span></span>
                            <span style="height: 52px;"><span class="graph-tooltip">52</span></span>
                            <span style="height: 18px;"><span class="graph-tooltip">18</span></span>
                        </div>
                    </div>
                    <div class="overview-footer down">
                        <span><i class="pi pi-arrow-down"></i> <span>12%</span> decrease in today sales</span>
                    </div>
                </div>
            </div>

            <div class="col-12 md:col-12 xl:col-3">
                <div class="card overview-box orange">
                    <div class="card-header">
                        <h6>Bounce Rate</h6>
                        <div class="header-buttons">
                            <a href="#"><i class="pi pi-arrow-up"></i></a>
                        </div>
                    </div>
                    <div class="overview-content">
                        <h3>55.95%</h3>
                        <div class="overview-graph">
                            <span style="height: 20px;"><span class="graph-tooltip">20</span></span>
                            <span style="height: 23px;"><span class="graph-tooltip">23</span></span>
                            <span style="height: 52px;"><span class="graph-tooltip">52</span></span>
                            <span style="height: 18px;"><span class="graph-tooltip">18</span></span>
                            <span style="height: 28px;"><span class="graph-tooltip">28</span></span>
                            <span style="height: 42px;"><span class="graph-tooltip">42</span></span>
                        </div>
                    </div>
                    <div class="overview-footer">
                        <span><i class="pi pi-arrow-up"></i> <span>6%</span> increase in today sales</span>
                    </div>
                </div>
            </div>

            <div class="col-12 md:col-12 xl:col-3">
                <div class="card overview-box pink">
                    <div class="card-header">
                        <h6>Products Sale Rate</h6>
                        <div class="header-buttons">
                            <a href="#"><i class="pi pi-arrow-up"></i></a>
                        </div>
                    </div>
                    <div class="overview-content">
                        <h3>15.37%</h3>
                        <div class="overview-graph">
                            <span style="height: 17px;"><span class="graph-tooltip">20</span></span>
                            <span style="height: 39px;"><span class="graph-tooltip">23</span></span>
                            <span style="height: 22px;"><span class="graph-tooltip">52</span></span>
                            <span style="height: 34px;"><span class="graph-tooltip">18</span></span>
                            <span style="height: 28px;"><span class="graph-tooltip">28</span></span>
                            <span style="height: 52px;"><span class="graph-tooltip">42</span></span>
                        </div>
                    </div>
                    <div class="overview-footer down">
                        <span><i class="pi pi-arrow-down"></i> <span>1.1%</span> decrease in today sales</span>
                    </div>
                </div>
            </div>
            <!-- Main WHO-5 Dashboard -->
            <div class="col-12 md:col-12 xl:col-9">
                <div class="grid">
                    <div class="col-12">
                        <div class="card sale-graph">
                            <div class="card-header">
                                <h4>{{ metricData?.title }}</h4>
                            </div>
                            <div id="order-tabs-container" class="order-tabs">
                                <div class="order-tab" data-label="Lowest Score" data-stroke="#00acac">
                                    <h6>Lowest Score</h6>
                                    <h3>$455.55</h3>
                                </div>
                                <div class="order-tab order-tab-active" data-label="Average Score"
                                    data-stroke="#2f8ee5">
                                    <h6>Average Score</h6>
                                    <h3>$244.40</h3>
                                </div>
                                <div class="order-tab" data-label="Highest Score" data-stroke="#4f8eff">
                                    <h6>Highest Score</h6>
                                    <h3>$244.40</h3>
                                </div>
                            </div>
                            <div class="overview-chart">
                                <base-chart :type="chartType" :groupBy="defaultGroupings" :jsonData="jsonData" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- This dashboard is specially for WHO-5 only so we will need to hard code the metric id here while fetching its details -->

<script setup>
import { ref, onMounted, computed } from 'vue';
import { metricStore } from '@/stores'

// Here we will hardcode the metricId for WHO-5
const metricId = ref("65feedbbd213a25a0c31e2ba")
const metricData = ref(null)

// Computed properties
const chartType = computed(() => {
    return metricData.value?.chartType
})

const defaultGroupings = computed(() => {
    return metricData.value?.metricData?.data?.labels ?? []
})

const jsonData = computed(() => {
    return metricData.value?.metricData?.data?.data ?? []
})

const overallAnswers = computed(() => {
    return metricData.value?.metricData?.answers
})

onMounted(() => {
    loadMetricData()
})

// Actions
const loadMetricData = async () => {
    metricData.value = await metricStore.getMetricData(metricId.value)
    console.log(metricData.value)
}
</script>