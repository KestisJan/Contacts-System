<script setup lang="ts">
import { useEmployeeStore } from '../../stores/EmployeeStore';
import { ref, onMounted } from 'vue';
import { type IEmployee } from '../../interface/IEmployee';
import account from '../../assets/Test Account.png'

const employeeStore = useEmployeeStore();
const isLoading = ref(true);

const employees = ref<IEmployee[]>([]);

const loadData = async () => {
    isLoading.value = true;

    try {
        await employeeStore.loadAllEmployees();

        console.log(employeeStore.employees);
        employees.value = employeeStore.employees;
    } catch (err: any) {
        console.error('Error loading data: ', err);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    loadData();
})


</script>


<template>
    <div v-if="!isLoading">
        <div v-for="employee in employees" :key="employee.id" class="employee-card">
            <header>
                <div>
                    <img :src="account" alt="account" class="" style=""/>
                </div>
                <div>
                    <h3>{{ employee.name }} {{ employee.surname}}</h3>
                    <h4>Position: {{ employee.position }}</h4>
                </div>
            </header>
            <section>
                <h4>Telefono nr. {{ employee.phone_number }}</h4>
                <h4>El. pastas: {{ employee.email}}</h4>
                <h4>Adresas: </h4>
            </section>
        </div>
    </div>
</template>