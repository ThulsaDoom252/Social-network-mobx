export const contactUrlCheck = /^(https|http):\/\/[\w.-]+\.\w+$/

export const dummyUsersForSkeletonLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const delay = async (ms: number): Promise<void> => { await new Promise(resolve => setTimeout(resolve, ms)) }
