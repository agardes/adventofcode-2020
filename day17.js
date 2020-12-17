const fs = require('fs');
const read = fs.readFileSync("day17.txt");
let data = read.toString().split('\r\n')
let actives = []

data.forEach((line,y)=>{
    line = line.split('')
    line.forEach((cube,x)=>{ cube=='#' ? actives.push(x+'|'+y+'|'+0+'|'+0) : undefined })
})
let reset = [...actives]

const day17 = {
    run(part){
        let oldActives= [...reset]
        let cycle = 0
        let minZ = minY = minX = -1
        minW = part=='one' ? 0 : -1
        let maxZ = 1
        maxW = part=='one' ? 0 : 1
        let maxX = data[0].length
        let maxY = data.length
        while(cycle<6){
            cycle++
            let newActives = []
            for(let y=minY;y<=maxY;y++){
                for(let x=minX;x<=maxX;x++){
                    for(let z=minZ;z<=maxZ;z++){
                        for(let w=minW;w<=maxW;w++){
                            let coord = x+'|'+y+'|'+z+'|'+w
                            let nei = getNei(x,y,z,w)
                            let intersection = oldActives.filter(x => nei.includes(x));
                            oldActives.indexOf(coord)!==-1 ? intersection.length==3 || intersection.length==2 ? newActives.push(coord) : undefined 
                            : intersection.length==3 ? newActives.push(coord) : undefined 
                        }
                    }
                
                } 
            }
            oldActives = newActives
            part!== 'one' ? (minW -= 1,maxW += 1) :undefined
            minZ -= 1, minY -= 1, minX -= 1, maxZ += 1, maxX += 1, maxY += 1
            cycle== 6 ? console.log('Part '+part+' = ' + newActives.length) : undefined
        }


    }
}

function getNei(x,y,z,w){
    let arr = []
    for(let xX=-1;xX<=1;xX++){
        for(let yY=-1;yY<=1;yY++){
            for(let zZ=-1;zZ<=1;zZ++){
                for(let wW=-1;wW<=1;wW++){
                    x+xX==x && y+yY==y && z+zZ==z && w+wW==w ? undefined : arr.push((x+xX)+'|'+(y+yY)+'|'+(z+zZ)+'|'+(w+wW)) 
                }   
            }
        }
    }
    return arr
}

day17.run('one')
day17.run('two')