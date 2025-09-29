<template>
  <div class="p-4 bg-white rounded-lg h-[50vh] min-h-[50vh] flex flex-col gap-4">
    <div class="h-[28px] min-h-[28px] flex justify-between gap-3 items-center">
      <div class="flex gap-3 items-center h-full">
        <div class="h-full rounded-full bg-blue-900 w-[6px]"></div>
        <h2 class="uppercase text-black font-bold text-[18px] leading-[18px]">Events</h2>
      </div>

      <div class="flex items-center gap-1 rounded-lg bg-slate-200 p-[0px]">
        <div v-for="(tab, idx) in tabData" :key="tab.value"
          :class="idx === activeTab ? 'bg-[#3f5a94] text-white' : 'bg-transparent text-black'" @click="activeTab = idx"
          class="cursor-pointer py-[5px] px-[20px] rounded-lg text-[16px] font-semibold transition-all duration-200">{{
            tab?.name }}</div>
      </div>
    </div>


    <div class="h-[calc(100%-62px)]">
      <UiDataTable :data="driverLogs" :columns="columns" :loading="isLoading" :total="total" :current-page="currentPage"
        :limit="pageLimit" :show-indexes="true" :show-actions="true" :on-edit="hadleEdit" :on-delete="handleDelete"
        @selected-ids="handleSelectedIds" @delete-selected="handleDeleteSelected" @page-change="handlePageChange"
        @limit-change="handleLimitChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { driverLogs } from './data'
const tabData = ref([
  { name: "All", value: "all" },
  { name: "Events", value: "events" },
  { name: "From", value: "from" }
])
const activeTab = ref(0)
const currentPage = ref(1)
const pageLimit = ref(4)
const total = ref(30)
const isLoading = ref(false)

const handleLimitChange = (e: number) => {
  pageLimit.value = e
}

const handlePageChange = (e: number) => {
  currentPage.value = e
}

const handleDelete = (item: any) => [
  console.log("Deleted", item)
]

const handleSelectedIds = (selectedID: (string | number)[]) => {
  console.log("Selected ids: ", selectedID)
}

const handleDeleteSelected = () => {
  console.log("Delete selected");
}

const hadleEdit = () => {
  console.log("Edit")
}

const columns = ref([
  {
    key: 'start',
    title: 'Time (CDT)',
    width: '200px',
  },
  {
    key: 'duration',
    title: 'Duration',
    width: '120px'
  },
  {
    key: 'type',
    title: 'Event',
    render: (item: any) => {
      const role = item?.type || "Off Duty";
      let classes = "px-2 py-1 text-xs font-semibold rounded-full ";

      if (role === "Off Duty") classes += "bg-blue-100 text-blue-800";
      else if (role === "On Duty") classes += "bg-green-100 text-green-800";
      else if (role === "Sleeper") classes += "bg-purple-100 text-purple-800";
      else if (role === "Driving") classes += "bg-orange-100 text-orange-800";
      return h("span", { class: classes }, role);
    },
    width: "110px"
  },
  {
    key: 'location',
    title: 'Location',
    width: '280px'
  },
  {
    key: 'system',
    title: 'System',
    width: '120px'
  },
  {
    key: 'odometer',
    title: 'Odometer',
    width: '120px'
  },
  {
    key: 'lastLogin',
    title: 'Eng hours',
    width: '120px'
  },
  {
    key: 'notice',
    title: 'Notice',
    width: '120px'
  },
  {
    key: 'status',
    title: 'Status',
    width: '120px'
  }
])
</script>

<style scoped>
/* Add any additional custom styles here */
</style>