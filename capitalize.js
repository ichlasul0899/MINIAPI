const capitalize = (word) => {
    return `${word[0].toUpperCase()}${word.slice(1,)}`
}

let msg = capitalize('hello world')
console.log(msg)