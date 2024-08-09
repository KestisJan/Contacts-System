<script setup lang="ts">
import { onMounted, ref, watch, readonly } from 'vue'
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
import { IEmployee } from '../../interface/IEmployee';


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

const companyOptions = ref<readonly ICompany[]>([]);
const officeOptions = ref<readonly IOffices[]>([]);
const divisionOptions = ref<readonly IDivisions[]>([]);
const departmentOptions = ref<readonly IDepartment[]>([]);
const groupOptions = ref<readonly IGroups[]>([]);

const filters = ref<{ [key: string]: string }>({});

const emit = defineEmits<{
  (event: 'update-employees', employees: IEmployee[]):void;
}>();

onMounted(async () => {
  try {
    await Promise.all([
      companyStore.fetchCompanies(),
      officeStore.fetchOffices(),
      divisionsStore.fetchDivisions(),
      departmentStore.fetchDeparment(),
      groupStore.fetchGroups()
    ]);

    companyOptions.value = companyStore.companies;
    officeOptions.value = officeStore.offices;
    divisionOptions.value = divisionsStore.divisions;
    departmentOptions.value = departmentStore.departments;
    groupOptions.value = groupStore.groups;
  } catch (err: any) {
    console.error('Error fetching data: ', err)
  } 
});



function buildFilterString(filters: Record<string, string>): string {
    return Object.entries(filters)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' && ');
}

async function applyFilters() {
  const filteredString = buildFilterString(filters.value)

  try {
    await employeeStore.fetchEmployees(filteredString);

    const filteredEmployees = employeeStore.employees

    if (!filteredEmployees) {
      emit('update-employees', []);
    } else {
      emit('update-employees', [...filteredEmployees]);
    }
  } catch (err: any) {
    console.error('Error applying filters:', err)

    emit('update-employees', []);
  }
}


function resetOtherFilters(except: 'company' | 'office' | 'division' | 'department' | 'group') {
    if (except !== 'company') selectedCompany.value = null;
    if (except !== 'office') selectedOffice.value = null;
    if (except !== 'division') selectedDivision.value = null;
    if (except !== 'department') selectedDepartment.value = null;
    if (except !== 'group') selectedGroup.value = null;
}


watch([selectedCompany, selectedOffice, selectedDivision, selectedDepartment, selectedGroup], async ([newCompany, newOffice, newDivision, newDepartment, newGroup]) => {
    filters.value = {};

    if (newCompany) {
        filters.value['company_id'] = newCompany.id;
        resetOtherFilters('company')
    }

    if (newOffice) {
        filters.value['office_id'] = newOffice.id;
        resetOtherFilters('office')
    }

    if (newDivision) {
        filters.value['division_id'] = newDivision.id;
        resetOtherFilters('division')
    }

    if (newDepartment) {
        filters.value['department_id'] = newDepartment.id;
        resetOtherFilters('department')
    }

    if (newGroup) {
        filters.value['group_id'] = newGroup.id;
        resetOtherFilters('group')
    }

    await applyFilters();
}, { deep: true });


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
        <option v-for="department in departmentOptions" :key="department.id" :value="department">{{ department.name }}</option>
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


