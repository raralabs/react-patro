- rollup => For bundling
- @rollup/plugin-node-resolve => resolves any third party modules/dependencies (for our case date-fns) and add to the source code
- rollup-plugin-terser => ugliying and minimizing generated bundl
- tslib => To remove duplication of typescript's helper functions. imported by setting importHelpers flag to true in tsconfig.json

//TODO babel , husky, lint, prettier, editorconfig

prettier => for code formatting

// Babel setup

1. @babel/preset-react => handles jsx and other react "things"
2. @babel/preset-typescript => for typescript of course
3.
