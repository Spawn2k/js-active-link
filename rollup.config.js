// rollup.config.mjs
import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
export default {
  input: 'assets/js/swipe.js',
  output: [
    {
      file: 'assets/js/swipe-dist-expanded.js',
      format: 'iife',
    },
    {
      file: 'assets/js/swipe-dist.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()],
    },
  ],

  plugins: [
    scss({
      processor: () => postcss([autoprefixer()]),
      sourceMap: true,
      fileName: 'swipe-dist.css',
      outputStyle: 'compressed',
    }),
  ],
};
