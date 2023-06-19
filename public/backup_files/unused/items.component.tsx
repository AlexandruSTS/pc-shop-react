// import React, {Component, ChangeEvent} from "react";
// import ItemsDataService from "./services/itemsService.tsx";
// import Pagination from '@material-ui/lab/Pagination';
// import {Item} from "../../../src/types/Item.tsx";
//
// interface State {
//     items: Item[];
//     currentItem: Item | null;
//     currentIndex: number;
//     searchTitle: string;
//     page: number;
//     count: number;
//     pageSize: number;
//     totalPages: number | null;
// }
//
// export default class ItemsList extends Component<object, State> {
//     private pageSizes: number[];
//
//     constructor(props: object) {
//         super(props);
//         this.state = {
//             items: [],
//             currentItem: null,
//             currentIndex: -1,
//             searchTitle: "",
//             page: 1,
//             count: 0,
//             pageSize: 5,
//             totalPages: null
//         };
//         this.pageSizes = [5, 10, 20];
//     }
//
//     componentDidMount() {
//         this.retrieveItems();
//     }
//
//     onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
//         const searchTitle = e.target.value;
//         this.setState({
//             searchTitle: searchTitle
//         });
//     };
//
//     getRequestParams(searchTitle: string, page: number, pageSize: number) {
//         const params: { [key: string]: any } = {};
//
//         if (searchTitle) {
//             params["title"] = searchTitle;
//         }
//
//         if (page) {
//             params["page"] = page;
//         }
//
//         if (pageSize) {
//             params["size"] = pageSize;
//         }
//
//         return params;
//     }
//
//     retrieveItems() {
//         const { searchTitle, page, pageSize } = this.state;
//         const params = this.getRequestParams(searchTitle, page, pageSize);
//
//         ItemsDataService.getAll(params)
//             .then(({ items, count, totalPages }) => {
//                 this.setState({
//                     currentIndex: 0, currentItem: null, page: 0, searchTitle: "",
//                     items: items,
//                     count: count,
//                     pageSize: pageSize, // Update the pageSize in state as well
//                     totalPages: totalPages // Add totalPages to state
//                 });
//             })
//             .catch((e) => {
//                 console.log(e);
//             });
//     }
//
//
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
//         this.setState(
//             {
//                 page: value
//             },
//             () => {
//                 this.retrieveItems();
//             }
//         );
//     };
//
//     handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         this.setState(
//             {
//                 pageSize: +event.target.value,
//                 page: 1
//             },
//             () => {
//                 this.retrieveItems();
//             }
//         );
//     };
//
//     render() {
//         const {
//             searchTitle,
//             items,
//             currentIndex,
//             page,
//             count,
//             pageSize
//         } = this.state;
//         return (
//             <div className="list row">
//                 <div className="col-md-8">
//                     <div className="input-group mb-3">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search by title"
//                             value={searchTitle}
//                             onChange={this.onChangeSearchTitle}
//                         />
//                         <div className="input-group-append">
//                             <button
//                                 className="btn btn-outline-secondary"
//                                 type="button"
//                                 onClick={() => this.retrieveItems()} // Fixed: Invoke function correctly
//                             >
//                                 Search
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <h4>Tutorials List</h4>
//
//                     <div className="mt-3">
//                         {"Items per Page: "}
//                         <select onChange={this.handlePageSizeChange} value={pageSize}>
//                             {this.pageSizes.map((size) => (
//                                 <option key={size} value={size}>
//                                     {size}
//                                 </option>
//                             ))}
//                         </select>
//
//                         <Pagination
//                             className="my-3"
//                             count={count}
//                             page={page}
//                             siblingCount={1}
//                             boundaryCount={1}
//                             variant="outlined"
//                             shape="rounded"
//                             onChange={this.handlePageChange}
//                         />
//                     </div>
//
//                     <ul className="list-group">
//                         {items &&
//                             items.map((item, index) => (
//                                 <li
//                                     className={
//                                         "list-group-item " +
//                                         (index === currentIndex ? "active" : "")
//                                     }
//                                     onClick={() => this.setActiveItem(item, index)}
//                                     key={index}
//                                 >
//                                     {item.name}
//                                     {item.description}
//                                     {item.price}
//                                 </li>
//                             ))}
//                     </ul>
//                 </div>
//             </div>
//         );
//     }
//
//     private setActiveItem(item: Item, index: number) {
//         this.setState({
//             currentItem: item,
//             currentIndex: index
//         });
//     }
// }
