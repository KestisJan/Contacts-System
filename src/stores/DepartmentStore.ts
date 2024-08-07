import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { type IDepartment } from "../interface/IDepartment";
import {ref, readonly } from 'vue'


export const useDepartmentStore = defineStore('departmentStore', () => {
    const departments = ref<IDepartment[]>([]);
    const totalCount = ref<number>(0);
    const selectedDepartment = ref<IDepartment | null>(null);

    const fetchDeparment = async () => {
        try {
            const response = await genericService.getList<IDepartment>('departments');
            departments.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch departments: ', err)
        }
    };


    const loadDeparments = async () => {
        try {
            const allDepartments = await genericService.getAll<IDepartment>('departments');
            departments.value = allDepartments.items;
            totalCount.value = allDepartments.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch all deparments: ', err)
        }
    };


    const getDepartmentById = async (id: string) => {
        try {
            selectedDepartment.value = await genericService.getById<IDepartment>('departments', id);
        } catch (err: any) {
            console.error(`Failed to fetch deparment with id ${id}: `, err);
        }
    };


    const getDepartmentByFilter = async (filter: string) => {
        try {
            selectedDepartment.value = await genericService.getFirstListItem<IDepartment>('deparments', filter);
        } catch (err: any) {
            console.error(`Failed to fetch department with filter ${filter}: `, err)
        }
    };


    return {
        departments:readonly(departments),
        totalCount:readonly(totalCount),
        selectedDepartment:readonly(selectedDepartment),
        fetchDeparment,
        loadDeparments,
        getDepartmentById,
        getDepartmentByFilter
    }
})
