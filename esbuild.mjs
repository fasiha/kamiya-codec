import {build} from 'esbuild';

// IIFE (useful for the old school <script> tags in browsers)
await build({
  entryPoints: ['index.ts'],
  outfile: 'dist/kamiya.min.js',
  bundle: true,
  sourcemap: true,
  minify: true,
  format: 'iife',
  globalName: 'kamiya',
  target: ['es6'],
});

// ESM module (like `import * as lib from '..'` in Node and browsers)
await build({
  entryPoints: ['index.ts'],
  outfile: 'dist/kamiya.min.mjs',
  bundle: true,
  sourcemap: true,
  minify: true,
  format: 'esm',
  target: ['es6'],
});

// Build Node commonjs (`require('kamiya-codec')`)
await build({
  entryPoints: ["index.ts"],
  outfile: "dist/kamiya.cjs",
  bundle: true,
  sourcemap: true,
  format: "cjs",
});
