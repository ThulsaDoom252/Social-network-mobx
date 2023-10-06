import React from 'react';
import PageContainer from "./Common/PageContainer";
import AuthHoc from "../hoc/authHoc";

interface InfoProps {
    smallScreenMode?: boolean;
    isLogged: boolean;
}

const Info: React.FC<InfoProps> = ({ smallScreenMode, isLogged }) => {
    return (
        <PageContainer height={'h-60'}>
            <div className="text-4xl font-bold mb-4">Version 2.0</div>
            <div className="text-2xl mb-4">TypeScript</div>
            <div className="text-2xl mb-4">Technologies: Tailwind CSS and MobX</div>
        </PageContainer>
    );
};

export default AuthHoc(Info);
