<script setup lang="ts">
import { useEmployeeStore } from '../../stores/EmployeeStore';
import { useOfficeStore } from '../../stores/OfficeStore';
import { ref, onMounted } from 'vue';
import { type IEmployee } from '../../interface/IEmployee';
import account from '../../assets/Test Account.png';
import { type IOffice } from '../../interface/IOffice';

const employeeStore = useEmployeeStore();
const officeStore = useOfficeStore();
const isLoading = ref(true);

const employees = ref<IEmployee[]>([]);
const offices = ref<Record<string, IOffice>>({});

const loadData = async () => {
    isLoading.value = true;

    try {
        await employeeStore.loadAllEmployees();
        employees.value = employeeStore.employees;

        const officeIds = [...new Set(employees.value.map(employee => employee.office_id).filter(id => id))];

        await Promise.all(
            officeIds.map(async id => {
                if (id) {
                    await officeStore.getOfficeById(id);
                    if (officeStore.selectedOffice) {
                        offices.value[id] = officeStore.selectedOffice;
                    }
                }
            })
        );

    } catch (err: any) {
        console.error('Error loading data: ', err);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    loadData();
});
</script>


<template>
    <div v-if="!isLoading">
        <div v-for="employee in employees" :key="employee.id" class="employee-card">
            <header>
                <div>
                    <img :src="account" alt="account" class="" style=""/>
                </div>
                <div>
                    <h3>{{ employee.name }} {{ employee.surname }}</h3>
                    <h4>Position: {{ employee.position }}</h4>
                </div>
            </header>
            <section>
                <h4>Telefono nr. {{ employee.phone_number }}</h4>
                <h4>El. pastas: {{ employee.email }}</h4>
                <h4>Adresas:
                    <template v-if="employee.office_id && offices[employee.office_id]">
                        {{ offices[employee.office_id].name }}
                    </template>
                    <template v-else>
                        No address available
                    </template>
                </h4>
            </section>
        </div>
    </div>
</template>

