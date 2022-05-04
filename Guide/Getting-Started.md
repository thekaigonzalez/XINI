# Getting Started with XINI

XINI contains one simple function found in xini/analyzer.js called `parseXINI`, this is
all you will need.

Create a node.js file and embed XINI into it.

```js
const xini = require("./xini/analyzer")

```

Great! now we need to utilize it, so create a file called `my-awesome-config.xini` and write:

```ini

hello.world = Hello, world!

```

Then go back to your JS file, and write:

```js
let config = xini.parseXINI(fs.readFileSync("./my-awesome-config.xini").toString())
```

Then, access the "world" variable from the "hello" namespace.

```js

console.log(config.hello.world)

```

And the output should be:

`Hello, world!`

And no, you will not need to create the namespaces as declarations, XINI already fixes broken links, if the namespace does not exist.