<template>
  <div class="p-4 bg-white rounded-lg h-[50vh] min-h-[50vh] flex flex-col gap-4">
     <div class="h-[28px] min-h-[28px] flex gap-3 items-center">
        <div class="h-full rounded-full bg-blue-900 w-[6px]"></div>
        <h2 class="uppercase text-black font-bold text-[18px] leading-[18px]">Events</h2>
     </div>
    
    <!-- <div class="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
      <button
        @click="toggleLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {{ isLoading ? 'Stop Loading' : 'Start Loading' }}
      </button>
      
      <button
        @click="addNewUser"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add User
      </button>
      
      <button
        @click="clearAllData"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Clear All
      </button>
    </div> -->
    <div class="h-[calc(100%-62px)]">
        <UiDataTable
        :data="currentPageData"
        :columns="columns"
        :loading="isLoading"
        :total="totalItems"
        :current-page="currentPage"
        :limit="pageLimit"
        :show-indexes="true"
        :show-actions="true"
        :on-edit="hadleEdit"
        :on-delete="handleDelete"
        @selected-ids="handleSelectedIds"
        @delete-selected="handleDeleteSelected"
        @page-change="handlePageChange"
        @limit-change="handleLimitChange"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Mock data
const generateMockUsers = (count: number) => {
  const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Lisa Davis', 'Tom Miller', 'Anna Garcia', 'Chris Martinez', 'Emily Rodriguez']
  const emails = ['john@example.com', 'jane@example.com', 'mike@example.com', 'sarah@example.com', 'david@example.com', 'lisa@example.com', 'tom@example.com', 'anna@example.com', 'chris@example.com', 'emily@example.com']
  const roles = ['Admin', 'User', 'Manager', 'Developer', 'Designer']
  const statuses = ['Active', 'Inactive', 'Pending']

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: names[index % names.length],
    email: emails[index % emails.length],
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    lastLogin: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString()
  }))
}

// Reactive data
const allUsers = ref(generateMockUsers(47)) // Generate 47 users for pagination testing
const isLoading = ref(false)
const currentPage = ref(1)
const pageLimit = ref(20)
const selectedIds = ref<(string | number)[]>([])

// Computed properties
const totalItems = computed(() => allUsers.value.length)

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageLimit.value
  const end = start + pageLimit.value
  return allUsers.value.slice(start, end)
})

// Table columns configuration
const columns = ref([
  {
    key: 'name',
    title: 'Name',
    width: '200px'
  },
  {
    key: 'email',
    title: 'Email',
    width: '250px'
  },
  {
    key: 'role',
    title: 'Role',
    width: '120px',
    render: (item: any) => ({
      template: `<span class="px-2 py-1 text-xs font-semibold rounded-full" :class="{
        'bg-blue-100 text-blue-800': item.role === 'Admin',
        'bg-green-100 text-green-800': item.role === 'User',
        'bg-purple-100 text-purple-800': item.role === 'Manager',
        'bg-orange-100 text-orange-800': item.role === 'Developer',
        'bg-pink-100 text-pink-800': item.role === 'Designer'
      }">{{ item.role }}</span>`,
      props: { item }
    })
  },
  {
    key: 'status',
    title: 'Status',
    width: '100px',
    render: (item: any) => ({
      template: `<span class="px-2 py-1 text-xs font-semibold rounded-full" :class="{
        'bg-green-100 text-green-800': item.status === 'Active',
        'bg-red-100 text-red-800': item.status === 'Inactive',
        'bg-yellow-100 text-yellow-800': item.status === 'Pending'
      }">{{ item.status }}</span>`,
      props: { item }
    })
  },
  {
    key: 'createdAt',
    title: 'Created At',
    width: '120px'
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    width: '120px'
  }
])

// Event handlers
const handleSelectedIds = (ids: (string | number)[]) => {
  selectedIds.value = ids
}

const handleDeleteSelected = (ids: (string | number)[]) => {
  // Simulate API call
  setTimeout(() => {
    allUsers.value = allUsers.value.filter(user => !ids.includes(user.id))
    
    // Adjust current page if necessary
    const maxPage = Math.ceil(allUsers.value.length / pageLimit.value)
    if (currentPage.value > maxPage && maxPage > 0) {
      currentPage.value = maxPage
    }
  }, 500)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleLimitChange = (limit: number) => {
  pageLimit.value = limit
  currentPage.value = 1 // Reset to first page
}

const handleDelete = (item: any) => {
  if (confirm(`Are you sure you want to delete ${item.name}?`)) {
    allUsers.value = allUsers.value.filter(user => user.id !== item.id)
  }
}

const hadleEdit = (e : any) => {
    console.log("Edit")
}

// Test functions
const toggleLoading = () => {
  isLoading.value = !isLoading.value
  
  if (isLoading.value) {
    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  }
}

const addNewUser = () => {
  const newUser = {
    id: Math.max(...allUsers.value.map(u => u.id)) + 1,
    name: `New User ${Date.now()}`,
    email: `newuser${Date.now()}@example.com`,
    role: 'User',
    status: 'Active',
    createdAt: new Date().toLocaleDateString(),
    lastLogin: new Date().toLocaleDateString()
  }
  
  allUsers.value.unshift(newUser)
}

const clearAllData = () => {
  if (confirm('Are you sure you want to clear all data?')) {
    allUsers.value = []
    currentPage.value = 1
    selectedIds.value = []
  }
}
</script>

<style scoped>
/* Add any additional custom styles here */
</style>