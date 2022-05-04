const {parseXINI} = require("./xini/analyzer")
const fs = require("fs")
let xini = parseXINI(fs.readFileSync("benchmark/bench1.xini").toString())

console.log(xini.object1.hello)