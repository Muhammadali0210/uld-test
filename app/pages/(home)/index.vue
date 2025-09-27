<script setup lang="ts">

</script>

<template>
    <div class="w-full h-[100vh] max-h-[100vh] overflow-hidden bg-[#ebebeb] flex flex-col justify-between">
        <HomeHeader />
        <div class="h-full flex flex-col gap-2 p-2">
            <HomeChartBox />
            <HomeTableBox />
        </div>
        <HomeFooter />
    </div>
</template>
<style>
.custom-scroll {
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #3f5a94 #f1f1f1;
}

.custom-scroll::-webkit-scrollbar {
  height: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #3f5a94;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #3f5a94;
}
</style>