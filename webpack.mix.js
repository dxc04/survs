const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .styles(
       [
           'resources/assets/css/bootstrap.min.css',
           'resources/assets/css/survey.css',
           'public/css/app.css'
       ],
       'public/css/main.css'
   );

/*
 |--------------------------------------------------------------------------
 | React Dependencies
 |--------------------------------------------------------------------------
 */
mix.extract(['react', 'react-dom'], 'public/js/react.compiled.min.js');
mix.react('resources/assets/js/build-survey-render.jsx', 'public/js/build-survey-render.js');
mix.react('resources/assets/js/publish-survey-render.jsx', 'public/js/publish-survey-render.js');


mix.scripts(
    [
        'public/js/manifest.js',
        'public/js/react.compiled.min.js',
        'public/js/app.js'
    ],
    'public/js/app.compiled.min.js'
);
