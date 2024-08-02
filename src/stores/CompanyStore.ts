import { defineStore } from "pinia";
import companyService from "../service/companyService";
import { readonly, ref } from 'vue'
import { type ICompany, ICompanyListResponse } from "../interface/ICompany";

export const useCompanyStore = defineStore("companyStore", () => {
  const companies = ref<ICompany[]>([]);  
  const totalCount = ref<number>(0);
  const loading = ref<boolean>(false);


  const fetchCompanies = async (page: number = 1, perPage: number = 50) => {
    loading.value = true;

    try {
        const response: ICompanyListResponse = await companyService.companiesList(page, perPage)
        companies.value = response.items;
        totalCount.value = response.totalCount;
    } catch (err: any) {
        console.error('Failed to fetch companies', err)
    } finally {
        loading.value = false;
    }
  };


  return {
    companies:readonly(companies),
    totalCount,
    loading,
    fetchCompanies,
  };
});