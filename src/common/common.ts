export const contactUrlCheck = /^(https?|ftp):\/\/[^\s/$.?#].\S*$/

export const dummyUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const profileRoute = '/profile'
export const rootRoute: string = '/'
export const authRoute: string = '/auth'
export const friendsRoute: string = '/friends'
export const usersRoute: string = '/Users'
export const infoRoute: string = '/info'

export const delay = async (ms: number): Promise<void> => { await new Promise(resolve => setTimeout(resolve, ms)) }
