const fs = require('fs');
const read = fs.readFileSync("day11.txt");
let data = read.toString().split('\n').map(el=>el.split(''))
let dataP2= JSON.parse(JSON.stringify(data))

const day11 = {
    run(part){
        data=dataP2
        let searching = true
        while(searching){
            let newData = JSON.parse(JSON.stringify(data))
            let k = false
            for(let y=0;y<data.length;y++){
                for(let x=0;x<data[0].length;x++){
                    let el = data[y][x]
                    let c = part=="one" ? [
                               x!==0 ? data[y][x-1] : "L",x!==data[0].length? data[y][x+1] : "L",y!==0 ? data[y-1][x] : "L",
                               y!==data.length-1 ?data[y+1][x] : "L", x!==0  && y!==0? data[y-1][x-1] : "L",
                               x!==data[0].length &&y!==0 ? data[y-1][x+1] : "L",
                               x!==0 && y!==data.length-1 ? data[y+1][x-1] : "L",
                               x!==data[0].length && y!==data.length-1? data[y+1][x+1] : "L"
                              ].filter(el=>el=='#') : checkSeats(y,x,data)

                    el=='L' && c.length==0 || el=='L' && c==0 ? (newData[y][x] = "#", k=true) : 
                    (el=='#' && c.length>=4 && part=="one") || (el=='#' && c>=5 && part=="two") ? 
                    (newData[y][x] = "L",k=true) : undefined
                }    
            }
            data = newData
            !k ? (searching=false,console.log(`Part ${part} = `  +data.flat(2).filter(el=>el=='#').length)) :undefined
        }  
    }
}

day11.run('one')
day11.run('two')

function checkSeats(baseY,baseX,data){
    let c = 0
    for(let y=baseY-1;y>-1;y--){
        if(data[y][baseX]!=='.'){
            data[y][baseX]=='#' ? c++ : undefined
            break
        }  
    }
    for(let y=baseY+1;y<data.length;y++){
        if(data[y][baseX]!=='.'){
            data[y][baseX]=='#' ? c++ : undefined
            break
        }
    }
    for(let x=baseX+1;x<data[0].length;x++){
        if(data[baseY][x]!=='.'){
            data[baseY][x]=='#' ? c++ : undefined
            break
        }
    }
    for(let x=baseX-1;x>-1;x--){
        if(data[baseY][x]!=='.'){
            data[baseY][x]=='#' ? c++ : undefined
            break
        }
    }
    for(let x=baseX-1, y=baseY-1;x>-1,y>-1;x--,y--){
        if(data[y][x]!=='.'){
            data[y][x]=='#' ? c++ : undefined
            break
        }
    }
    for(let x=baseX+1, y=baseY-1;x<data[0].length,y>-1;x++,y--){
        if(data[y][x]!=='.'){
            data[y][x]=='#' ? c++ : undefined
            break
        }
    }
    for(let x=baseX+1, y=baseY+1;x<data[0].length,y<data.length;x++,y++){
        if(data[y][x]!=='.'){
            data[y][x]=='#' ? c++ : undefined
            break
        }
    }
    for(let x=baseX-1, y=baseY+1;x>-1,y<data.length;x--,y++){
        if(data[y][x]!=='.'){
            data[y][x]=='#' ? c++ : undefined
            break
        }
    }
    return c
}
