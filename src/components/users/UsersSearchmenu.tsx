import React from 'react';
import Select from 'antd/es/select';
import {Transition} from "react-transition-group";
import {Slider} from "antd";
import {
    defaultPhotoFilterMode,
    defaultStatusFilterMode,
    withoutPhoto,
    withoutStatus,
    withPhoto,
    withStatus
} from "./filterModes";
import {FilterPhotoModeTypes, FilterStatusModeTypes} from "../../types";


interface UsersSearchMenuProps {
    isOpen: boolean
    handleUsersPerPage: (value: number) => void
    usersPerPage: number,
    filterByPhotoMode: string,
    filterByStatusMode: string,
    handleFilterByPhotoMode: (value: string) => void
    handleFilterByStatusMode: (value: string) => void
    // filterByPhotosValue: string,
    // filterByStatusValue: string,
    // handleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UsersSearchMenu: React.FC<UsersSearchMenuProps> = ({
                                                             isOpen,
                                                             usersPerPage,
                                                             handleUsersPerPage,
                                                             filterByPhotoMode,
                                                             filterByStatusMode,
                                                             handleFilterByPhotoMode,
                                                             handleFilterByStatusMode,
                                                         }) => {

    const handleStatusFilterModeChange = (value: FilterStatusModeTypes) => {
        handleFilterByStatusMode(value)
    };

    const handlePhotoFilterModeChange = (value: FilterPhotoModeTypes) => {
        handleFilterByPhotoMode(value)
    }

    return (
            <Transition in={isOpen} timeout={1000}>
                {(state) =>
                    isOpen ? (
                        <div className={`menu ${state}`}>
                            <div className="bg-white w-64 p-2 rounded-md flex flex-col items-center">
                                <div className="w-full flex flex-col items-center">
                                    <div>
                                        <p>By photo:</p>
                                        <Select size="small" value={filterByPhotoMode} style={{width: 200}}
                                                onChange={handlePhotoFilterModeChange}>
                                            <Select.Option value={withPhoto}>With photo</Select.Option>
                                            <Select.Option value={withoutPhoto}>Without photo</Select.Option>
                                            <Select.Option value={defaultPhotoFilterMode}>Show all</Select.Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <p>By status:</p>
                                        <Select size="small" value={filterByStatusMode} style={{width: 200}}
                                                onChange={handleStatusFilterModeChange}>
                                            <Select.Option value={withStatus}>With status</Select.Option>
                                            <Select.Option value={withoutStatus}>Without status</Select.Option>
                                            <Select.Option value={defaultStatusFilterMode}>Show all</Select.Option>
                                        </Select>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <p>Pagination:</p>*/}
                                    {/*    <Select size="small" defaultValue="Enabled" style={{width: 200}}/>*/}
                                    {/*</div>*/}
                                    <div className={'w-full'}>
                                        <span>Count:</span>
                                        <span className={'ml-2'}>{usersPerPage}</span>
                                        <Slider defaultValue={usersPerPage}
                                                min={10} max={100}
                                                onChange={handleUsersPerPage}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </Transition>
    );
};

export default UsersSearchMenu;
