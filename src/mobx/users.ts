import { makeAutoObservable } from 'mobx'
import { usersApi } from '../api/api'
import { type User } from '../types'
import friendsStore from './friends'
import appStore from './app'
import users from '../components/Users/Users'

// Define the UsersStore class
class UsersStore {
  itemsPerPage: number = 20 // Number of items per page
  newPage: number = 1 // New page for pagination
  currentPage: number = 0 // Current page
  totalUserCount: number = 0 // Total count of users
  users: [] | User[] = [] // Array of users
  isUsersLoaded: boolean = false // Tracks if users are loaded
  fetchingUserIds: number[] = [] // IDs of users being fetched

  constructor () {
    // Initialize MobX observables for all properties
    makeAutoObservable(this)
  }

  // Set the total count of users
  setTotalUsersCount (value: number) {
    this.totalUserCount = value
  }

  // Set the current page
  setCurrentPage (value: number) {
    this.currentPage = value
  }

  // Set the array of users
  setUsers (users: any) {
    this.users = users
  }

  // Set the new page for pagination
  setNewPage (value: number) {
    this.newPage = value
  }

  // Set the number of items per page
  setItemsPerPage (value: number) {
    this.itemsPerPage = value
  }

  // Toggle the users loaded status
  toggleUsersIsLoaded (toggle: boolean) {
    this.isUsersLoaded = toggle
  }

  handleFollowUserRequest (userId: number, ongoing: boolean) {
    this.setUsers((this.users as User[]).map((user: User) =>
      userId === user.id ? { ...user, followRequest: ongoing } : user
    ))
  }

  // Follow a user
  async followUser (userId: number, user: User) {
    this.handleFollowUserRequest(userId, true)
    try {
      await usersApi.followUser(userId)
      friendsStore.isFriendsLoaded && friendsStore.addFriendToList(user)
      this.users = this.users.map((user) =>
        user.id === userId ? { ...user, followed: true } : user
      )
      this.fetchingUserIds = this.fetchingUserIds.filter((id) => id !== userId)
    } catch (e) {
      appStore.setApiError(`Error following user: ${e}`)
    }
    this.handleFollowUserRequest(userId, false)
  }

  // Unfollow a user
  async unfollowUser (userId: number) {
    this.handleFollowUserRequest(userId, true)
    try {
      this.fetchingUserIds.push(userId)
      await usersApi.unFollowUser(userId)
      friendsStore.isFriendsLoaded && friendsStore.deleteFriendFromList(userId)
      this.users = this.users.map((user) =>
        user.id === userId ? { ...user, followed: false } : user
      )
      this.fetchingUserIds.filter((id) => id !== userId)
    } catch (e) {
      appStore.setApiError(`Error unfollowing user: ${e}`)
    }
    this.handleFollowUserRequest(userId, false)
  }

  // Get a list of users
  async getUsers (count: number, page: number, query?: string) {
    this.toggleUsersIsLoaded(false)
    try {
      const result = await usersApi.getUsers(count, page, query)
      this.setTotalUsersCount(result.totalCount)
      const modifiedUsers = result.items.map((user: User) => ({ ...user, followRequest: false }))
      this.setUsers(modifiedUsers)
      this.setCurrentPage(page)
      this.toggleUsersIsLoaded(true)
    } catch (e) {
      appStore.setApiError(`Error loading users: ${e}`)
    }
  }
}

// Export a new instance of the UsersStore class
export default new UsersStore()
