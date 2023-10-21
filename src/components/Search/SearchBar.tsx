import React from 'react'
import { type HandleSearchRequestType } from '../../types'
import { Input } from 'antd'
import { CloseOutlined, ControlOutlined, UserOutlined } from '@ant-design/icons'
import UsersSearchMenu from './UsersSearchmenu'
import FriendsSearchMenu from './FriendsSearchMenu'

// Props interface for the SearchBar component
interface SearchBarProps {
  searchRequest: string // Search query input
  clearSearchRequest: () => void // Function to clear search input
  handleSearchRequest: HandleSearchRequestType // Function to handle search input change
  handleUsersPerPage: (value: number) => void // Function to handle users per page change
  usersPerPage: number // Number of users to display per page
  filterByPhotoMode: string // Filter mode for user photos
  filterByStatusMode: string // Filter mode for user status
  handleFilterByPhotoMode: (value: string) => void // Function to handle filter by photo mode change
  handleFilterByStatusMode: (value: string) => void // Function to handle filter by status mode change
  isSearchMenuOpen: boolean // Flag for opening the search menu
  toggleSearchMenu: React.Dispatch<React.SetStateAction<boolean>> // Function to toggle the search menu
  isSearchMenuActive: boolean // Flag for the active search menu
  menuType: 'users' | 'friends' // Type of menu (users or friends)
  sortByNameValue?: string // Value for sorting by name
  sortByPhotoValue?: string // Value for sorting by photo
  handleCurrentSortTypeValue?: (value: string) => void // Function to handle current sort type change
  isItemsLoaded: boolean // Flag indicating if items are loaded
  noItems: boolean
  placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchRequest,
  clearSearchRequest,
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
  isItemsLoaded,
  noItems,
  placeholder
}) => {
  return (
        <div className={`w-full mt-2 flex justify-center relative ${isSearchMenuActive ? 'active' : ''}`}>
            {/* Input for search query */}
            <Input
                disabled={noItems || !isItemsLoaded}
                value={searchRequest}
                placeholder={placeholder}
                prefix={<UserOutlined/>}
                onChange={handleSearchRequest}
            />
            {/* Button to toggle search menu */}
            <div
                className={`absolute right-10 top-1 text-gray-500 hover:cursor-pointer text-center z-30 w-5 ${
                    isSearchMenuOpen
                        ? 'bg-blue-300 bg-opacity-30 rounded-md'
                        : 'hover:bg-blue-300 hover:bg-opacity-30 hover:rounded-md'
                } transition-all duration-300`}
                onClick={() => { toggleSearchMenu(!isSearchMenuOpen) }}
            >
                <ControlOutlined/>
            </div>
            {/* Button to clear search query */}
            <div
                className={'right-2 top-1 text-gray-400 absolute z-20 hover:cursor-pointer hover:text-gray-500 transition-all duration-300'}
                onClick={clearSearchRequest}
            >
                <CloseOutlined/>
            </div>
            {isItemsLoaded && (
                <div className={'absolute z-20 right-5 top-10 '}>
                    {/* Render search menu based on the menu type */}
                    {menuType === 'users'
                      ? (
                        <UsersSearchMenu
                            isOpen={isSearchMenuOpen}
                            handleUsersPerPage={handleUsersPerPage}
                            usersPerPage={usersPerPage}
                            filterByStatusMode={filterByStatusMode}
                            filterByPhotoMode={filterByPhotoMode}
                            handleFilterByPhotoMode={handleFilterByPhotoMode}
                            handleFilterByStatusMode={handleFilterByStatusMode}
                        />
                        )
                      : (
                        <FriendsSearchMenu
                            isOpen={isSearchMenuOpen}
                            sortByNameValue={sortByNameValue}
                            sortByPhotoValue={sortByPhotoValue}
                            handleCurrentSortTypeValue={handleCurrentSortTypeValue}
                        />
                        )}
                </div>
            )}
        </div>
  )
}

export default SearchBar
