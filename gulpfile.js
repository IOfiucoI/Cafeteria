const { src, dest, watch, series } = require('gulp');

//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Imagen
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src('sass/app.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('css'))
    done();
}

function imagenes() {
    return src('fotos/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('img'));
}

function imgWebp() {
    const opciones = {
        quality: 50
    }
    return src('fotos/**/*.{png,jpg,jpeg}')
        .pipe(webp(opciones))
        .pipe(dest('img'));
}

function imgAvif() {
    const opciones = {
        quality: 50
    }
    return src('fotos/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('img'));

}

function dev() {
    watch('sass/**/*.scss', css);
    watch('fotos/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.imgWebp = imgWebp;
exports.imgAvif = imgAvif;

exports.default = series(imagenes, imgWebp, imgAvif, css, dev);
