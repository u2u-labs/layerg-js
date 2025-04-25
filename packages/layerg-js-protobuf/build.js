const { execSync } = require("child_process");

function esbuild(args) {
    execSync("npx esbuild --bundle index.ts --target=es6 --global-name=layergjsprotobuf " + args)
}

// emit .d.ts files and perform type checking
execSync("npx typescript --project tsconfig.json", {stdio: 'inherit'})

esbuild(" --format=cjs --outfile=dist/layerg-js-protobuf.cjs.js")
esbuild(" --format=esm --outfile=dist/layerg-js-protobuf.esm.mjs")
esbuild(" --format=iife --outfile=dist/layerg-js-protobuf.iife.js")
