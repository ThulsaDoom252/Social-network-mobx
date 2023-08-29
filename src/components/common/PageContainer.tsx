import React from 'react';

interface PageContainerProps {
    children: React.ReactNode,
    height?: string,
}

const PageContainer: React.FC<PageContainerProps> = ({height, children}) => {
    return (
        <div className={`
          w-full
        bg-white
        rounded
        p-2
        flex
        flex-col
        justify-start
        items-center
        ${height}
        `}>
            {children}
        </div>
    );
};

export default PageContainer;