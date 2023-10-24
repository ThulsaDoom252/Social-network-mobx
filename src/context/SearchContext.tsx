import React, {
  type ChangeEvent,
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState
} from 'react'
import {type HandleSearchRequestType, type User} from '../types'
import usersStore from '../mobx/users'
import friendStore from '../mobx/friends'
import appStore from '../mobx/app'
import {photoFilterEnum, statusFilterEnum,} from './filterModes'
import {byNameAlphabet, byNameReverse, byNoPhoto, byPhoto, sortDefaultValue} from './sortModes'
import {observer} from 'mobx-react-lite'

// Set the data types stored in context
export interface SearchContextData {
  searchResults: User[]
  currentSortTypeValue: string
  searchRequest: string
  searchMode: boolean
  filterMode: boolean
  filterByStatusMode: statusFilterEnum
  filterByPhotoMode: photoFilterEnum
  newItemsPerPageValue: number
  handleItemsPerPage: (value: number) => void
  handleFilterByStatusMode: (value: statusFilterEnum) => void
  handleFilterByPhotoMode: (value: photoFilterEnum) => void
  isSearchMenuActive: boolean
  setIsSearchMenuActive: Dispatch<SetStateAction<boolean>>
  handleSearchRequest: (e: ChangeEvent<HTMLInputElement>) => void
  clearSearchRequest: () => void
  sortByNameValue: string
  sortByPhotoValue: string
  handleCurrentSortType: (value: string) => void
  users: User[]
  filteredUsers: User[]

}

// Create a context to hold search-related data
const SearchContext = createContext<SearchContextData>({} as SearchContextData)

interface SearchContextProviderProps {
  children: ReactNode
}

const SearchContextProvider: React.FC<SearchContextProviderProps> = observer(({ children }) => {
  // Access some store and initial state data
  const currentPath = appStore.currentPath
  const friends = friendStore.friends

  // Define state variables
  const [users, setUsers] = useState(usersStore.users)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [searchMode, toggleSearchMode] = useState<boolean>(false)
  const [filterMode, toggleFilterMode] = useState<boolean>(false)
  const [isSearchMenuActive, setIsSearchMenuActive] = useState<boolean>(false)
  const [newItemsPerPageValue, setNewItemsPerPageValue] = useState<number>(usersStore.itemsPerPage)
  const [searchRequest, setSearchRequest] = useState<string>('')
  const [currentSortTypeValue, setCurrentSortType] = useState<string>(sortDefaultValue)
  const [sortByPhotoValue, setSortByPhotoValue] = useState<string>(sortDefaultValue)
  const [sortByNameValue, setSortByNameValue] = useState<string>(sortDefaultValue)
  const [filterByStatusMode, setFilterByStatusMode] = useState<statusFilterEnum>(statusFilterEnum.Default)
  const [filterByPhotoMode, setFilterByPhotoMode] = useState<photoFilterEnum>(photoFilterEnum.Default)

  // Update users state depending on users from store change
  useEffect(() => {
    if (usersStore.users.length > 0) {
      setUsers(usersStore.users)
      filterMode && filterUsers()
    }
  }, [usersStore.users])

  // Sorting friends items depending on currentSortTypeValue
  useEffect(() => {
    if (currentSortTypeValue === byPhoto || currentSortTypeValue === byNoPhoto) {
      sortByNameValue !== sortDefaultValue && setSortByNameValue(sortDefaultValue)
      friends.sort((a, b) => {
        const hasPhotoA = !!a.photos.small
        const hasPhotoB = !!b.photos.small
        return currentSortTypeValue === byPhoto ? hasPhotoB ? 1 : hasPhotoA ? -1 : 0 : hasPhotoA ? 1 : hasPhotoB ? -1 : 0
      })
    } else if (currentSortTypeValue === byNameAlphabet || currentSortTypeValue === byNameReverse) {
      sortByPhotoValue !== sortDefaultValue && setSortByPhotoValue(sortDefaultValue)
      currentSortTypeValue === byNameAlphabet
        ? friends.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        : friends.sort((a, b) => (b.name || '').localeCompare(a.name || ''))
    } else {
      friends.sort((a, b) => (b.id || 0) - (a.id || 0))
    }
  }, [currentSortTypeValue])

  // Toggle filter mode based on filter criteria
  useEffect(() => {
    if (filterByStatusMode !== statusFilterEnum.Default || filterByPhotoMode !== photoFilterEnum.Default) {
      !filterMode && toggleFilterMode(true)
    } else {
      filterMode && toggleFilterMode(false)
    }
  }, [filterByStatusMode, filterByPhotoMode])

  // Toggle search mode if search request is not empty
  useEffect(() => {
    if (searchRequest === '') {
      searchMode && toggleSearchMode(false)
    } else {
      !searchMode && toggleSearchMode(true)
    }
    searchItems(searchRequest)
  }, [searchRequest])

  // Filter users depending on filterMode
  useEffect(() => {
    filterUsers()
  }, [filterByStatusMode, filterByPhotoMode])

  const clearSearchRequest = () => {
    setSearchRequest('')
  }

  const handleItemsPerPage = (value: number) => {
    setNewItemsPerPageValue(value)
  }

  const handleFilterByStatusMode = (value:statusFilterEnum) => {
    setFilterByStatusMode(value)
  }

  const handleFilterByPhotoMode = (value:photoFilterEnum) => {
    setFilterByPhotoMode(value)
  }

  const filterUsers = () => {
    let filteredUsers = users

    if (filterByStatusMode !== statusFilterEnum.Default) {
      if (filterByStatusMode === statusFilterEnum.WithStatus) {
        filteredUsers = filteredUsers.filter((user) => user.status)
      } else if (filterByStatusMode === statusFilterEnum.WithoutStatus) {
        filteredUsers = filteredUsers.filter((user) => !user.status)
      }
    }

    if (filterByPhotoMode !== photoFilterEnum.Default) {
      filteredUsers = filteredUsers.filter((user) => filterByPhotoMode === photoFilterEnum.WithPhoto
        ? user.photos.small
        : !user.photos.small)
    }

    setFilteredUsers(filteredUsers)
  }

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
    const { value } = e.currentTarget
    setSearchRequest(value.toLowerCase())
  }

  // Define the data to be provided by the context
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
    filteredUsers
  }

  return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
  )
})

export { SearchContext, SearchContextProvider }
