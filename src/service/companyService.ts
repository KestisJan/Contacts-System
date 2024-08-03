import PocketBase from 'pocketbase';
import { type ICompany, ICompanyListResponse } from '../interface/ICompany';

const pb = new PocketBase('http://127.0.0.1:8090/');


export default {
    async companyById(id: string): Promise<ICompany> {
        try {
            const record = await pb.collection('companies').getOne(id);
            return {
                id: record.id,
                created: record.created,
                updated: record.updated,
                name: record.name,
            } as ICompany;
        } catch (err: any) {
            console.error('Error fetching company by ID:', err)
            throw err;
        }
    },

    async companiesList (page: number = 1, perPage: number = 50, filter: string = '', sort: string = ''): Promise<ICompanyListResponse> {
        try {
            const result = await pb.collection('companies').getList(page, perPage, { filter, sort });

            return {
                items: result.items.map(item => ({
                    id: item.id,
                    created: item.created,
                    updated: item.updated,
                    name: item.name,
                })),
                totalCount: result.totalItems,
            } as ICompanyListResponse;
        } catch (err: any) {
            console.error('Error fetching companies list:', err);
            throw err;
        }
    },

    async companyByFilter(filter: string): Promise<ICompany> {
        try {
            const result = await pb.collection('companies').getFirstListItem(filter);

            return {
                id: result.id,
                created: result.created,
                updated: result.updated,
                name: result.name,
            } as ICompany;
            
        } catch (err: any) {
            console.error('Error fetching company by filter:', err);
            throw err;
        }
    },

    async getAllCompanies(): Promise<ICompany[]> {
        try {
            const result = await pb.collection('companies').getFullList();

            return result.map(item => ({
                id: item.id,
                created: item.created,
                updated: item.updated,
                name: item.name,
            })) as ICompany[];

        } catch (err: any) {
            console.error('Error fetching company list:', err);
            throw err;
        }
    }
}
