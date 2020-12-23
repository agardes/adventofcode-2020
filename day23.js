let cups = "712643589".split('').map(Number)
let move = 0
let curr = 0
while(move<100){
    let dest = cups[curr]-1
    let pick = cups.splice(curr+1,3)
    let inc = 0
    while(pick.length<3){
        pick.push(cups.shift())
        inc++
    }
    let ind = cups.indexOf(dest)
    if(ind==-1){
        let found = false
        while(!found){
            dest--
            dest= dest<1?9 : dest
            ind = cups.indexOf(dest)
            found = ind==-1 ? false : true
        }
    }
    cups.splice(ind+1,0,pick)
    cups = cups.flat()
    if(ind<curr){
        let reArrange = []
        cups.forEach((el,i)=>{reArrange[(i+6+inc)%cups.length] = el})
        cups = reArrange
    }
    move++
    curr = (curr+1)%cups.length
}
console.log("Part one = " + cups.join('').split('1').reverse().join(''))