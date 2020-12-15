
let input = "6,13,1,15,2,0".split(',').map(Number)

const day15 = {
    run(limit){
        let order = new Map()
        let turns = 1
        let last
        while(turns<limit){
            let current = (turns <=input.length) ? input[turns-1] : last
            last = order.has(current) ? turns - order.get(current) : 0
            order.set(current,turns)
            turns++
        }
        return last
    }
}
console.log("Part one = " + day15.run(2020))
console.log("Part two = " + day15.run(30000000))

