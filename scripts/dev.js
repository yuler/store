const { spawn } = require('child_process')
const chokidar = require('chokidar')

// watch ts
spawn('npx', ['tsc -w'], { stdio: 'inherit' })

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
  .on('change', (event, path) => {
    console.log(event, path)
    spawn('npm', ['run', 'build:tw'], { stdio: 'inherit' })
  })
