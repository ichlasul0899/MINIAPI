const changeArrayToObject = (arr) => {

    // Function ini menerima array lalu mengembalikan values dari object
    const newObject = Object.assign({}, arr)
    return Object.values(newObject)
}

const capitalize = (word) => {
    return `${word[0].toUpperCase()}${word.slice(1,)}`
}

module.exports = {
    capitalize,
    changeArrayToObject
}