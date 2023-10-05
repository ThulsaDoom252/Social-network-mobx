import React, {ChangeEvent, createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';
import {HandleSearchRequestType, User} from "../types";
import usersStore from "../mobx/users";
import friendStore from "../mobx/friends";
import appStore from "../mobx/app";
import {
    defaultPhotoFilterMode,
    defaultStatusFilterMode,
    withoutStatus,
    withPhoto,
    withStatus
} from "./filterModes";
import {
    byNameAlphabet,
    byNameReverse,
    byNoPhoto,
    byPhoto,
    sortDefaultValue
} from "./sortModes";
import {observer} from "mobx-react-lite";

// Set the data types stored in context
export interface SearchContextData {
    searchResults: User[];
    currentSortTypeValue: string,
    searchRequest: string;
    searchMode: boolean;
    filterMode: boolean;
    filterByStatusMode: string;
    filterByPhotoMode: string;
    newItemsPerPageValue: number,
    handleItemsPerPage: (value: number) => void;
    handleFilterByStatusMode: (value: string) => void;
    handleFilterByPhotoMode: (value: string) => void;
    isSearchMenuActive: boolean;
    setIsSearchMenuActive: Dispatch<SetStateAction<boolean>>;
    handleSearchRequest: (e: ChangeEvent<HTMLInputElement>) => void;
    clearSearchRequest: () => void
    sortByNameValue: string,
    sortByPhotoValue: string,
    handleCurrentSortType: (value: string) => void,
    users: User[],
    filteredUsers: User[],
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

interface SearchContextProviderProps {
    children: ReactNode;
}

const SearchContextProvider: React.FC<SearchContextProviderProps> = observer(({children}) => {
    const currentPath = appStore.currentPath
    const friends = friendStore.friends

    const [users, setUsers] = useState(usersStore.users);

    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const [searchMode, toggleSearchMode] = useState<boolean>(false);
    const [filterMode, toggleFilterMode] = useState<boolean>(false)
    const [isSearchMenuActive, setIsSearchMenuActive] = useState<boolean>(false);

    const [newItemsPerPageValue, setNewItemsPerPageValue] = useState<number>(usersStore.itemsPerPage)

    const [searchRequest, setSearchRequest] = useState<string>('');
    const [currentSortTypeValue, setCurrentSortType] = useState<string>(sortDefaultValue)
    const [sortByPhotoValue, setSortByPhotoValue] = useState<string>(sortDefaultValue)
    const [sortByNameValue, setSortByNameValue] = useState<string>(sortDefaultValue)
    const [filterByStatusMode, setFilterByStatusMode] = useState<string>(defaultStatusFilterMode);
    const [filterByPhotoMode, setFilterByPhotoMode] = useState<string>(defaultPhotoFilterMode);

    useEffect(() => {
        if (usersStore.users.length > 0) {
            setUsers(usersStore.users)
        }

    }, [usersStore.users]);

    useEffect(() => {
        if (currentSortTypeValue === byPhoto || currentSortTypeValue === byNoPhoto) {
            sortByNameValue !== sortDefaultValue && setSortByNameValue(sortDefaultValue)
            friends.sort((a, b) => {
                const hasPhotoA = !!a.photos.small;
                const hasPhotoB = !!b.photos.small;
                return currentSortTypeValue === byPhoto ? hasPhotoB ? 1 : hasPhotoA ? -1 : 0 : hasPhotoA ? 1 : hasPhotoB ? -1 : 0;
            });
        } else if (currentSortTypeValue === byNameAlphabet || currentSortTypeValue === byNameReverse) {
            sortByPhotoValue !== sortDefaultValue && setSortByPhotoValue(sortDefaultValue)
            currentSortTypeValue === byNameAlphabet ?
                friends.sort((a, b) => (a.name || '').localeCompare(b.name || '')) :
                friends.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        } else {
            friends.sort((a, b) => (b.id || 0) - (a.id || 0));
        }
    }, [currentSortTypeValue]);

    useEffect(() => {
        if (filterByStatusMode !== defaultStatusFilterMode || filterByPhotoMode !== defaultPhotoFilterMode) {
            !filterMode && toggleFilterMode(true)
        } else {
            filterMode && toggleFilterMode(false)
        }

    }, [filterByStatusMode, filterByPhotoMode]);


    useEffect(() => {
        if (searchRequest === '') {
            searchMode && toggleSearchMode(false);
        } else {
            !searchMode && toggleSearchMode(true);
        }
        searchItems(searchRequest);
    }, [searchRequest]);

    useEffect(() => {
        filterUsers()
    }, [filterByStatusMode, filterByPhotoMode]);

    const clearSearchRequest = () => {
        setSearchRequest('')
    }

    const handleItemsPerPage = (value: number) => {
        setNewItemsPerPageValue(value)
    }

    const handleFilterByStatusMode = (value: string) => {
        setFilterByStatusMode(value)
    }

    const handleFilterByPhotoMode = (value: string) => {
        setFilterByPhotoMode(value);
    }

    const filterUsers = () => {
        let filteredUsers = users

        if (filterByStatusMode !== defaultStatusFilterMode) {
            if (filterByStatusMode === withStatus) {
                filteredUsers = filteredUsers.filter((user) => user.status);
            } else if (filterByStatusMode === withoutStatus) {
                filteredUsers = filteredUsers.filter((user) => !user.status);
            }
        }

        if (filterByPhotoMode !== defaultPhotoFilterMode) {
            filteredUsers = filteredUsers.filter((user) => filterByPhotoMode === withPhoto
                ? user.photos.small
                : !user.photos.small);
        }

        setFilteredUsers(filteredUsers);
    };

    const handleCurrentSortTypeValue = (value: string) => {
        setCurrentSortType(value)
        if (value === byPhoto || value === byNoPhoto) {
            setSortByPhotoValue(value)
        } else if (value === byNameAlphabet || value === byNameReverse) {
            setSortByNameValue(value)
        } else {
            sortByNameValue !== sortDefaultValue && setSortByNameValue(sortDefaultValue)
            sortByPhotoValue !== sortDefaultValue && setSortByPhotoValue(sortByPhotoValue)
        }
    }

    const searchItems = (value: string) => {
        if (currentPath === 'friends') {
            setSearchResults(friends.filter(friend => friend.name?.toLowerCase().includes(value)))
        } else {
            if (filterMode) {
                setSearchResults(filteredUsers.filter(user => user.name?.toLowerCase().includes(value)))
            } else {
                setSearchResults(users.filter(user => user.name?.toLowerCase().includes(value)))

            }
        }
    }

    const handleSearchRequest: HandleSearchRequestType = (e) => {
        const {value} = e.currentTarget;
        setSearchRequest(value.toLowerCase());
    };

    const data: SearchContextData = {
        searchResults,
        searchRequest,
        searchMode,
        filterMode,
        filterByStatusMode,
        filterByPhotoMode,
        handleItemsPerPage,
        handleFilterByStatusMode,
        handleFilterByPhotoMode,
        isSearchMenuActive,
        setIsSearchMenuActive,
        handleSearchRequest,
        clearSearchRequest,
        currentSortTypeValue,
        sortByNameValue,
        newItemsPerPageValue,
        sortByPhotoValue,
        handleCurrentSortType: handleCurrentSortTypeValue,
        users,
        filteredUsers,
    };

    return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    )
});

export {SearchContext, SearchContextProvider};