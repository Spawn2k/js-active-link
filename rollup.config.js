// rollup.config.mjs
import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
export default {
  input: 'assets/js/main.js',
  output: [
    {
      file: 'assets/js/main-expanded.js',
      format: 'iife',
    },
    {
      file: 'assets/js/main.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()],
    },
  ],

  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      sourceMap: true,
      fileName: 'assets/css/main.css',
      outputStyle: 'compressed',
    }),
  ],
};
