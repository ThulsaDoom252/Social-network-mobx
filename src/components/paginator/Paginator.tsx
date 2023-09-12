import React from 'react';
import {Pagination} from "antd";


interface PaginatorProps {
    totalItems: number,
    itemsPerPage: number
    currentPage: number
    handleChangePage: (value:number) => void
}

const Paginator: React.FC<PaginatorProps> = ({
                                                 totalItems,
                                                 itemsPerPage,
                                                 currentPage,
                                                 handleChangePage,
                                             }) => {


    return (
        <Pagination
            className={'mt-3'}
            pageSize={itemsPerPage}
            current={currentPage}
            onChange={handleChangePage}
            total={totalItems}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
        />
    );
};

export default Paginator;