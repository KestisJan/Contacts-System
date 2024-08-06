import { defineStore } from "pinia";
import genericService from "../service/genericService";
import { readonly, ref } from 'vue'
import { type ICompany, ICompanyListResponse } from "../interface/ICompany";

export const useCompanyStore = defineStore("companyStore", () => {
  const companies = ref<ICompany[]>([]);  
  const totalCount = ref<number>(0);
  const selectedCompany = ref<ICompany | null>(null);

  const fetchCompanies = async () => {
    try {
      const response = await genericService.getList<ICompany>('companies');
      companies.value = response.items;
      totalCount.value = response.totalCount;
    } catch (err: any) {
      console.error('Failed to fetch companies', err)
    }
  };

  const loadAllCompanies = async () => {
    try {
      const allCompanies = await genericService.getAll<ICompany>('companies');
      companies.value = allCompanies.items;
      totalCount.value = allCompanies.totalCount;
    } catch (err: any) {
      console.error('Failed to load all companies: ', err);
    }
  };

  const getCompanyById = async (id: string) => {
    try {
      selectedCompany.value = await genericService.getById<ICompany>('companies', id);
    } catch (err: any) {
      console.error(`Failed to fetch company with ID ${id}:`, err);
    }
  };


  const getCompanyByFilter = async (filter: string) => {
    try {
      selectedCompany.value = await genericService.getFirstListItem<ICompany>('companies', filter);
    } catch (err: any) {
      console.error(`Failed to fetch company with filter ${filter}:`, err);
    }
  };

  return {
    companies:readonly(companies),
    totalCount:readonly(totalCount),
    selectedCompany: readonly(selectedCompany),
    fetchCompanies,
    loadAllCompanies,
    getCompanyById,
    getCompanyByFilter
    
  };
});