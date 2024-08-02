import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090/api/');


export default {
    async companyById(id: string) {
        try {
            const record = await pb.collection('companies').getOne(id);
            return record;
        } catch (err: any) {
            console.error('Error fetching company by ID:', err);
            throw err;
        }
    },

    async companiesList (page: number = 1, perPage: number = 50) {
        try {
            const result = await pb.collection('companies').getList(page, perPage);

            return result.items;
        } catch (err: any) {
            console.error('Error fetching companies list:', err);
            throw err;
        }
    },

    async companyByFilter(filter: string) {
        try {
            const result = await pb.collection('companies').getFirstListItem(filter);
            return result;
        } catch (err: any) {
            console.error('Error fetching company by filter:', err);
            throw err;
        }
    }
}
