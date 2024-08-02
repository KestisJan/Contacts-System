<script setup lang="ts">
import { onMounted } from 'vue';
import { useCompanyStore } from '../../stores/CompanyStore';

const store = useCompanyStore();

const loadCompanies = async () => {
    await store.fetchCompanies();

    console.log('Companies:', store.companies);
    console.log('Companies:', store.totalCount);

}

onMounted(() => {
    loadCompanies();
})

</script>

<template>
    <div>
      
    </div>

</template>