import { uploadString, ref, listAll, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

const imagesDir = "images/";

export async function uploadUserRepoImg(
	name: string,
	desc: string,
	points: string[],
	uid: string,
	repoNum: number
) {

	const directoryRef = ref(storage, `${imagesDir}${uid}`);
	const fileList = await listAll(directoryRef);
	const existingImageRef = fileList.items.find(item => item.name.startsWith(`img_${repoNum}_`));

	if (existingImageRef) {
		await deleteObject(existingImageRef);
	}

	const response = await fetch("/api/image", {
		method: "POST",
		body: JSON.stringify({
			name: name,
			desc: desc,
			points: points,
		}),
	});
	const b64 = await response.json();
	const imageName = `img_${repoNum}_${Date.now()}.png`;
	const imageRef = ref(storage, `${imagesDir}${uid}/${imageName}`);
	uploadString(imageRef, b64, "base64")
		.then((snapshot) => {
			console.log(`Uploaded image for repo: ${repoNum} for user ${uid}!`);
		})
		.catch((error) => {
			console.error(`Error uploading image repoNum: ${repoNum}: `, error);
		});
	return b64;
}
