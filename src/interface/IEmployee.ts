export interface IEmployee {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone_number?: string;
    position: string;
    company_id: string;
    office_id?: string;
    division_id?: string;
    department_id?: string;
    group_id?: string;
    photo?: string;
    created: string;
    updated: string;
}