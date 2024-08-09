<script setup lang="ts">
import { ref } from 'vue'
import CompanyList from '../components/company/CompanyList.vue';
import EmployeesCard from '../components/employees/EmployeesCard.vue';
import FilterBar from '../components/common/FilterBar.vue';
import { type IEmployee } from '../interface/IEmployee';

const filteredEmployees = ref<IEmployee[]>([]);

function handleUpdateEmployees(newEmployees: IEmployee[]) {
    filteredEmployees.value = newEmployees;
}

</script>


<template>
    <h2>Kontaktų sistema</h2>
    <FilterBar @update-employees="handleUpdateEmployees" />
    <EmployeesCard :filteredEmployees="filteredEmployees"/>
</template>