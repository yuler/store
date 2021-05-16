export function debug(ns: string, ...message: unknown[]) {
	if (getApp<IApp>().globalData.debug) {
		console.warn(`[${ns}]:`, ...message);
	}
}
