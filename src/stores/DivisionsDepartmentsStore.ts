import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { type IDivisionDepartments } from "../interface/IDivisionsDepartments";
import { ref, readonly } from 'vue'

export const useDivisionsDepartmentStore = defineStore('divisionsDepartmentStore', () => {
    const divisionDepartments = ref<IDivisionDepartments[]>([]);
    const totalCount = ref<number>(0);
    const selectedDivisionDepartments = ref<IDivisionDepartments | null>(null);


    const fetchDivisionDepartments = async () => {
        try {
            const response = await genericService.getList<IDivisionDepartments>('divisions_departments');
            divisionDepartments.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch list division departments: ', err)
        }
    };


    const loadDivisionDepartments = async () => {
        try {
            const allDivisionDepartments = await genericService.getAll<IDivisionDepartments>('divisions_departments');
            divisionDepartments.value = allDivisionDepartments.items;
            totalCount.value = allDivisionDepartments.totalCount;
        } catch (err: any) {
            console.error('Failed to load division departments: ', err)
        }
    };


    const getDivisionsDepartmentById = async (id: string) => {
        try {
            selectedDivisionDepartments.value = await genericService.getById('divisions_departments', id);
        } catch (err: any) {
            console.error(`Failed to fetch divisions departments id ${id}: `, id)
        }
    };


    const getDivisionsDepartmentByFilter = async (filter: string) => {
        try {
            selectedDivisionDepartments.value = await genericService.getFirstListItem('divisions_departments', filter);
        } catch (err: any) {
            console.error(`Failed to fetch divisions departments with filter ${filter}: `, err)
        }
    };


    return {
        divisionDepartments:readonly(divisionDepartments),
        totalCount:readonly(totalCount),
        selectedDivisionDepartments:readonly(selectedDivisionDepartments),
        fetchDivisionDepartments,
        loadDivisionDepartments,
        getDivisionsDepartmentById,
        getDivisionsDepartmentByFilter
    }
})