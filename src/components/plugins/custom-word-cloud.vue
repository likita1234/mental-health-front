<script setup>
import { ref } from 'vue';

const words = ref([['accustomed', 6], ['adapt', 6], ['attended', 8], ['celebrations', 8], ['challenging', 6], ['communication',
    6], ['completely', 6], ['concept', 6], ['country', 18], ['cuisine', 8], ['cultural', 30], ['culture', 10], ['customs',
    8], ['differences', 8], ['different', 28], ['dynamics', 6], ['educational', 6], ['emphasis', 6], ['encountered', 10],
['etiquette', 6], ['experienced', 18], ['festivals', 10], ['habits', 6], ['home', 10], ['interactions', 6], ['nepal',
    24], ['overwhelming', 6], ['people', 10], ['personal', 12], ['punctuality', 8], ['quite', 6], ['realized', 8],
['rituals', 6], ['shock', 26], ['social', 10], ['space', 10], ['surprised', 6], ['system', 12], ['time', 16],
['tradition', 10], ['unfamiliar', 6]]);

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
const animationDuration = 10000;
const animationEasing = 'ease-in';
const animationOverlap = .2;
const enterAnimation = 'animated bounceIn';
const leaveAnimation = 'animated hinge';
const rotationUnit = ref(([, weight]) => {
    if (weight > 30) return 'turn';
    if (weight > 25) return 'deg';
    if (weight > 20) return 'turn';
    if (weight > 15) return 'deg';
    if (weight > 10) return 'turn';
    return 'deg'
})

const rotation = ref(([, weight]) => {
    if (weight > 25) return 1; // Three-quarters rotation (270 degrees)
    if (weight > 20) return -1; // Quarter rotation (90 degrees)
    if (weight > 15) return .25; // Half rotation (180 degrees)
    if (weight > 10) return -0.25; // Quarter rotation (90 degrees)
    return 0; // No rotation
});

</script>
<template>
    <div class="p-card">
        <!-- :rotation-unit="rotationUnit" -->
        <vue-word-cloud style="height: 500px;" :words="words" :color="colors" :animationDuration="animationDuration"
            :animation-easing="animationEasing" :animation-overlap="animationOverlap" :enter-animation="enterAnimation"
            :leave-animation="leaveAnimation" :rotation-unit="rotationUnit" :rotation="rotation" />
    </div>
</template>