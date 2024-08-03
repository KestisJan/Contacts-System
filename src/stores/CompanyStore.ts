import { defineStore } from "pinia";
import companyService from "../service/companyService";
import { readonly, ref } from 'vue'
import { type ICompany, ICompanyListResponse } from "../interface/ICompany";

export const useCompanyStore = defineStore("companyStore", () => {
  const companies = ref<ICompany[]>([]);  
  const totalCount = ref<number>(0);


  const fetchCompanies = async () => {
    try {
        const response: ICompanyListResponse = await companyService.getFullList()
        companies.value = response.items;
        totalCount.value = response.totalCount;
    } catch (err: any) {
        console.error('Failed to fetch companies', err)
    } 
  };

  const loadAllCompanies = async () => {
    try {
      const allCompanies = await companyService.getAllCompanies();
      companies.value = allCompanies;
    } catch (err: any) {
      console.error('Failed to load all companies:', err);
    }

  };


  return {
    companies:readonly(companies),
    totalCount,
    fetchCompanies,
    loadAllCompanies,
  };
});