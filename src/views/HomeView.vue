<script setup lang="ts">
import { ref } from 'vue'
import CompanyList from '../components/company/CompanyList.vue';
import EmployeesCard from '../components/employees/EmployeesCard.vue';
import SearchBar from '../components/common/SearchBar.vue';
import FilterBar from '../components/common/FilterBar.vue';
import { type IEmployee } from '../interface/IEmployee';

const filteredEmployees = ref<IEmployee[]>([]);
const searchQuery = ref<string>('');

function handleUpdateEmployees(newEmployees: IEmployee[]) {
    filteredEmployees.value = newEmployees;
}

function handleSearch(newSearch: string) {
    searchQuery.value = newSearch
    console.log(searchQuery)
}

</script>


<template>
    <h2>Kontaktų sistema</h2>
    <FilterBar @update-employees="handleUpdateEmployees" :searchQuery="searchQuery"/>
    <SearchBar @search="handleSearch"/>
    <EmployeesCard :filteredEmployees="filteredEmployees"/>
</template>