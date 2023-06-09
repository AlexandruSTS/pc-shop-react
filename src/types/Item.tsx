import {Category} from "./Category.tsx";

export type Item = {
    id: number;
    name: string;
    description: string;
    price: number;
    categories: Category[];
};