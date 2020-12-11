const fs = require('fs');
const read = fs.readFileSync("day11.txt");
let data = read.toString().split('\n').map(el=>el.split(''))
let searching = true
let oldOrder = ""
let dataP2= JSON.parse(JSON.stringify(data))
while(searching){
    let newData = JSON.parse(JSON.stringify(data))
    let order = ""
    for(let y=0;y<data.length;y++){
        for(let x=0;x<data[0].length;x++){
            let el = data[y][x]
            let nei = [
                       x!==0 ? data[y][x-1] : "L",x!==data[0].length? data[y][x+1] : "L",y!==0 ? data[y-1][x] : "L",
                       y!==data.length-1 ?data[y+1][x] : "L", x!==0  && y!==0? data[y-1][x-1] : "L",
                       x!==data[0].length &&y!==0 ? data[y-1][x+1] : "L",
                       x!==0 && y!==data.length-1 ? data[y+1][x-1] : "L",
                       x!==data[0].length && y!==data.length-1? data[y+1][x+1] : "L"
                      ]
            
            let c = nei.filter(el=>el=='#')
            el=='L' && c.length==0 ? ( newData[y][x] = "#", order+=y+"-"+x+"-") : el=='#' && c.length>=4 ?   newData[y][x] = "L" : undefined     
        }    
    }
    data = newData
    if(oldOrder==order){
        searching=false
        console.log("Part one = " +data.flat(2).filter(el=>el=='#').length)
    }
    oldOrder = order
}

oldOrder = ""
searching = true

while(searching){
    let newData = JSON.parse(JSON.stringify(dataP2))
    let order = ""
    for(let y=0;y<dataP2.length;y++){
        for(let x=0;x<dataP2[0].length;x++){
            let el = dataP2[y][x]
            let c = checkSeats(y,x,dataP2)
            el=='L' && c==0 ? ( newData[y][x] = "#", order+=y+"-"+x+"-") : el=='#' && c>=5 ?   newData[y][x] = "L" : undefined            
        }     
    }
    dataP2 = newData
    if(oldOrder==order){
        searching=false
        console.log("Part two = " + dataP2.flat(2).filter(el=>el=='#').length)
    }
    oldOrder = order
}

function checkSeats(baseY,baseX,data){
    let c = 0
    for(let y=baseY-1;y>-1;y--){
        if(data[y][baseX]=='L'){
            break
        }
        if(data[y][baseX]=='#'){
            c++
            break
        }
    }
    for(let y=baseY+1;y<data.length;y++){
        if(data[y][baseX]=='L'){
            break
        }
        if(data[y][baseX]=='#'){
            c++
            break
        }

    }
    for(let x=baseX+1;x<data[0].length;x++){
        if(data[baseY][x]=='L'){
            break
        }
        if(data[baseY][x]=='#'){
            c++
            break
        }

    }
    for(let x=baseX-1;x>-1;x--){
        if(data[baseY][x]=='L'){
            break
        }
        if(data[baseY][x]=='#'){
            c++
            break
        }

    }
    for(let x=baseX-1, y=baseY-1;x>-1,y>-1;x--,y--){
        if(data[y][x]=='L'){
            break
        }
        if(data[y][x]=='#'){
            c++
            break
        }
 
    }
    for(let x=baseX+1, y=baseY-1;x<data[0].length,y>-1;x++,y--){
        if(data[y][x]=='L'){
            break
        }
        if(data[y][x]=='#'){
            c++
            break
        }
    }
    for(let x=baseX+1, y=baseY+1;x<data[0].length,y<data.length;x++,y++){
            if(data[y][x]=='L'){
                break
            }
            if(data[y][x]=='#'){
                c++
                break
            }
    }
    for(let x=baseX-1, y=baseY+1;x>-1,y<data.length;x--,y++){
            if(data[y][x]=='L'){
                break
            }
            if(data[y][x]=='#'){
                c++
                break
            }
    }
    return c
}

