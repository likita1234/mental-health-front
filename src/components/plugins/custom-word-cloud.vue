<script setup>
import { ref } from 'vue';

// Props
const props = defineProps({
    words: {
        type: Array,
        required: true
    }
})
// Component states
const animationDuration = 5000;
const animationEasing = 'ease-in';
const animationOverlap = .2;
const enterAnimation = 'animated bounceIn';
const leaveAnimation = 'animated hinge';
const colors = ref(([, weight]) => {
    if (weight > 30) return 'DeepPink';
    if (weight > 25) return 'RoyalBlue';
    if (weight > 20) return 'Indigo';
    if (weight > 15) return 'LimeGreen';
    if (weight > 10) return 'Gold';
    if (weight > 5) return 'DarkOrange';
    if (weight > 0) return 'FireBrick';
    return 'SlateGray';
})
const rotationUnit = ref(([, weight]) => {
    if (weight > 30) return 'turn';
    if (weight > 25) return 'deg';
    if (weight > 20) return 'turn';
    if (weight > 15) return 'deg';
    if (weight > 10) return 'turn';
    return 'deg'
})
const rotation = ref(([, weight]) => {
    if (weight > 25) return 1;
    if (weight > 20) return 1 / 12;
    if (weight > 15) return 1 / 4;
    if (weight > 10) return 1 / 8;
    return 0;
});

</script>
<template>
    <div class="p-card word-container">
        <!-- :rotation-unit="rotationUnit" -->
        <vue-word-cloud style="height: 100%;" :words="props.words" :color="colors"
            :animationDuration="animationDuration" :animation-easing="animationEasing"
            :animation-overlap="animationOverlap" :enter-animation="enterAnimation" :leave-animation="leaveAnimation"
            :rotation-unit="rotationUnit" :rotation="rotation" :spacing=".5" />
    </div>
</template>

<style scoped>
.word-container {
    height: 70vh;
}
</style>