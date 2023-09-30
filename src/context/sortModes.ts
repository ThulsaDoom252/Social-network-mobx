//Sort by photo values
export const byPhoto: string = 'photo' as const
export const byNoPhoto: string = 'no photo' as const

// Sort by status values
export const byStatus: string = 'no status' as const
export const byNoStatus: string = 'status' as const


//Sort by name values
export const byNameAlphabet = 'Alphabet order'
export const byNameReverse = 'Reversed order'

//Default

export const sortDefaultValue = 'default'
export const sortByPhotoMode =  byNoPhoto || byPhoto
export const sortByNameMode = byNameAlphabet || byNameReverse

