import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { readonly, ref } from "vue";
import { IOffices } from '../interface/IOffices'

export const useOfficeStore = defineStore('officeStore', () => {
    const offices = ref<IOffices[]>([]);
    const totalCount = ref<number>(0);
    const selectedOffice = ref<IOffices | null>(null);

    const fetchOffices = async () => {
        try {
            const response = await genericService.getList<IOffices>('offices');
            offices.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch offices: ', err);
        }
    };

    const loadAllOffices = async () => {
        try {
            const allOffices = await genericService.getAll<IOffices>('offices');
            offices.value = allOffices.items;
            totalCount.value = allOffices.totalCount;
        } catch (err: any) {
            console.error('Failed to load all offices: ', err);
        }
    };

    const getOfficeById = async (id: string) => {
        try {
            selectedOffice.value = await genericService.getById<IOffices>('offices', id);
            console.log(selectedOffice);
        } catch (err: any) {
            console.error(`Failed to fetch office by id ${id}: `, err)
        }
    };

    const getOfficeByFilter = async (filter: string) => {
        try {
            selectedOffice.value = await genericService.getFirstListItem<IOffices>('offices', filter);
        } catch (err: any) {
            console.error(`Failed to fetch office with filter ${filter}:`, err);
        }
    };

    return {
        offices: readonly(offices),
        totalCount: readonly(totalCount),
        selectedOffice: readonly(selectedOffice),
        fetchOffices,
        loadAllOffices,
        getOfficeById,
        getOfficeByFilter
    }
})