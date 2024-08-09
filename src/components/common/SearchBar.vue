<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';
import { useEmployeeStore } from '../../stores/EmployeeStore';
import { ISearchField } from '../../interface/ISearchField'

const employeeStore = useEmployeeStore()
const searchQuery = ref('');
const timeoutId = ref<number | null>(null);


const props = defineProps<{
    searchField: ISearchField[];
}>();

const emit = defineEmits<{
    (event: 'search', query: string): void;
}>();


const debounce = (callback: TimerHandler, delay: number) => {
    if (timeoutId.value !== null) clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(callback, delay);
}


watch(searchQuery, () => {
    debounce(() => {
        emit('search', searchQuery.value)
    }, 300)
});


</script>


<template>
    <div>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Ieskoti kontakto..."
            class="search-bar w-full p-4 mb-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
</template>