const fs = require('fs');
const read = fs.readFileSync("day03.txt");
const data = read.toString().split("\n").map(el=>el.split(''))
let height = data.length
let minWidth = data[0].length
let partTwo = [[1,1],[1,5],[1,7],[2,1]]

function day03(incY,incX){
    let count = 0
    let y = 0
    let x = 0
    while(y<height-1){
        (x+incX)<minWidth ? (y+=incY,x+=incX) : (y+=incY,x= (x+incX)%minWidth)
        data[y][x] == "#" ? count++ : undefined
    }
    return count
}

let pOne = day03(1,3)
console.log("Part one = " +pOne)
console.log("Part two = " +partTwo.map(el=>day03(el[0],el[1])).reduce((a,b) =>a*b)*pOne)



