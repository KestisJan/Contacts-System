<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCompanyStore } from '../../stores/CompanyStore';
import { useEmployeeStore } from '../../stores/EmployeeStore';
import { useOfficeStore } from '../../stores/OfficesStore';
import { useDivisionStore } from '../../stores/DivisionsStore';
import { useDepartmentStore } from '../../stores/DepartmentStore';
import { useGroupsStore } from '../../stores/GroupsStore';
import { type ICompany } from '../../interface/ICompany';
import { IOffices } from '../../interface/IOffices';
import { IDivisions } from '../../interface/IDivisions';
import { IDepartment } from '../../interface/IDepartment';
import { IGroups } from '../../interface/IGroups';


const companyStore = useCompanyStore();
const officeStore = useOfficeStore();
const employeeStore = useEmployeeStore();
const divisionsStore = useDivisionStore(); 
const departmentStore = useDepartmentStore()
const groupStore = useGroupsStore();

const selectedCompany = ref<ICompany | null>(null);
const selectedOffice = ref<IOffices | null>(null);
const selectedDivision = ref<IDivisions | null>(null);
const selectedDepartment = ref<IDepartment | null>(null);
const selectedGroup = ref<IGroups | null>(null);

const companyOptions = ref<ICompany[]>([]);
const officeOptions = ref<IOffices[]>([]);
const divisionOptions = ref<IDivisions[]>([]);
const departmentOptions = ref<IDepartment[]>([]);
const groupOptions = ref<IGroups[]>([]);

const filters = ref<{ [key: string]: string }>({});

onMounted(async () => {
    await companyStore.fetchCompanies();
    await officeStore.fetchOffices();
    await divisionsStore.fetchDivisions();
    await departmentStore.fetchDeparment()
    await groupStore.fetchGroups();
    companyOptions.value = companyStore.companies;
    officeOptions.value = officeStore.offices;
    divisionOptions.value = divisionsStore.divisions;
    departmentOptions.value = departmentStore.departments;
    groupOptions.value = groupStore.groups;

})

function buildFilterString(filters: Record<string, string>): string {
    return Object.entries(filters)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' && ');
}

async function applyFilters() {
    const filterString = buildFilterString(filters.value);
    await employeeStore.getEmployeeByFilter(filterString);
}

watch([selectedCompany, selectedOffice, selectedDivision, selectedDepartment, selectedGroup], async ([newCompany, newOffice, newDivision, newDepartment, newGroup]) => {
    filters.value = {};

    if (newCompany) {
        filters.value['company_id'] = newCompany.id;
    }

    if (newOffice) {
        filters.value['office_id'] = newOffice.id;
    }

    if (newDivision) {
        filters.value['division_id'] = newDivision.id;
    }

    if (newDepartment) {
        filters.value['department_id'] = newDepartment.id;
    }

    if (newGroup) {
        filters.value['group_id'] = newGroup.id;
    }

    await applyFilters();
}, { deep: true, immediate: true });

</script>


<template>
    <div class="bg-[#FFFFFF] h-16 w-full flex items-center justify-between px-4">
      <select
        v-model="selectedCompany"
        class="p-2 rounded-md bg-white text-black"
      >
        <option value="" disabled>Filtruoti imones</option>
        <option v-for="company in companyOptions" :key="company.id" :value="company">{{ company.name }}</option>
      </select>
      
      <select
        v-model="selectedOffice"
        class="p-2 rounded-md bg-white text-black"
      >
        <option value="" disabled>Filtruoti ofisus</option>
        <option v-for="office in officeOptions" :key="office.id" :value="office">{{ office.name }}</option>
      </select>

      <select
        v-model="selectedDivision"
        class="p-2 rounded-md bg-white text-black"
      >
        <option value="" disabled>Filtruoti padalinius..</option>
        <option v-for="division in divisionOptions" :key="division.id" :value="division">{{ division.name }}</option>
      </select>

      <select
        v-model="selectedDepartment"
        class="p-2 rounded-md bg-white text-black"
      >
        <option value="" disabled>Filtruoti departamentus</option>
        <opttion v-for="department in departmentOptions" :key="department.id" :value="department">{{ department.name }}</opttion>
      </select>
      
      <select
        v-model="selectedGroup"
        class="p-2 rounded-md bg-white text-black"
      >
        <option value="" disabled>Filtruoti grupes</option>
        <option v-for="group in groupOptions" :key="group.id" :value="group">{{ group.name }}</option>
      </select>

    </div>
</template>


