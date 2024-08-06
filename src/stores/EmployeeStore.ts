import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { readonly, ref } from "vue";
import { IEmployee } from "../interface/IEmployee";

export const useEmployeeStore = defineStore('employeeStore', () => {
    const employees = ref<IEmployee[]>([]);
    const totalCount = ref<number>(0);
    const selectedEmployee = ref<IEmployee | null>(null);

    const fetchEmployees = async () => {
        try {
            const response = await genericService.getList<IEmployee>('employees');
            employees.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch employees', err);
        }
    };

    const loadAllEmployees = async () => {
        try {
            const allEmployees = await genericService.getAll<IEmployee>('employees');
            employees.value = allEmployees.items;
            totalCount.value = allEmployees.totalCount;
        } catch (err: any) {
            console.error('Failed to load all employees', err);
        }
    };


    const getEmployeeById = async (id: string) => {
        try {
            selectedEmployee.value = await genericService.getById<IEmployee>('employees', id);
        } catch (err: any) {
            console.error(`Failed to fetch employee with ID ${id}`, err);
            throw err;
        }
    };

    const getEmployeeByFilter = async (filter: string) => {
        try {
            selectedEmployee.value = await genericService.getFirstListItem<IEmployee>('employees', filter);
        } catch (err: any) {
            console.error(`Failed to fetch employee by filter`, err);
            throw err;
        }
    };

    return {
        employees: readonly(employees),
        totalCount: readonly(totalCount),
        fetchEmployees,
        loadAllEmployees,
        getEmployeeById,
        getEmployeeByFilter
    };

})