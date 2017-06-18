import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import Notifier from 'node-notifier';

const bundle = () => new Promise((resolve, reject) => {
  browserify('./src/main.js', {
      standalone: 'ES-Live',
      debug: true
    })
    .bundle()
    .on('error', (err) => {
      console.log(err.message);
      console.log(err.codeFrame);
      console.log(err.loc);
      Notifier.notify({
        title: 'Bundle Error',
        message: err.message,
        sound: 'Frunk'
      });
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/'))
    .on('end', () => {
      resolve();
    })
    .on('error', (err) => {
      reject(err);
    });
});

gulp.task('dev', () => {
  gulp.watch('./src/**/*.js', (file) => {
    console.log(file.path);
    bundle();
  });
});
