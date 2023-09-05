import React from 'react';
import PageContainer from "../components/common/PageContainer";


interface infoProps {
    smallScreenMode?: boolean
    isLogged: boolean,
}

const Info: React.FC<infoProps> = ({smallScreenMode, isLogged}) => {
    return (
        <PageContainer height={'h-60'}>
            Some info about site
        </PageContainer>
    );
};

export default Info;