import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpCssImport from 'gulp-cssimport';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import {deleteAsync} from 'del';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';
import {stream as critical} from 'critical';
import gulpif from 'gulp-if';

import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import rename from 'gulp-rename';

const prepros = true; // false если нужно обработать css-файлы

let isDev = false;

const PATHS = {
  src: {
    js: 'src/js/**/*.js',
    blog: 'src/js/blog/**/*.js',
    index: 'src/js/index/**/*.js',
  },
  dict: {
    js: 'dist/js',
  },
};

const sass = gulpSass(sassPkg);


export const html = () => gulp
  .src('src/*.html')
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());


export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/index.scss')
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({
        2: {
          specialComments: 0,
        },
      }))
      .pipe(gulpif(isDev, sourcemaps.write('../maps')))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }
  return gulp
    .src('src/css/index.css')
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(gulpCssImport({
      extensions: ['css'],
    }))
    .pipe(cleanCSS({
      2: {
        specialComments: 0,
      },
    }))
    .pipe(gulpif(isDev, sourcemaps.write('../maps')))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};


const webpackConf = (fileScriptName) => {
  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : false,
    optimization: {
      minimize: false,
    },
    output: {
      filename: fileScriptName,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: [/node_modules/],
          loader: 'babel-loader',
        }
      ],
    },
  };
};

const webpackConf1 = webpackConf('index.js');
if (!isDev) {
  webpackConf1.module.rules.push({
    test: /\.(js)$/,
    exclude: [/node_modules/, /PATHS.src.blog/],
    loader: 'babel-loader',
  })
  
}
const webpackConf2 = webpackConf('blog.js');

if (!isDev) {
  webpackConf2.module.rules.push({
    test: /\.(js)$/,
    exclude: [/node_modules/, /PATHS.src.index/],
    loader: 'babel-loader',
  })
}

// для модульной системы
export const js = () => gulp
  .src(PATHS.src.index)
  .pipe(plumber())
  .pipe(webpackStream(webpackConf1, webpack))
  .pipe(gulpif(!isDev, gulp.dest(PATHS.dict.js)))
  .pipe(gulpif(!isDev, terser()))
  .pipe(
    rename({
      suffix: '.min',
    }),
  )
  .pipe(gulp.dest(PATHS.dict.js))
  .pipe(browserSync.stream());

export const jsBlog = () => gulp
  .src(PATHS.src.blog)
  .pipe(plumber())
  .pipe(webpackStream(webpackConf2, webpack))
  .pipe(gulpif(!isDev, gulp.dest(PATHS.dict.js)))
  .pipe(gulpif(!isDev, terser()))
  .pipe(
    rename({
      suffix: '.min',
    }),
  )
  .pipe(gulp.dest(PATHS.dict.js))
  .pipe(browserSync.stream());

export const img = () => gulp
  .src('src/img/**/*.{jpg,ipeg,png,svg,gif}')
  .pipe(gulpif(!isDev, gulpImg({
    optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
    pngquant: ['--speed=1', '--force', 256],
    zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
    jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
    mozjpeg: ['-optimize', '-progressive'],
    gifsicle: ['--optimize'],
    svgo: true,
  })))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const webp = () => gulp
  .src('src/img/**/*.{jpg,ipeg,png}')
  .pipe(gulpWebp({
    quality: 60,
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());


export const avif = () => gulp
  .src('src/img/**/*.{jpg,ipeg,png}')
  .pipe(gulpAvif({
    quality: 50,
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(browserSync.stream());

export const criticalCSS = () => gulp
  .src('dist/*.html')
  .pipe(critical({
    base: 'dist/',
    inline: true,
    css: ['dist/css/index.css'],
  }))
  .on('error', err => {
    console.error(err.message);
  })
  .pipe(gulp.dest('dist'));

export const copy = () => gulp
  .src('src/fonts/**/*', {
    base: 'src',
  })
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({
    once: true,
  }));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: 'dist',
    },
  });
  gulp.watch('src/**/*.html', html);
  gulp.watch(prepros ? 'src/scss/**/*.scss' : 'src/css/**/*.css', style);
  gulp.watch('src/img/**/*.{jpg,ipeg,png,svg,gif}', img);
  gulp.watch('src/js/**/*.js', js);
  gulp.watch('src/js/**/*.js', jsBlog);
  gulp.watch('src/fonts/**/*', copy);
  gulp.watch('src/img/**/*.{jpg,ipeg,png}', webp);
  gulp.watch('src/img/**/*.{jpg,ipeg,png}', avif);
};

export const clear = (done) => {
  deleteAsync('dist/**/*', {
    force: true,
  });
  done();
};

export const develop = async () => {
  isDev = true;
};

export const base = gulp.parallel(html, style, js, jsBlog, img, avif, webp, copy);
export const build = gulp.series(clear, base, criticalCSS);

export const dev = gulp.series(develop, base);

export default gulp.series(develop, base, server);


