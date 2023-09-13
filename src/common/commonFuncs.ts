export const truncate = (text: string, maxCharacters = 15) => {
    const maxNumber = maxCharacters
    const mediaLength = text.length
    if (mediaLength > maxNumber) {
        let slicedMedia = text.slice(0, maxNumber)
        return slicedMedia + '...'
    } else {
        return text
    }
}


export const setLocalStorageData = (key: string, data: string) => localStorage.setItem(key, data)
