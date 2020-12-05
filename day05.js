const fs = require('fs');
const read = fs.readFileSync("day05.txt");
let data = read.toString().split("\n").map(el=>el.split(''))

let pOne = data.map((el,i)=>{
    let min = 0
    let max = 127
    let minW = 0
    let maxW = 7
    for(let j=0;j<el.length;j++){
        let half = (max+1-min)/2
        let row
        if(max!==min){
            el[j]=="F" ? max = (min+half)-1 : min = max-half+1 
        }else{
            row = min
            let halfW = (maxW+1-minW)/2
            el[j]=="L" ? maxW = (minW+halfW)-1 : minW = maxW-halfW+1
            if(minW==maxW){
                return row*8+minW
            }
        }
    }

})
let s = pOne.sort((a, b) => a - b)
console.log("Part one = " + s[s.length-1])
pTwo = s.filter((el,i,arr)=>{
    return (i==0 || i==arr.length-1) || (el==parseInt(arr[i+1]-1) && el==parseInt(arr[i-1]+1)) ? false : true
})
console.log("Part two = " + parseInt(pTwo[0]+1))
