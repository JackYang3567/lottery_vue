var gulp = require('gulp'),
imagemin = require('gulp-imagemin');

gulp.task('auto',() =>{
    //gulp.watch('js/*.js',['script']);
    //gulp.watch('css/*.css', ['css']);
    gulp.watch('static/img/*.*', ['image'])
})
gulp.task('image',() =>{
    gulp.src('dist/static/img/*.*')
        .pipe(imagemin({
            optimizationLevel: 5,  //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,     //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,      //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true        //类型：Boolean 默认：false 多次优化svg直到完全优化
          }))
        .pipe(gulp.dest('dist/static/img'))
})
gulp.task('default',gulp.series('auto'))