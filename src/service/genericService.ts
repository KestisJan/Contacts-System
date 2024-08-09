import PocketBase from 'pocketbase';
import { type IGenericResponse } from '../interface/IGenericResponse';

const pb = new PocketBase('http://127.0.0.1:8090/');

export default {
    async getAll<T>(collectionName: string): Promise<IGenericResponse<T>> {
        try {
            const result = await pb.collection(collectionName).getFullList();
            return {
                items: result.map((item: any) => item as T),
                totalCount: result.length
            };
        } catch (err: any) {
            console.error(`Error fetching data from collection ${collectionName}:`, err);
            throw err;
        }
    },

    async getById<T>(collectionName: string, id: string): Promise<T> {
        try {
            const result = await pb.collection(collectionName).getOne(id);
            return result as T;
        } catch (err: any) {
            console.error(`Error fetching data from collection ${collectionName} by ID ${id}:`, err);
            throw err;
        }
    },

    async getList<T>(collectionName: string, filter: string = '',  sort: string = '', page: number = 1, perPage: number = 25 ): Promise<IGenericResponse<T>> {
        try {
            const result = await pb.collection(collectionName).getList(page, perPage, { filter, sort });
            return {
                items: result.items.map((item: any) => item as T),
                totalCount: result.totalItems,
            };
        } catch (err: any) {
            console.error(`Error fetching paginated data from collection ${collectionName}:`, err);
            throw err;
        }
    },

    async getFirstListItem<T>(collectionName: string, filter: string): Promise<T | null> {
        try {
            const result = await pb.collection(collectionName).getFirstListItem(filter);
            return result as T;
        } catch (err: any) {

            if(err.response.code === 404) {
                console.warn('Item not found.')
                return null;
            } else {
                console.error(`Error fetching first item from collection ${collectionName} with filter ${filter}:`, err);
                throw err;
            }
        }
    }
};
