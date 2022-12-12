
const closeButton = document.querySelector('.close');

if (closeButton !== null) {
	closeButton.addEventListener('click', () => {
		const parent = closeButton.parentElement;
		if (parent !== null) {
			const grandPa = parent.parentElement;
			if (grandPa !== null) grandPa.remove();
		}
	});
}
