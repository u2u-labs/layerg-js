// Rollup is the legacy build system for layerg-js and is only used for cocos2d-x-js support.

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: './index.ts',
    output:  {
        format: 'umd',
        name: 'layergjs',
        dir: "dist",
        entryFileNames: "layerg-js.umd.js" // workaround for TS requirement that dir is specified in config
    },
    plugins: [
        typescript({
            include: ["**/*.ts"],
            target: "es5"
        }),
        nodeResolve()
    ],
    moduleContext: {
        [require.resolve('whatwg-fetch')]: 'window'
    }
};
