import {spawn} from 'node:child_process';
import {watch} from 'chokidar';

// Watch ts
spawn('npx', ['tsc', '-w'], {stdio: 'inherit'});

// Watch tw
watch(['mp/**/*.wxml', 'wind.config.js'], {
	persistent: true
})
	.on('change', path => {
		console.log(`[dev: watch]: ${path} changed.`);
		spawn('npm', ['run', 'build:tw'], {stdio: 'inherit'});
	});
