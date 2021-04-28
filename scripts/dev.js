const { spawn } = require('child_process')
const chokidar = require('chokidar')

// watch ts
spawn('npx', ['tsc', '-w'], { stdio: 'inherit' })

// watch tw
chokidar
  .watch(
    [
      'mp/**/*.wxml',
      'wind.config.js',
    ],
    {
      persistent: true,
    }
  )
  .on('change', path => {
    console.log(`[dev: watch]: ${path} changed.`)
    spawn('npm', ['run', 'build:tw'], { stdio: 'inherit' })
  })
