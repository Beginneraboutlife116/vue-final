import Swal from "sweetalert2";

function showSuccessToast(title: string) {
	Swal.fire({
		title,
		icon: 'success',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		position: 'top-end',
		timerProgressBar: true,
	});
}

function showErrorToast(title: string) {
	Swal.fire({
		title,
		icon: 'error',
		showConfirmButton: false,
		timer: 1500,
		toast: true,
		position: 'top-end',
		timerProgressBar: true,
	});
}

export {
	showSuccessToast,
	showErrorToast,
}
