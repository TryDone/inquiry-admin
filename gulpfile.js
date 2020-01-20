var gulp = require('gulp')
var GulpSSH = require('gulp-ssh') // ssh服务器

var remothost = {
  config: {
    host: '182.92.165.228', // 服务器IP
    port: 22, // 服务器端口
    username: 'root', // 服务器账号
    password: 'Admin@1234!' // 服务器密码
  },
  testConfig: {
    host: '106.12.114.76', // 服务器IP
    port: 22, // 服务器端口
    username: 'root', // 服务器账号
    password: 'Admin@1234!' // 服务器密码
  },
  dir: {
    path: '/usr/local/inquiry/html/inquiry/' // 服务端项目路径
  },
  rm: [
    `rm -rf /usr/local/inquiry/html/inquiry/` // rm -rf 递归删除
  ]
}

// 创建gulpSSH 将以上remothost 配置信息传入sshConfig
var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: process.argv.length > 2 ? remothost.testConfig : remothost.config
})

// 上传服务器
gulp.task('default', function (cb) {
  return gulp.src('./dist/**')
    .pipe(gulpSSH.dest(remothost.dir.path))
})
