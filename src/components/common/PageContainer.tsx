import React from 'react';

interface PageContainerProps {
    children: React.ReactNode,
    height?: string,
    smallScreenMode?: boolean,
}

const PageContainer: React.FC<PageContainerProps> = ({
                                                         height,
                                                         children,
                                                          smallScreenMode,
                                                     }) => {
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
        min-h-pageContainer
        ${height}
        ${smallScreenMode && 'border-t-2 border-gray-400'}
        `}>
            {children}
        </div>
    );
};

export default PageContainer;