import React from 'react';
import {Pagination} from "antd";

interface PaginatorProps {
    totalItems: number,
    itemsPerPage: number
    smallScreenMode: boolean
    currentPage: number
    handleChangePage: (value: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({
                                                 totalItems,
                                                 itemsPerPage,
                                                 currentPage,
                                                 handleChangePage,
                                                 smallScreenMode,
                                             }) => {


    // Change Pagination params depend on screenMode
    const paginatorParams =
        {
            showSizeChanger: !smallScreenMode, showQuickJumper: !smallScreenMode, showTotal: !smallScreenMode
                ? (total: number) => `Total ${total} items`
                : undefined
        }

    return (
        <Pagination
            className={'mt-3'}
            pageSize={itemsPerPage}
            current={currentPage}
            onChange={handleChangePage}
            total={totalItems}
            {...paginatorParams}
        />
    );
};

export default Paginator;