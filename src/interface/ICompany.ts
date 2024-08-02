export interface ICompany {
   id: string;
   created: string;
   updated: string;
   name: string;
}


export interface ICompanyListResponse {
    items: ICompany[];
    totalCount: number;
}