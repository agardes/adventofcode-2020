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
        let p
        if((x+incX)<minWidth){
            y+=incY
            x+=incX
            p = data[y][x] 
        }else{
            y+=incY 
            x= (x+incX)%minWidth
            p = data[y][x]       
        }
        p == "#" ? count++ : undefined
    }
    return count
}

let pOne = day03(1,3)
let pTwo = pOne

for(let i=0;i<partTwo.length;i++){
    let [y,x] = partTwo[i]
    pTwo*=day03(y,x)
}

console.log("Part one = " +pOne)
console.log("Part two = " +pTwo)



