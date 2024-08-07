import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { type IDepartmentGroups } from "../interface/IDepartmentGroups";
import { ref, readonly } from 'vue'


export const useDepartmentGroupsStore = defineStore('departmentGroupStore', () => {
    const departmentGroup = ref<IDepartmentGroups[]>([]);
    const totalCount = ref<number>(0);
    const selectedDepartmentGroup = ref<IDepartmentGroups | null>(null);

    const fetchDepartmentGroups = async () => {
        try {
            const response = await genericService.getList<IDepartmentGroups>('departments_groups');
            departmentGroup.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch department groups: ', err)
        }
    };

    
    const loadAllDepartmentGroups = async () => {
        try {
            const allDepartmentGroups = await genericService.getAll<IDepartmentGroups>('departments_groups');
            departmentGroup.value = allDepartmentGroups.items;
            totalCount.value = allDepartmentGroups.totalCount;
        } catch (err: any) {
            console.error('Failed to load all departments groups: ', err)
        }
    };


    const departmentGroupsById = async (id: string) => {
        try {
            selectedDepartmentGroup.value = await genericService.getById('departments_group', id);
        } catch (err: any) {
            console.error(`Failed to fetch department groups with id ${id}`)
        }
    };


    const departmentGroupsByFilter = async (filter: string) => {
        try {
            selectedDepartmentGroup.value = await genericService.getFirstListItem('departments_group', filter)
        } catch (err: any) {
            console.error(`Failed to fetch department groups with filter ${filter}`)
        }
    };


    return {
        departmentGroup:readonly(departmentGroup),
        totalCount:readonly(totalCount),
        selectedDepartmentGroup:readonly(selectedDepartmentGroup),
        fetchDepartmentGroups,
        loadAllDepartmentGroups,
        departmentGroupsById,
        departmentGroupsByFilter
    }
})