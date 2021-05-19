import {spawn} from 'node:child_process';
import {watch} from 'chokidar';
import {debounce} from '@yuler/utils';

// Watch ts
spawn('npx', ['tsc', '-w'], {stdio: 'inherit'});

// Watch tw
watch(['mp/**/*.wxml', 'wind.config.js'], {
	persistent: true
})
	.on('change',
		// Add debounce for sometimes you enable `windicss.sortOnSave`
		debounce(path => {
			console.log(`[dev: watch]: ${path} changed.`);
			spawn('npm', ['run', 'build:css'], {stdio: 'inherit'});
		}, 200, true)
	);
