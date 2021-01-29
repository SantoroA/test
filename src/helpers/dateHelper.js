const formatDateDisplay = (date) => {
	let newDate = new Date(Date.parse(date)).toDateString().split(' ');
	let dateDisplay = `${new Date(date).toLocaleString('default', {
		weekday: 'long'
	})}, ${new Date(date).toLocaleString('default', {
		month: 'long'
	})} ${newDate[2]} ${newDate[3]}`;
	return dateDisplay;
};

const convertTime = (date) => {
	let hours = new Date(date).getHours();
	let min = new Date(date).getMinutes();
	let realMin = min < 10 ? '00' : min;
	return `${hours}:${realMin}`;
};

const formatDateNoYear = (date) => {
	let newDate = new Date(Date.parse(date)).toDateString().split(' ');
	let dateFormatted = `${new Date(date).toLocaleString('default', {
		weekday: 'long'
	})}, ${newDate[2]} ${new Date(date).toLocaleString('default', {
		month: 'long'
	})}`;
	return dateFormatted;
};

const getTimeDifference = (date1, date2) => {
	let difference = new Date(date1).getTime() - new Date(date2).getTime();
	let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
	difference -= daysDifference * 1000 * 60 * 60 * 24;

	let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
	difference -= hoursDifference * 1000 * 60 * 60;

	let minutesDifference = Math.floor(difference / 1000 / 60);
	difference -= minutesDifference * 1000 * 60;

	let secondsDifference = Math.floor(difference / 1000);

	return minutesDifference;
};

export { formatDateDisplay, convertTime, getTimeDifference, formatDateNoYear };
