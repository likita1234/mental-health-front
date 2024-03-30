<script setup>

</script>

<template>
    <div class="grid grid-nogutter surface-section text-800 h-fit">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
            <section>
                <span class="block text-6xl font-bold mb-1">Here's to your journey of self-discovery,</span>
                <div class="text-6xl text-primary font-bold mb-3">meaningful connections, and overall well-being! 🌟
                </div>
                <p class="mt-0 mb-4 text-700 line-height-3">Join us and take the first step toward a healthier, happier
                    you!.</p>
                <p class="my-2 text-700 text-primary font-bold font-italic line-height-3">P.S: We take your privacy
                    seriously, so everything is anonymous, even your email information.</p>
                <div class="flex mt-5">
                    <router-link :to="{ name: 'register' }">
                        <Button label="Register" type="button" class="mr-3 p-button-raised" />
                    </router-link>
                    <router-link :to="{ name: 'survey' }">
                        <Button label="Participate our Surveys" type="button" class="p-button-outlined" />
                    </router-link>
                </div>
            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden">
            <Image src="/images/hero/assessment-image.jpg" alt="Image" height="100%" width="100%"
                class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" />
        </div>
    </div>
</template>