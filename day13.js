const fs = require('fs');
const read = fs.readFileSync("day13.txt");
let data = read.toString().split('\n')
let timestamp = parseInt(data[0])
let buses = data[1].split(',').filter(el=>el!=="x").map(Number)

for(let i=timestamp;i<Number.MAX_SAFE_INTEGER;i++){
    for(let j=0;j<buses.length;j++){
        if(i%buses[j]==0){
            console.log('Part one = ' + parseInt(i-timestamp)*parseInt(buses[j]))
            i = Number.MAX_SAFE_INTEGER
            break
        }
    }
}

let partTwo = data[1].split(',').map((el,i)=>[parseInt(el),i]).filter(el=>!isNaN(el[0]))
let inc = partTwo[0][0]
let product = partTwo.map(el=>el[0]).reduce((a,b)=>a*b)
let p2 = true
let start=100000000000000
while(p2){
    for(let t=start;t<product;t+=inc){
        let m = partTwo.filter((el,i)=>{
            if( (t+el[1])%el[0]==0 ){
                return el
            }
          
        }).map(el=>el[0])
        
        if(m.length==partTwo.length){
            console.log("part two = " +t)
            p2=false
            t=product
            break
        }
        if(m.length>1){
            const gcd = (a, b) => a ? gcd(b % a, a) : b;
            let lcm = m.reduce((a, b) => a * b / gcd(a, b))
            start = t+lcm
            inc = lcm
            break
        }
       
    }
} 
