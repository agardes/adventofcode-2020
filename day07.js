const fs = require('fs');
const read = fs.readFileSync("day07.txt");
let bags = {}

class Bag {
    constructor(color=undefined,children=undefined,parent=undefined){
      this.color = color
      this.children = children
      this.parent = parent
    }
    getTotal(){
        return this.children ? this.children.map(el=>el[1] * bags[el[0]].getTotal()).reduce((a,b)=>a+b)+1 : 1
    }
  }

read.toString().split("\r\n").map(el=>el.split('contain').map(el=>el.split(','))).forEach((el)=>{
    let color = el[0].join('').replace(/bags/,'').trim().replace(' ','-').trim()
    if(el[1].length==1 && el[1][0][1] == "n"){
    }else{
        let children = []
        for(let i=0;i<el[1].length;i++){
            let amount = parseInt(el[1][i].trim()[0])
            let childCol = amount == 1 ? el[1][i].replace(/bag/,'') : el[1][i].replace(/bags/,'')
            childCol = childCol.replace(/[.]/,'').slice(3).replace(' ','-').trim()
            children.push([childCol,amount])
            let childBag = new Bag(childCol,undefined,color)
            bags[childBag.color] ? (bags[childBag.color].color = childCol , bags[childBag.color].parent = color) : bags[childBag.color] = childBag
        }
        let bag = new Bag(color,children)
        bags[bag.color] ? (bags[bag.color].color = color , bags[bag.color].children = children) : bags[bag.color] = bag
    }
 })


let canHost = []
function recursive(color){
    for (const [key, value] of Object.entries(bags)) {
        if(value.children==undefined){
            continue
        }
        for(let i=0;i<value.children.length;i++){
            if(value.children[i][0]==color){
                canHost.indexOf(value.color) < 0 ? canHost.push(value.color) : undefined
                recursive(value.color)
            }
        }
    }
    
}
recursive("shiny-gold")
console.log("Part one = " + canHost.length)
let p2 = bags['shiny-gold'].getTotal()
console.log("Part two = " + (p2-1))



