/**
 * Format milliseconds to duration time
 * @param {number} millis a number in milliseconds
 * @returns {string} the formated duration time string
 * @example 275566 = '4:35'
 */

export const convertToDuration = millis => {
    const minutes = Math.floor(millis / 60000)
    const seconds = Math.floor((millis % 60000) / 1000)
    return `${minutes}:${(seconds < 10) ? '0' : ''}${seconds}` // Example:  3:7 becomes 3:07 in case seconds < 10
}