import esbuild from 'esbuild';

// Shared esbuild config
const config = {
  logLevel: 'info',
  entryPoints: ['index.ts'],
  bundle: true,
  target: 'es6',
  globalName: 'layergjsprotobuf'
};

// Build CommonJS
await esbuild.build({
  ...config,
  format: 'cjs',
  outfile: 'dist/layerg-js-protobuf.cjs.js'
});

// Build ESM
await esbuild.build({
  ...config,
  format: 'esm',
  outfile: 'dist/layerg-js-protobuf.esm.mjs'
});

// Build IIFE
await esbuild.build({
  ...config,
  format: 'iife',
  outfile: 'dist/layerg-js-protobuf.iife.js'
});