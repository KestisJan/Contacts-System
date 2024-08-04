<script setup lang="ts">
import { useEmployeeStore } from '../../stores/EmployeeStore';
import { ref, onMounted } from 'vue';

const employeeStore = useEmployeeStore();
const isLoading = ref(true);

const loadData = async () => {
    isLoading.value = true;

    try {
        await employeeStore.loadAllEmployees();

        const response = employeeStore.employees;

        console.log('Fetched data:', response)
    } catch (err: any) {
        console.error('Error loading data: ', err)
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    loadData()
})
</script>


<template>


</template>