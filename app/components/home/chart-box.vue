<script setup lang="ts">

</script>

<template>
    <div class="bg-white rounded-lg h-full p-4 w-full">
        Chart
        <div class="overflow-x-auto custom-scroll w-full">
            <div :style="{ width: 60 * 100 + 'px' }">
                <ClientOnly>
                    <HomeChart />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>
<style>
</style>