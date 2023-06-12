import {Category} from "./Category.tsx";

export type Item = {
    id: number;
    name: string;
    description: string;
    price: number;
    categories: Category[];
};


export const getAllCategories = (items: Item[]): Category[] => {
    const categories: Category[] = [];

    items.forEach((item) => {
        item.categories.forEach((category) => {
            if (!categories.includes(category)) {
                categories.push(category);
            }
        });
    });

    return categories;
};
