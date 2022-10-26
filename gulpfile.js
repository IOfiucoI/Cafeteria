
const {src, dest, watch}= require('gulp');
const { compile } = require('sass');
//Watch revisa cambios
// Dest = destino
// SRC ubicacion

const sass = require ('gulp-sass')(require('sass'));


function css(done){
// Compila SASS
// Identificar, compilar, guardar
 src('src/scss/app.scss')
 .pipe( sass({outputStyle: 'compress'}))
 .pipe(dest('build/css'))
done();
}

function dev(){

    watch ('src/scss/app.scss', css);

}

exports.css = css;
exports.dev = dev;