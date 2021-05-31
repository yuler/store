import {computed, ref} from 'vue';
import cloudbase from '@cloudbase/js-sdk';

const app = cloudbase.init({
	env: import.meta.env.VITE_ENV_ID
});

export function useCloudBase() {
	const auth = app.auth({persistence: 'local'});

	const user = ref(auth.currentUser);

	const isAuthed = computed(() => Boolean(user.value));

	auth.onLoginStateChanged((loginState: cloudbase.auth.ILoginState) => {
		user.value = loginState?.user;
	});

	return {
		app,
		auth,
		isAuthed,
		user
	};
}
