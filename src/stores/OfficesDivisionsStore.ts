import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { type IOfficesDivisions } from "../interface/IOfficesDivision";
import { ref, readonly } from 'vue'


export const useOfficesDivisionsStore = defineStore('officesDivisionsStore', () => {
    const officesDivisions = ref<IOfficesDivisions[]>([]);
    const totalCount = ref<number>(0);
    const selectedOfficesDivisions = ref<IOfficesDivisions | null>(null);


    const fetchOfficesDivisions = async () => {
        try {
            const response = await genericService.getList<IOfficesDivisions>('offices_divisions')
            officesDivisions.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch offices divisions: ', err)
        }
    };


    const loadAllOfficesDivisions = async () => {
        try {
            const allOfficesDivisions = await genericService.getAll<IOfficesDivisions>('offices_divisions')
            officesDivisions.value = allOfficesDivisions.items;
            totalCount.value = allOfficesDivisions.totalCount;
        } catch (err: any) {
            console.error('Failed to load offices divisions: ', err)
        }
    };


    const getOfficesDivisionsById = async (id: string) => {
        try {
            selectedOfficesDivisions.value = await genericService.getById<IOfficesDivisions>('offices_divisions', id)
        } catch (err: any) {
            console.error(`Failed to fetch offices divisions by id ${id}: `, err)
        }
    };


    const getOfficesDivisionsByFilter = async (filter: string) => {
        try {
            selectedOfficesDivisions.value = await genericService.getFirstListItem<IOfficesDivisions>('offices_divisions', filter)
        } catch (err: any) {
            console.error(`Failed to filter offices with filter ${filter}: `, err)
        }
    };


    return {
        officesDivisions:readonly(officesDivisions),
        totalCount:readonly(totalCount),
        selectedOfficesDivisions:readonly(selectedOfficesDivisions),
        fetchOfficesDivisions,
        loadAllOfficesDivisions,
        getOfficesDivisionsById,
        getOfficesDivisionsByFilter
    }
})