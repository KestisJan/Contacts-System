import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { ref, readonly } from 'vue'
import { type ICompanyOffice } from "../interface/ICompanyOffice";

export const useCompanyOfficeStore = defineStore('companyOfficeStore', () => {
    const companiesOffice = ref<ICompanyOffice[]>([]);
    const totalCount = ref<number>(0);
    const selectedOfficeCompany = ref<ICompanyOffice | null>(null);

    const fetchCompaniesOffice = async () => {
        try {
            const response = await genericService.getList<ICompanyOffice>('companies_offices');
            companiesOffice.value = response.items;
            totalCount.value = response.totalCount;
        } catch (err: any) {
            console.error('Failed to fetch data companies offices: ', err)
        }
    };


    const loadAllCompaniesOffices = async () => {
        try {
            const allCompaniesOffices = await genericService.getAll<ICompanyOffice>('companies_offices'); 
            companiesOffice.value = allCompaniesOffices.items;
            totalCount.value = allCompaniesOffices.totalCount;
        } catch (err: any) {
            console.error('Failed to load all companies: ', err);
        }
    };


    const getCompaniesOfficesById = async (id: string) => {
        try {
            selectedOfficeCompany.value = await genericService.getById<ICompanyOffice>('companies_offices', id);
        } catch (err: any) {
            console.error(`Failed to fetch companies offices with id ${id}: `, err)
        }
    }

    const getCompaniesOfficesByFilter = async (filter: string) => {
        try {
            selectedOfficeCompany.value = await genericService.getFirstListItem<ICompanyOffice>('companies_offices', filter)
        } catch (err: any) {
            console.error(`Failed to fetch companies offices with filter ${filter}: `, err)
        }
    }



    return {
        companiesOffice:readonly(companiesOffice),
        totalCount:readonly(totalCount),
        selectedOfficeCompany:readonly(selectedOfficeCompany),
        fetchCompaniesOffice,
        loadAllCompaniesOffices,
        getCompaniesOfficesById,
        getCompaniesOfficesByFilter
    }

})