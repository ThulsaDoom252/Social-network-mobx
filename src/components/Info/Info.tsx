import React, {useState} from 'react';
import PageContainer from "../Common/PageContainer";
import AuthHoc from "../../hoc/authHoc";
import logo from "../../public/infoLogo.png"
import mobxLogo from "./mobxImg.png"
import tsLogo from "./tsImg.png"
import twLogo from "./tailwindImg.png"
import {Col, Divider, Row} from "antd";
import {DownOutlined, UpOutlined} from '@ant-design/icons';

interface InfoProps {
    tinyScreenMode: boolean;
    isLogged: boolean;
}

const Info: React.FC<InfoProps> = ({tinyScreenMode}) => {
    const itemStyle = `text-2xl mb4`
    const headerItemStyle = 'text-1xl font-bold'
    const totalIconsCount = [
        {src: mobxLogo},
        {src: tsLogo},
        {src: twLogo}
    ]

    const [profileOpen, setProfileOpen] = useState(true);
    const [friendsOpen, setFriendsOpen] = useState(true);

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    }

    const toggleFriends = () => {
        setFriendsOpen(!friendsOpen);
    }

    return (
        <PageContainer>
            <div className={`         
                rounded-md
                bg-blue-400
                bg-opacity-50
                flex
                pt-5
                pb-5
                items-center
                justify-center
                flex-col
                ${tinyScreenMode ? 'container' : 'container-md'}
            `}>
                <img src={logo} alt="logo" height={180} width={180}/>
                <div>Front-end developer: thulsaDoom</div>
                <div className={''}>Version: 2.0</div>
                <Divider className={`${itemStyle} ${headerItemStyle}`} orientation="center">Functionality</Divider>
                <div className={`${headerItemStyle} flex items-center`}>
                    <button className="mr-2" onClick={toggleProfile}>
                        {profileOpen ? <UpOutlined/> : <DownOutlined/>}
                    </button>
                    Profile
                </div>
                {profileOpen && (
                    <>
                        <div>- Edit profile data</div>
                        <div>- Edit Status</div>
                        <div>- Change avatar</div>
                    </>
                )}
                <div className={`${headerItemStyle} flex items-center`}>
                    <button className="mr-2" onClick={toggleFriends}>
                        {friendsOpen ? <UpOutlined/> : <DownOutlined/>}
                    </button>
                    Friends/Users
                </div>
                {friendsOpen && (
                    <>
                        <div>- Add/Remove Friends</div>
                        <div>- Search friends/users by name</div>
                        <div>- Sort friends by photo/name</div>
                        <div>- Filter users by photo/status</div>
                    </>
                )}
                <Divider className={'mt-2 font-bold'} orientation={'center'}>Tech stack</Divider>
                <div className={`w-full flex justify-center items-center`}>
                    <Row style={{width: '400px'}} className={'mt-2 flex items-center justify-center'}
                         gutter={40}>
                        {totalIconsCount.map((image, index) => <Col key={index} className={"gutter-row"} span={6}><img
                            alt={'icon'}
                            className={'w-full h-full object-cover'}
                            src={image.src}/></Col>)}
                    </Row>
                </div>
            </div>
        </PageContainer>
    );
};

export default AuthHoc(Info);
