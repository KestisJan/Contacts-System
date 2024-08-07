import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { type IDivisions } from "../interface/IDivisions";
import { ref, readonly } from 'vue'


export const useDivisionStore = defineStore('divisionStore', () => {
    const divisions = ref<IDivisions[]>([]);
    const totalCount = ref<number>(0);
    const selectedDivision = ref<IDivisions | null>(null);


    const fetchDivisions = async () => {
        try {
            const response = await genericService.getList<IDivisions>('divisions')
            divisions.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch divisions: ', err)
        }
    };


    const loadAllDivisions = async () => {
        try {
            const allDivisions = await genericService.getAll<IDivisions>('divisions')
            divisions.value = allDivisions.items;
            totalCount.value = allDivisions.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch all divisions: ', divisions)
        }
    };


    const getDivisionsById = async (id: string) => {
        try {
            selectedDivision.value = await genericService.getById<IDivisions>('divisions', id)
        } catch (err: any) {
            console.error(`Failed to fetch division with id ${id}: `, err)
        }
    };


    const getDivisionsByFilter = async (filter: string) => {
        try {
            selectedDivision.value = await genericService.getFirstListItem('divisions', filter)
        } catch (err: any) {
            console.error(`Failed to fetch division with filter ${filter}: `, err)
        }
    };


    return {
        divisions:readonly(divisions),
        totalCount:readonly(totalCount),
        selectedDivision:readonly(selectedDivision),
        fetchDivisions,
        loadAllDivisions,
        getDivisionsById,
        getDivisionsByFilter
    }
})
