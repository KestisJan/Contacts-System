<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCompanyStore } from '../../stores/CompanyStore';

const companyStore = useCompanyStore();
const isLoading = ref(true)


const loadData = async () => {
    isLoading.value = true;

    try {
        await companyStore.loadAllCompanies();

        const response = companyStore.companies;

        console.log(response)
    } catch (err: any) {
        console.error('Error loading data:', err)
    } finally {
        isLoading.value = false;
    }
   
};

onMounted(() => {
    loadData()
})


</script>

<template>
    <div>
        <p v-if="isLoading">Loading...</p>
        <ul v-else>
            <li v-for="company in companyStore.companies" :key="company.id">
                {{ company.name }}
            </li>
        </ul>
    </div>
</template>