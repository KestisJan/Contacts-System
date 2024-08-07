<script setup lang="ts">
import { useEmployeeStore } from '../../stores/EmployeeStore';
import { useOfficeStore } from '../../stores/OfficesStore';
import { ref, onMounted } from 'vue';
import { type IEmployee } from '../../interface/IEmployee';
import account from '../../assets/Test Account.png';
import { type IOffice } from '../../interface/IOffices';

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
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
                v-for="employee in employees" 
                :key="employee.id" 
                class="employee-card bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4"
            >
                <header class="flex items-center space-x-4">
                    <div>
                        <img 
                            :src="account" 
                            alt="account" 
                            class="h-16 w-16 rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold">{{ employee.name }} {{ employee.surname }}</h3>
                        <h4 class="text-sm text-gray-500">Position: {{ employee.position }}</h4>
                    </div>
                </header>
                <section class="text-sm text-gray-600 space-y-1">
                    <h4>Telefono nr.: {{ employee.phone_number }}</h4>
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
    </div>
</template>

