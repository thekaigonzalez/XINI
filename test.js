const xini = require("./xini/analyzer")
const fs = require("fs")
let out = (xini.parseXINI(fs.readFileSync("tests/namespace.xini").toString()))

console.log(out)