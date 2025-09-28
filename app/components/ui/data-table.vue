<template>
    <div class="rounded-[8px] border border-[#E2E8F0] relative h-full flex flex-col overflow-hidden">
        <div v-if="loading"
            class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 rounded-[8px]">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>

        <div class="overflow-auto custom-scroll">
            <table class="w-full table-auto">
                <thead class="sticky top-0 z-40 bg-white shadow-[inset_0_-1px_0_0_#E2E8F0]">
                    <tr>
                        <th class="px-4 py-3 head-text text-left border-r border-gray-300 w-[60px]">
                            <div class="flex items-center gap-2 w-full">
                                <input type="checkbox" :checked="isAllSelected" :indeterminate="isSomeSelected"
                                    @change="toggleSelectAll"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                <div v-if="showIndexes" class="head-text text-left bg-white font-bold">#</div>
                            </div>
                        </th>


                        <th v-for="column in columns" :key="String(column.key)"
                            class="p-2 text-left border-r border-[#E2E8F0]" :style="{ width: column.width }">
                            <div class="flex items-center gap-3 w-[max-content]">
                                <p class="head-text">{{ column.title }}</p>
                            </div>
                        </th>

                        <th v-if="showActions" class="p-2 w-[72px] min-w-[72px] z-40">
                            <p class="head-text">Actions</p>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in data" :key="getItemId(item) || index"
                        class="border-b border-[#E2E8F0] hover:bg-slate-100">
                        <td class="px-4 py-2 border-r border-[#E2E8F0] w-[60px]">
                            <div class="flex items-center gap-2 w-full">
                                <input type="checkbox" :value="getItemId(item)"
                                    :checked="selectedIds.includes(getItemId(item))"
                                    @change="toggleSelectItem(getItemId(item))"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                <div v-if="showIndexes" class="id-text">
                                    {{ (currentPage - 1) * limit + index + 1 }}
                                </div>
                            </div>
                        </td>


                        <td v-for="column in columns" :key="String(column.key)"
                            class="px-[16px] py-2 item-text z-20 border-r border-[#E2E8F0]">
                            <span v-if="column.render">
                                <!-- render funksiyani chaqiramiz -->
                                <component :is="column.render(item)" />
                            </span>
                            <span v-else>{{ getItemValue(item, column.key) }}</span>
                        </td>

                        <td v-if="showActions && onEdit && onDelete" class="p-2">
                            <div class="flex items-center gap-2">
                                <button @click="onEdit(item)" class="p-2 hover:bg-gray-100 rounded" title="Edit">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <path
                                            d="M12.146.854a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-10 10A.5.5 0 0 1 4 13H1.5a.5.5 0 0 1-.5-.5v-2.5a.5.5 0 0 1 .146-.354l10-10zM11.207 2.5L2.5 11.207V12.5h1.293L12.5 3.793L11.207 2.5z" />
                                    </svg>
                                </button>
                                <button @click="onDelete(item)" class="p-2 hover:bg-red-100 text-red-600 rounded"
                                    title="Delete">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="selectedIds.length > 0"
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-red-300 rounded-lg shadow-lg px-4 py-2 z-50">
            <button @click="handleDeleteSelected"
                class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
                Delete Selected ({{ selectedIds.length }})
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Column<T = any> {
    key: string
    title: string
    width?: string
    render?: (item: T) => any
}

interface TableProps<T = any> {
    data?: T[]
    columns: Column<T>[]
    loading?: boolean
    currentPage?: number
    limit?: number
    showIndexes?: boolean
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    showActions?: boolean
    idKey?: string // Key to use for item ID (default: 'id')
}

const props = withDefaults(defineProps<TableProps>(), {
    data: () => [],
    loading: false,
    currentPage: 1,
    limit: 20,
    showIndexes: true,
    showActions: true,
    idKey: 'id'
})

const emit = defineEmits<{
    selectedIds: [ids: (string | number)[]]
    deleteSelected: [ids: (string | number)[]]
}>()

// Selected items tracking
const selectedIds = ref<(string | number)[]>([])

// Computed properties - removed pagination related computed properties

const isAllSelected = computed(() => {
    return props.data?.length > 0 && selectedIds.value.length === props.data?.length
})

const isSomeSelected = computed(() => {
    return selectedIds.value.length > 0 && selectedIds.value.length < (props.data?.length || 0)
})

// Helper functions
const getItemId = (item: any): string | number => {
    return item[props.idKey] || item.id || ''
}

const getItemValue = (item: any, key: string): string => {
    return String(item[key] || '')
}

// Selection methods
const toggleSelectAll = () => {
    if (isAllSelected.value) {
        selectedIds.value = []
    } else {
        selectedIds.value = props.data?.map(item => getItemId(item)) || []
    }
}

const toggleSelectItem = (id: string | number) => {
    const index = selectedIds.value.indexOf(id)
    if (index > -1) {
        selectedIds.value.splice(index, 1)
    } else {
        selectedIds.value.push(id)
    }
}

const handleDeleteSelected = () => {
    emit('deleteSelected', [...selectedIds.value])
    selectedIds.value = []
}

// Watch for changes and emit selected IDs
watch(selectedIds, (newIds) => {
    emit('selectedIds', [...newIds])
}, { deep: true })

// Clear selection when data changes
watch(() => props.data, () => {
    selectedIds.value = []
})
</script>

<style scoped>
.head-text {
    @apply text-sm font-semibold text-gray-500;
}

.id-text {
    @apply text-sm font-bold text-gray-600;
}

.item-text {
    @apply text-sm font-semibold text-gray-900;
}

/* Custom checkbox indeterminate style */
input[type="checkbox"]:indeterminate {
    @apply bg-blue-600 border-blue-600;
}

input[type="checkbox"]:indeterminate::before {
    content: '';
    @apply block w-2 h-0.5 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}
</style>