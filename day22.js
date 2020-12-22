const fs = require('fs');
const read = fs.readFileSync("day22.txt");
let player1 = []
let player2 = []
let o = false
let data = read.toString().split('\r\n').forEach(el=>{
    if(el.length<3 && el!==''){
    o ? player2.push(parseInt(el)) :  player1.push(parseInt(el))   
    }else if(el==''){
        o = true
    }
})
let saveP1 = [...player1]
let saveP2 = [...player2]
const day22 = {
    partOne(){
        let playing = true
        let winner
        while(playing){
            let c1 = player1.shift()
            let c2 = player2.shift()
            c1>c2 ? player1 = [...player1,c1,c2] :  player2 = [...player2,c2,c1]  
            if(player1.length==0 || player2.length==0){
                playing = false
                winner = player1 || player2
            }
        }
        console.log("Part one = ", winner.reduce((t,el,i)=>t+el*(winner.length-i),0));
    },
    partTwo(){
        let winDeck
        game(0,saveP1,saveP2,[],[])
        console.log("Part one = ", winDeck.reduce((t,el,i)=>t+el*(winDeck.length-i),0));

        function game(round,player1,player2){
            player1=[...player1]
            player2=[...player2]
            let playing = true
            let winner
            let prev1 = []
            let prev2 = []
            while(playing){
                let p1 = player1.join('-')
                let p2 = player2.join('-')
                if(prev1.indexOf(p1)>-1 || prev2.indexOf(p2)>-1){             
                    winDeck = player1
                    return "player1"
                }
                round++
                prev1.push(p1)
                prev2.push(p2)
                let c1 = player1.shift()
                let c2 = player2.shift()
                if(c1<=player1.length && c2<=player2.length){
                    player1C = player1.slice(0,c1)
                    player2C = player2.slice(0,c2)
                    winner = game(0,player1C,player2C)
                    winner=='player1' ? player1.push(c1,c2) : player2.push(c2,c1)
                    if(player1.length==0 || player2.length==0){
                        playing = false
                        winDeck = player1 || player2
                        return player1.length==0 ? "player2" : "player1"    
                    }
                }else{
                    c1>c2 ? player1.push(c1,c2) : player2.push(c2,c1)
                    if(player1.length==0 || player2.length==0){
                        playing = false
                        winDeck = player1 || player2
                        return player1.length==0 ? "player2" : "player1"    
                    }
                }
            }
        
        }
        
    }
}
day22.partOne()
day22.partTwo()


