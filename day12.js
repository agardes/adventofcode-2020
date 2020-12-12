const fs = require('fs');
const read = fs.readFileSync("day12.txt");
let data = read.toString().split('\n').map(el=>{
    let w = el[0]
    let n = parseInt(el.split('').slice(1).join(''))
    return [w,n]
})


const day12 ={
    facing:'E',
    x:0,
    y:0,
    xW:10,
    yW:-1,
    run(dir,nb,part){
        let saveX = this.xW
        let saveY = this.yW
        let diffX = Math.abs(this.x-this.xW)
        let diffY = Math.abs(this.y-this.yW)
        switch(dir){
            case 'N':
                part=='one' ? this.y-=nb : this.yW-=nb
                break
            case 'S':
                part=="one" ? this.y+=nb :this.yW+=nb
                break
            case 'E':
                part=="one" ? this.x+=nb : this.xW+=nb
                break
            case 'W':
                part=="one" ? this.x-=nb : this.xW-=nb
                break
            case 'L':
                if(part=="one"){
                    this.facing == "E" ? this.facing = nb==90 ? "N" : nb==180 ? "W" : nb==270 ? "S" :undefined
                    :
                    this.facing == "W" ? this.facing = nb==90 ? "S" : nb==180 ? "E" : nb==270? "N": undefined
                    :
                    this.facing =="N" ? this.facing = nb==90 ? "W" : nb==180 ? "S" : nb==270? "E":undefined
                    :
                    this.facing = nb==90 ? "E" : nb==180 ? "N" : nb==270 ? "W":undefined
                }else{
                    if(saveX>this.x){
                        nb==90 ? this.yW = (this.y-diffX) : nb==180 ? this.xW = (this.x-diffX) : nb==270 ? this.yW = (this.y+diffX) : undefined
                    }else{
                        nb==90 ? this.yW = (this.y+diffX) : nb==180 ? this.xW = (this.x+diffX) : nb==270 ? this.yW = (this.y-diffX) : undefined
                    }
                    if(saveY>this.y){
                        nb==90 ? this.xW = (this.x+diffY) : nb==180 ? this.yW = (this.y-diffY) : nb==270 ? this.xW = (this.x-diffY) : undefined
                    }else{
                        nb==90 ? this.xW = (this.x-diffY) : nb==180 ? this.yW = (this.y+diffY) : nb==270 ? this.xW = (this.x+diffY) : undefined
                    }
                }
                break
            case 'R':
                if(part=="one"){
                    this.facing == "E" ?  this.facing = nb==90 ? "S" : nb==180 ? "W" :nb==270 ? "N":undefined
                    :
                    this.facing == "W" ? this.facing = nb==90 ? "N" : nb==180 ? "E" :nb==270 ? "S":undefined
                    :
                    this.facing == "N" ? this.facing = nb==90 ? "E" : nb==180 ? "S" :nb==270 ? "W":undefined
                    :
                    this.facing = nb==90 ? "W" : nb==180 ? "N" :nb==270 ? "E":undefined
                }else{
                    if(saveX>this.x){
                        nb==90 ? this.yW = (this.y+diffX) : nb==180 ? this.xW = (this.x-diffX) : nb==270 ? this.yW = (this.y-diffX) : undefined
                    }else{
                        nb==90 ? this.yW = (this.y-diffX) : nb==180 ? this.xW = (this.x+diffX) : nb==270 ? this.yW = (this.y+diffX) : undefined
                    }
                    if(saveY>this.y){
                        nb==90 ? this.xW = (this.x-diffY) : nb==180 ? this.yW = (this.y-diffY) : nb==270 ? this.xW = (this.x+diffY) : undefined
                    }else{
                        nb==90 ? this.xW = (this.x+diffY) : nb==180 ? this.yW = (this.y+diffY) : nb==270 ? this.xW = (this.x-diffY) : undefined
                    }                    
                }
                break
            case "F":
                if(part=="one"){
                    this.facing == "E" ? this.x+=nb : this.facing == "W" ?  this.x-=nb : this.facing == "N" ? this.y-=nb :  this.y+=nb
                }else{
                    this.xW>this.x?(this.x+=(nb*diffX),this.xW = (this.x+diffX)) : (this.x-=nb*diffX,this.xW = (this.x-diffX))
                    this.yW>this.y?(this.y+=(nb*diffY),this.yW = (this.y+diffY)) : ( this.y-=nb*diffY, this.yW=(this.y-diffY))
                }
        }
    }
}

data.forEach(el=>{
    let [dir,nb] = el
    day12.run(dir,nb,"one")
})
console.log("Part one = " +parseInt(Math.abs(day12.x)+Math.abs(day12.y)))
day12.x = 0
day12.y = 0
data.forEach(el=>{
    let [dir,nb] = el
    day12.run(dir,nb)
})
console.log("Part two = " +parseInt(Math.abs(day12.x)+Math.abs(day12.y)))