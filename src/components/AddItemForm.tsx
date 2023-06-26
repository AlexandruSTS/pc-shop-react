import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Select from 'react-select';

export interface ItemsControllerProps {
    itemList: Item[];
    addItemToList: (item: Item) => void;
}

const AddItemForm = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [categories, setCategories] = useState<Category[]>([]);
    const [newItem, setNewItem] = useState<Item>({
        id: undefined,
        name: '',
        description: '',
        price: undefined,
        categories: [],
    });

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const accessToken = await getAccessTokenSilently();

                const response = await fetch('/pc-shop/categories/all-categories', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [getAccessTokenSilently]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (selectedOptions: any) => {
        const selectedCategoryIds = selectedOptions.map((option: any) => option.value);
        const selectedCategories = categories.filter((category) =>
            selectedCategoryIds.includes(category.id)
        );
        setSelectedCategories(selectedCategories);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const accessToken = await getAccessTokenSilently();

            const newItemData = {
                ...newItem,
                categories: selectedCategories,
            };

            const response = await fetch('/pc-shop/items/add-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newItemData),
            });

            if (response.ok) {
                // const newItem = await response.json();
                setErrorMessage('Item added successfully');
            } else {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    return (
        <div>
            <h2>Add Item</h2>

            {errorMessage && <div className="error">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newItem.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={newItem.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={newItem.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Select
                        id="category"
                        name="category"
                        isMulti
                        options={categoryOptions}
                        value={selectedCategories.map((category) => ({
                            value: category.id,
                            label: category.name,
                        }))}
                        onChange={handleCategoryChange}
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItemForm;
