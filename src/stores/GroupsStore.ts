import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { type IGroups } from "../interface/IGroups";
import { ref, readonly } from 'vue'


export const useGroupsStore = defineStore('groupsStore', () => {
    const groups = ref<IGroups[]>([]);
    const totalCount = ref<number>(0);
    const selectedGroups = ref<IGroups | null>(null);


    const fetchGroups = async () => {
        try {
            const response = await genericService.getList<IGroups>('groups');
            groups.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch groups: ', err)
        }
    };

    
    const loadGroups = async () => {
        try {
            const allGroups = await genericService.getAll<IGroups>('groups');
            groups.value = allGroups.items;
            totalCount.value = allGroups.totalCount;
        } catch (err: any) {
            console.error('Failed to load groups: ', err)
        }
    };


    const getGroupsById = async (id: string) => {
        try {
            selectedGroups.value = await genericService.getById('groups', id)
        } catch (err: any) {
            console.error(`Failed to fetch groups with id ${id}`, id)
        }
    };


    const getGroupsByFilter = async (filter: string) => {
        try {
            selectedGroups.value = await genericService.getFirstListItem('groups', filter)
        } catch (err: any) {
            console.error(`Failed to fetch groups with filter ${filter}: `, err)
        }
    };


    return {
        groups:readonly(groups),
        totalCount:readonly(totalCount),
        selectedGroups:readonly(selectedGroups),
        fetchGroups,
        loadGroups,
        getGroupsById,
        getGroupsByFilter
    }
})