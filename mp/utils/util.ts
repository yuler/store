export const formatTime = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return (
		[year, month, day].map(n => formatNumber(n)).join('/') +
		' ' +
		[hour, minute, second].map(n => formatNumber(n)).join(':')
	);
};

const formatNumber = (n: number) => {
	const s = n.toString();
	return s[1] ? s : '0' + s;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};
