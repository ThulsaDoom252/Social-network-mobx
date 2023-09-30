import React, {useEffect, useState} from 'react';
import {HandleSearchRequestType, User} from "../../types";
import {Input} from "antd";
import {CloseOutlined, ControlOutlined, UserOutlined} from "@ant-design/icons";
import SearchMenu from "./UsersSearchmenu";
import UsersSearchMenu from "./UsersSearchmenu";
import FriendsSearchMenu from "./FriendsSearchMenu";

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
    isSearchMenuActive: boolean,
    menuType: 'users' | 'friends',
    sortByNameValue?: string,
    sortByPhotoValue?: string,
     handleCurrentSortTypeValue?: (value:string) => void

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
                                                 isSearchMenuActive,
                                                 menuType,
                                                 sortByNameValue,
                                                 sortByPhotoValue,
                                                 handleCurrentSortTypeValue,
                                             }) => {


    return (
        <div className={`w-full mt-2 flex justify-center relative ${isSearchMenuActive ? 'active' : ''}`}>
            <Input value={searchRequest} placeholder="default size" prefix={<UserOutlined/>}
                   onChange={handleSearchRequest}/>
            <div

                className={`absolute 
                right-10 
                top-1 
                text-gray-500
                hover:cursor-pointer
                 text-center
                z-30
                w-5
                ${isSearchMenuOpen ? ' bg-blue-300 bg-opacity-30 rounded-md'
                    :
                    `hover:bg-blue-300 
                    hover:bg-opacity-30
                    hover:rounded-md                   
                    `
                }
                transition-all duration-300
                `}
                onClick={() => toggleSearchMenu(!isSearchMenuOpen)}
            ><ControlOutlined/>
            </div>
            <div
                className={`right-2 
                 top-1 
                 text-gray-400 
                 absolute z-20 
                    hover:cursor-pointer
                    hover:text-gray-500
                    transition-all duration-300
                    
                    `
                }
                onClick={clearSearchRequest}
            >
                <CloseOutlined/></div>
            <div className={'absolute z-20 right-5 top-10 '}>
                {menuType === 'users' ?
                    <UsersSearchMenu isOpen={isSearchMenuOpen}
                                     handleUsersPerPage={handleUsersPerPage}
                                     usersPerPage={usersPerPage}
                                     filterByStatusMode={filterByStatusMode}
                                     filterByPhotoMode={filterByPhotoMode}
                                     handleFilterByPhotoMode={handleFilterByPhotoMode}
                                     handleFilterByStatusMode={handleFilterByStatusMode}
                    /> : <FriendsSearchMenu isOpen={isSearchMenuOpen}
                                            sortByNameValue={sortByNameValue}
                                            sortByPhotoValue={sortByPhotoValue}
                                            handleCurrentSortTypeValue={handleCurrentSortTypeValue}/>}
                    </div>

                    </div>
                    );
                };

                export default SearchBar;