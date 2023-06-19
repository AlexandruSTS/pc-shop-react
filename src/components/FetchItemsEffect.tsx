import { useEffect } from 'react';

interface FetchItemsEffectProps {
    isAuthenticated: boolean;
    currentPage: number;
    pageSize: number;
    sortOption: string;
    getAccessTokenSilently: () => Promise<string>;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const useFetchItemsEffect = ({
                                 isAuthenticated,
                                 currentPage,
                                 pageSize,
                                 sortOption,
                                 getAccessTokenSilently,
                                 setItems,
                                 setTotalPages,
                             }: FetchItemsEffectProps) => {
    useEffect(() => {
        if (isAuthenticated) {
            const fetchItems = async () => {
                const queryParams = new URLSearchParams({
                    page: String(currentPage),
                    size: String(pageSize),
                    sort: sortOption,
                });

                try {
                    const accessToken = await getAccessTokenSilently();

                    const response = await fetch(`/pc-shop/items/all-items?${queryParams}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    const { content, totalPages } = await response.json();
                    setItems(content);
                    setTotalPages(totalPages);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            };

            fetchItems();
        }
    }, [currentPage, pageSize, sortOption, isAuthenticated, getAccessTokenSilently, setItems, setTotalPages]);
};

export default useFetchItemsEffect;
