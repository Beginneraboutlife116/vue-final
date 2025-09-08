import Swal from 'sweetalert2';

function showErrorMessageModal({
	title,
	text,
}: {
	title: string;
	text: string;
}) {
	Swal.fire({
		title,
		text,
		icon: 'error',
	});
}

export { showErrorMessageModal };
