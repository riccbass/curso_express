import minimist from "minimist";

//interno
import soma from "./soma.mjs";

// node .\index.mjs --nome=Ric

//externo
const args = minimist(process.argv.slice(2));

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

soma(a, b);
