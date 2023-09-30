import React, {createContext, useContext, ReactNode, useState} from 'react';
import {HandleSearchRequestType, User} from "../types";
import usersStore from "../mobx/users";

// Определяем тип для данных, которые будут храниться в контексте
interface SearchContextData {
    // Здесь определите свойства и типы данных
    // которые вы хотите хранить в контексте
}

const SearchContext = createContext<SearchContextData | undefined>(undefined);

interface SearchContextProviderProps {
    children: ReactNode;
}

const SearchContextProvider: React.FC<SearchContextProviderProps> = ({children}) => {
    // Здесь вы можете инициализировать и хранить данные в контексте


    const searchResults: User[] = usersStore.searchResults
    const searchRequest = usersStore.searchRequest
    const searchMode = usersStore.searchMode

    const filterByStatusMode = usersStore.filterByStatusMode
    const filterByPhotoMode = usersStore.filterByPhotoMode

    const [isSearchMenuOpen,
        toggleSearchMenu] = useState(false)

    const handleUsersPerPage = (value: number) => usersStore.setUsersPerPage(value)

    const handleFilterByStatusMode = (value: string) => usersStore.changeFilterByStatusMode(value)
    const handleFilterByPhotoMode = (value: string) => usersStore.changeFilterByPhotoMode(value)




    const setSearchRequest = (value: string) => {
        usersStore.setSearchRequest(value)
    }

    const toggleSearchMode = (toggle: boolean) => {
        usersStore.toggleSearchMode(toggle)
    }

    const searchUsers = (value: string) => usersStore.searchUsers(value)

    const handleSearchRequest: HandleSearchRequestType = (e) => {
        const {value} = e.currentTarget;
        setSearchRequest(value.toLowerCase())
    };

    const data:SearchContextData = {searchResults, searchRequest, searchMode, filterByStatusMode, filterByPhotoMode, isSearchMenuOpen,
        toggleSearchMenu, handleUsersPerPage, handleFilterByStatusMode, handleFilterByPhotoMode, toggleSearchMode, searchUsers}

    return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    );
};

export {SearchContext, SearchContextProvider};
