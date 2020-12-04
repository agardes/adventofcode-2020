const fs = require('fs');
const read = fs.readFileSync("day04.txt");
let data = read.toString().split("\n").map(el=>el.split(':').map(el=>el.split(' ')))
data = data.flat(2)
let d = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
let colors = ["amb", "blu", "brn", "gry" ,"grn", "hzl" ,"oth"]
let n = 0
let b = 0
let pOne = 0
let pTwo = 0

for(let i=0;i<data.length;i++){
    if(data[i]==''){
        b == d.length ? pOne++ : undefined
        n == d.length ? pTwo++ : undefined
        n = 0
        b = 0
    }else{
        d.indexOf(data[i])!==-1 ? (b++,n++) : undefined
        let next = data[i+1]
        switch(data[i]){
            case 'byr':
                next.length==4  &&  !isNaN(next) && next>=1920 && next<=2002 ?  undefined : n--
                break
            case 'iyr':
                next.length==4  &&  !isNaN(next) && next>=2010 && next<=2020 ?  undefined : n--
                break
            case 'eyr':
                next.length==4  &&  !isNaN(next) && next>=2020 && next<=2030 ?  undefined : n--
                break
            case 'hgt':
                let last = next.slice(-2)
                let number = parseInt(next.slice(0,next.length-2))
                if(isNaN(number) || !isNaN(last)){
                    break
                }
                last=="cm" ? number>=150 && number<=193 ?  undefined : n-- : number>=59 && number<=76 ?  undefined : n--
                break
            case 'hcl':
                let hash = next[0] == '#'
                let r = next.slice(1)
                let length = r.length==6
                let regL = /([g-z])\w/g
                let lett = r.match(regL)
                hash && length && lett==null ? undefined : n--
                break
            case 'ecl':
                colors.indexOf(next)==-1 ? n-- : undefined
                break
            case 'pid':
                !isNaN(next) && next.length==9 ? undefined : n--
                break
        }
        
    }
}

if(n==d.length){
    pOne++
}

console.log("Part one = " + pOne)
console.log("Part two = " + pTwo)

