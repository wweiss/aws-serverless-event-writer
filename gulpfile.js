require('dotenv').config();

const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const install = require('gulp-install');
const run = require('gulp-run-command').default;

const vars = {
  s3BucketName: process.env.S3_BUCKET_NAME,
  cloudFormationStackName: process.env.STACK_NAME
};

const paths = {
  src: 'src',
  dist: 'dist',
  tmp: 'tmp'
};

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
  return del([paths.dist, paths.tmp]);
});

gulp.task('build', ['build:clean', 'build:transpile'], () => {
  return del(`${paths.dist}/package*.json`)
});

gulp.task('build:clean', ['build:modules'], () => {
  return del(`${paths.dist}/package*.json`)
});

gulp.task('build:modules', () => {
  return gulp.src('package.json')
    .pipe(gulp.dest(paths.dist))
    .pipe(
      install({
        production: true
      })
    )
});

gulp.task('build:transpile', () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest(paths.dist));
});

gulp.task('build:temp', () => {
  return gulp.src('*.*', {
      read: false
    })
    .pipe(gulp.dest(paths.tmp));
})

gulp.task('package', ['build:temp', 'build'], run(`aws cloudformation package \
--template app.template.yaml \
--s3-bucket ${vars.s3BucketName} \
--output-template ${paths.tmp}/packaged-sam.yaml`));

gulp.task('deploy', run(`aws cloudformation deploy \
--template-file ${paths.tmp}/packaged-sam.yaml \
--stack-name ${vars.cloudFormationStackName} \
--capabilities CAPABILITY_IAM`));

gulp.task('watch', ['build:transpile'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);