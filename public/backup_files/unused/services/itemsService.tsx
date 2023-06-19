import axios from "axios";

class ItemsDataService {
    getAll(params: { [key: string]: any }) {
        return axios.get('/pc-shop/items/all-items', { params })
            .then(response => {
                const { content, totalElements } = response.data;
                const totalPages = response.data.totalPages;
                return { items: content, count: totalElements, totalPages: totalPages };
            })
            .catch(error => {
                throw new Error('Error fetching items data: ' + error.message);
            });
    }
}

export default new ItemsDataService();
