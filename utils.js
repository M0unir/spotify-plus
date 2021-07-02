/**
 * This generates a random combination string of letters & numbers
 * @param {number} size The length of the string
 * @return {string} The generated string
 */

exports.generateRandomString = size => {
    let string = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < size; i++) {
        string += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return string
}