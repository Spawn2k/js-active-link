// rollup.config.mjs
import terser from '@rollup/plugin-terser';
export default {
  input: 'assets/js/main.js',
  output: [
    {
      file: 'bundle.js',
      format: 'iife',
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()],
    },
  ],

  plugins: [scss()],
};
