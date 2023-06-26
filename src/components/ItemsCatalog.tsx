import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Table } from 'react-bootstrap';


const ItemsCatalog: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [sortOption, setSortOption] = useState<string>('price,desc');
    const [items, setItems] = useState<Item[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [eTag, setETag] = useState<string | null>(null);
    const {getAccessTokenSilently, isAuthenticated } = useAuth0();

    const fetchItems = async () => {
        if (isAuthenticated) {
            const queryParams = new URLSearchParams({
                page: String(currentPage),
                size: String(pageSize),
                sort: sortOption,
            });

            try {
                const accessToken = await getAccessTokenSilently();
                const headers: HeadersInit = {
                    Authorization: `Bearer ${accessToken}`,
                };

                // Include the If-None-Match header if ETag exists
                if (eTag) {
                    headers['If-None-Match'] = eTag;
                }

                const response = await fetch(`/pc-shop/items/all-items?${queryParams}`, {
                    headers,
                });

                // Not modified, return from cache
                if (response.status === 304) {
                    return;
                }

                if (response.ok) {
                    const { content, totalPages } = await response.json();
                    setItems(content);
                    setTotalPages(totalPages);

                    // Get the new ETag value from the response headers
                    setETag(response.headers.get('ETag'));
                } else {
                    console.error('Error fetching items:', response.status);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }
    };


    useEffect(() => {
        fetchItems();
    }, [currentPage, pageSize, sortOption, isAuthenticated, getAccessTokenSilently, eTag]);

    const handlePageClick = (pageNumber: number) => {
        // setETag(null);
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newPageSize = Number(e.target.value);
        setPageSize(newPageSize);
        setCurrentPage(Math.floor((currentPage * pageSize) / newPageSize));
    };

    const generatePageNumbers = (): (number | string)[] => {
        const pageNumbers: (number | string)[] = [];
        // Show up to 10 pages
        const totalPagesToShow = Math.min(10, totalPages);

        if (totalPagesToShow <= 9) {
            for (let i = 0; i < totalPagesToShow; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(0, currentPage - 4);
            const endPage = Math.min(startPage + 9, totalPages - 1);

            if (endPage === totalPages - 1) {
                for (let i = endPage - 9; i <= endPage; i++) {
                    pageNumbers.push(i);
                }
            } else {
                for (let i = startPage; i < startPage + 8; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages - 1);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Items Catalog</h2>
                <div>
                    <label htmlFor="sortOption">Sort By:</label>
                    <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                        <option value="name,asc">Name (Ascending)</option>
                        <option value="name,desc">Name (Descending)</option>
                        <option value="price,asc">Price (Ascending)</option>
                        <option value="price,desc">Price (Descending)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="pageSize">Items Per Page:</label>
                    <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Categories</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td>
                            {item.categories.map((category: Category) => (
                                category.name + ' '
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                {generatePageNumbers().map((pageNumber, index) =>
                        pageNumber === '...' ? (
                            <span key={index} className="mx-1">
              {pageNumber}
            </span>
                        ) : (
                            <button
                                key={index}
                                onClick={() => handlePageClick(pageNumber as number)}
                                className={`btn btn-primary mx-1 ${
                                    pageNumber === currentPage ? 'active' : ''
                                }`}
                                style={{ width: '40px' }} // Fixed size of buttons
                            >
                                {pageNumber as number + 1}
                            </button>
                        )
                )}
            </div>
        </div>
    );
};

export default ItemsCatalog;
