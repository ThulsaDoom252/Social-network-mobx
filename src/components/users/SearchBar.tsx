import React, {useState} from 'react';
import {HandleSearchRequestType, User} from "../../types";
import {Input} from "antd";
import {CloseOutlined, ControlOutlined, UserOutlined} from "@ant-design/icons";
import UsersSearchmenu from "./UsersSearchmenu";

interface SearchBarProps {
    searchRequest: string,
    clearSearchRequest: () => void
    isUsersLoaded: boolean,
    handleSearchRequest: HandleSearchRequestType,
    handleUsersPerPage: (value: number) => void
    usersPerPage: number,
    filterByPhotoMode: string,
    filterByStatusMode: string,
    handleFilterByPhotoMode: (value: string) => void
    handleFilterByStatusMode: (value: string) => void
    isSearchMenuOpen: boolean,
    toggleSearchMenu: React.Dispatch<React.SetStateAction<boolean>>
}


const SearchBar: React.FC<SearchBarProps> = ({
                                                 searchRequest,
                                                 clearSearchRequest, isUsersLoaded,
                                                 handleSearchRequest,
                                                 handleUsersPerPage,
                                                 usersPerPage,
                                                 filterByStatusMode,
                                                  filterByPhotoMode,
                                                 handleFilterByPhotoMode,
                                                 handleFilterByStatusMode,
                                                 isSearchMenuOpen,
                                                 toggleSearchMenu,
                                             }) => {

    return (
        <div className={'w-full mt-2 flex justify-center relative '}>
            <Input value={searchRequest} placeholder="default size" prefix={<UserOutlined/>}
                   onChange={handleSearchRequest}/>
            <div

                className={`absolute 
                right-10 
                top-1 
                text-gray-500
                hover:cursor-pointer
                z-30
                `}
                onClick={() => toggleSearchMenu(!isSearchMenuOpen)}
            ><ControlOutlined/></div>
            <div
                className={'right-2  top-1 text-gray-400 absolute z-20 hover:cursor-pointer'}
                onClick={clearSearchRequest}
            >
                <CloseOutlined/></div>
            <div className={'absolute z-20 right-5 top-10 '}>
                <UsersSearchmenu isOpen={isSearchMenuOpen}
                                 handleUsersPerPage={handleUsersPerPage}
                                 usersPerPage={usersPerPage}
                                 filterByStatusMode={filterByStatusMode}
                filterByPhotoMode={filterByPhotoMode}
                handleFilterByPhotoMode={handleFilterByPhotoMode}
                handleFilterByStatusMode={handleFilterByStatusMode}
                />
            </div>

        </div>
    );
};

export default SearchBar;