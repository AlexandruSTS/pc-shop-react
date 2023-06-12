import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Item } from '../types/Item.tsx';
import './css/PaginationComponent.css'; // Import the CSS file for component styling

const PaginationComponent = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [sortOption, setSortOption] = useState('name,asc');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/pc-shop/items/all-items', {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        sort: sortOption,
                    },
                });
                const { content, totalPages } = response.data;
                setItems(content);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [currentPage, pageSize, sortOption]);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (e: any) => {
        setSortOption(e.target.value);
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 0; i < totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    disabled={currentPage === i}
                >
                    {i + 1}
                </button>
            );
        }
        return buttons;
    };

    const calculateItemNumber = (index: number) => {
        return currentPage * pageSize + index + 1;
    };

    return (
        <div>
            <div>
                <label htmlFor="pageSize">Results per page:</label>
                <select
                    id="pageSize"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                </select>
            </div>
            <div>
                <label htmlFor="sortOption">Sort by:</label>
                <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                    <option value="name,asc">Name (Ascending)</option>
                    <option value="name,desc">Name (Descending)</option>
                    <option value="price,asc">Price (Ascending)</option>
                    <option value="price,desc">Price (Descending)</option>
                </select>
            </div>
            <table className="item-table">
                <thead>
                <tr>
                    <th>No°</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Categories</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item: Item, index) => (
                    <tr key={item.id}>
                        <td>{calculateItemNumber(index)}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.categories.map((category) => category.name).join(', ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                {renderPageButtons()}
            </div>
        </div>
    );
};

export default PaginationComponent;
