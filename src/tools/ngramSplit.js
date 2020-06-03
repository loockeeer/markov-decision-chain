module.exports = (input, length) => {
    return input.split('').map((x,i)=>input.substring(i, i+length))
}