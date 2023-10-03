import React, {ChangeEvent, createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from 'react';
import {HandleSearchRequestType, User} from "../types";
import usersStore from "../mobx/users";
import friendStore from "../mobx/friends";
import appStore from "../mobx/app";
import {defaultPhotoFilterMode, defaultStatusFilterMode, withPhoto, withStatus} from "./filterModes";
import {
    byNameAlphabet,
    byNameReverse,
    byNoPhoto,
    byPhoto,
    sortByNameMode,
    sortByPhotoMode,
    sortDefaultValue
} from "./sortModes";
import {observer} from "mobx-react-lite";

// Определяем тип для данных, которые будут храниться в контексте
export interface SearchContextData {
    searchResults: User[];
    currentSortTypeValue: string,
    searchRequest: string;
    searchMode: boolean;
    filterMode: boolean;
    filterByStatusMode: string;
    filterByPhotoMode: string;
    handleUsersPerPage: (value: number) => void;
    handleFilterByStatusMode: (value: string) => void;
    handleFilterByPhotoMode: (value: string) => void;
    toggleSearchMode: Dispatch<SetStateAction<boolean>>;
    searchUsers: (value: string) => void;
    isSearchMenuActive: boolean;
    setIsSearchMenuActive: Dispatch<SetStateAction<boolean>>;
    isSearchMenuOpened: boolean;
    setIsSearchMenuOpened: Dispatch<SetStateAction<boolean>>;
    setSearchRequest: Dispatch<SetStateAction<string>>;
    setSearchResults: Dispatch<SetStateAction<User[]>>;
    setFilterByStatusMode: Dispatch<SetStateAction<string>>;
    setFilterByPhotoMode: Dispatch<SetStateAction<string>>;
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
    const [currentFilterType, setCurrentFilterType] = useState<string | null>(null)


    useEffect(() => {
        if (usersStore.users.length > 0) {
            setUsers(usersStore.users)
        }

    }, [usersStore.users]);

    (window as any).s1 = users

    const [searchMode, toggleSearchMode] = useState<boolean>(false);
    const [isSearchMenuActive, setIsSearchMenuActive] = useState<boolean>(false);
    const [isSearchMenuOpened, setIsSearchMenuOpened] = useState<boolean>(false);
    const [searchRequest, setSearchRequest] = useState<string>('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [filterMode, toggleFilterMode] = useState<boolean>(false)
    const [currentSortTypeValue, setCurrentSortType] = useState<string>(sortDefaultValue)
    const [sortByPhotoValue, setSortByPhotoValue] = useState<string>(sortDefaultValue)
    const [sortByNameValue, setSortByNameValue] = useState<string>(sortDefaultValue)
    const [filterByStatusMode, setFilterByStatusMode] = useState<string>(defaultStatusFilterMode);
    const [filterByPhotoMode, setFilterByPhotoMode] = useState<string>(defaultPhotoFilterMode);

    const clearSearchRequest = () => {
        setSearchRequest('')
    }


    useEffect(() => {
        if (isSearchMenuActive) {
            setIsSearchMenuOpened(true);
        } else {
            // Задержите исчезновение компонента, чтобы анимация завершилась
            setTimeout(() => setIsSearchMenuOpened(false), 300);
        }
    }, [isSearchMenuActive]);

    useEffect(() => {
        if (searchRequest === '') {
            searchMode && toggleSearchMode(false);
        } else {
            !searchMode && toggleSearchMode(true);
        }
        searchUsers(searchRequest);
    }, [searchRequest]);

    const handleUsersPerPage = (value: number) => usersStore.setUsersPerPage(value);

    const handleFilterByStatusMode = (value: string) => {
        setFilterByStatusMode(value);
        if (value !== defaultStatusFilterMode) {
            let filteredResults: User[] = users
            if (value === withStatus) {
                filteredResults = filterMode
                    ? filteredUsers.filter((user: User) => user.status)
                    : users.filter((user: User) => user.status)
            } else {
                filteredResults = filterMode
                    ? filteredUsers.filter((user: User) => !user.status)
                    : users.filter((user: User) => !user.status)
            }
            setFilteredUsers(filteredResults)
        }
    }

    const handleFilterByPhotoMode = (value: string) => {
        setFilterByPhotoMode(value);
        if (value !== defaultPhotoFilterMode) {
            let filteredResults: User[] = users
            if (value === withPhoto) {
                   if(filterMode) {
                       filteredResults = filteredUsers.filter((user: User) => user.photos.small)
                   } else {
                       filteredResults = users.filter((user: User) => user.photos.small)
                   }
            } else {
                filteredResults = filterMode
                    ? filteredUsers.filter((user: User) => !user.photos.small)
                    : users.filter((user: User) => !user.photos.small)
            }
            setFilteredUsers(filteredResults)
        }
    }

    const nullValues = defaultPhotoFilterMode || defaultStatusFilterMode

    useEffect(() => {
        if (filterByStatusMode !== defaultStatusFilterMode || filterByPhotoMode !== defaultPhotoFilterMode) {
            !filterMode && toggleFilterMode(true)
        } else {
            filterMode && toggleFilterMode(false)
        }

    }, [filterByStatusMode, filterByPhotoMode]);


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

    const handleSortByPhoto = (value: string) => {
        setSortByPhotoValue(value)
        friends.sort((a, b) => {
            const hasPhotoA = !!a.photos.small;
            const hasPhotoB = !!b.photos.small;
            return value === byPhoto ? hasPhotoB ? 1 : hasPhotoA ? -1 : 0 : hasPhotoA ? 1 : hasPhotoB ? -1 : 0;
        });
    }
    const handleSortByName = (value: string) => {
        setSortByNameValue(value)
        if (value === byNameAlphabet) {
            friends.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        } else if (value === byNameReverse) {
            friends.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        }
    }

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


    const searchUsers = (value: string) => {
        if (currentPath === 'friends') {
            if (filterMode)
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
        handleUsersPerPage,
        handleFilterByStatusMode,
        handleFilterByPhotoMode,
        toggleSearchMode,
        searchUsers,
        isSearchMenuActive,
        setIsSearchMenuActive,
        isSearchMenuOpened,
        setIsSearchMenuOpened,
        setSearchRequest,
        setSearchResults,
        setFilterByStatusMode,
        setFilterByPhotoMode,
        handleSearchRequest,
        clearSearchRequest,
        currentSortTypeValue,
        sortByNameValue,
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