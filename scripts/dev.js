const { spawn } = require('child_process')
const chokidar = require('chokidar')

chokidar
  .watch(
    [
      'tailwind.css',
      'miniprogram/pages/**/*.wxml',
      'miniprogram/components/**/*.wxml',
      'tailwind.config.js',
    ],
    {
      persistent: true,
    }
  )
  .on('change', (event, path) => {
    console.log(event, path)
    const child = spawn('npm', ['run', 'build:tw'], { stdio: 'inherit' })
    child.on('exit', (code) => {
      if (code != 0) return
      spawn('npm', ['run', 'build:replace'], { stdio: 'inherit' })
    })
  })

chokidar.watch(['miniprogram/**/*.ts']).on('change', (event, path) => {
  spawn('npm', ['run', 'build:ts'], { stdio: 'inherit' })
})