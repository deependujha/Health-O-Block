export function imageUrlForBackend(imageUrl: string, isDoctor = false) {
	if (isDoctor) {
		return `http://localhost:7000/doctor/image/${imageUrl}`;
	}
	return `http://localhost:7000/user/image/${imageUrl}`;
}
