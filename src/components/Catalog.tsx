import { useEffect, useState } from 'react';
import { Item } from '../types/Item';

export function getList() {
    return fetch('/pc-shop/items/all-items')
        .then((response) => {
            const contentType = response.headers.get('Content-Type');

            if (contentType && contentType.includes('application/json')) {
                return response.text(); // Get the HTML content as a string
            } else {
                return response.json(); // Parse JSON if the response is in application/json format
            }
        })
        .then((data) => {
            if (typeof data === 'string') {
                // Handle HTML response as a string
                console.log('HTML response:', data);
                return []; // Return an empty array or handle it
                // Handle JSON response
                return data; // Return the JSON data as-is
            }
        });
}

const Catalog = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getList()
            .then(data => setItems(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Catalog</h2>
            {items.map((item) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: {item.price}</p>
                    <p>Categories:</p>
                    <ul>
                        {item.categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Catalog;
