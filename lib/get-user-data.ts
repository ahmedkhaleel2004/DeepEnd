import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserData(uid: string) {
	const docRef = doc(db, "users", uid);
	const docSnap = await getDoc(docRef);
	return docSnap.data();
}
