import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const findRepoIndex = (repositories: { name: string; }[], title: string) => {
    return repositories.findIndex(
        (repo: { name: string }) => repo.name === title
    );
};

export const updateRepository = async (
    repositories: any[], 
    repoIndex: number, 
    editedTitle: string, 
    editedDesc: string, 
    editedPoints: string[], 
    uid: string
) => {    

    const pointsString = JSON.stringify({
        bullet_points: editedPoints,
    });

    repositories[repoIndex].points = pointsString;
    repositories[repoIndex].name = editedTitle;
    repositories[repoIndex].description = editedDesc;

    await updateDoc(doc(db, "users", uid), {
        repositories,
    });

    repositories[repoIndex].points = editedPoints;

    return repositories[repoIndex];
}; 

export const fetchImageUrl = async (uid: string, repoIndex: number) => {
    const directoryRef = ref(storage, `images/${uid}`);
    const fileList = await listAll(directoryRef);
    const repoImage = fileList.items.find((item) =>
        item.name.startsWith(`img_${repoIndex}_`)
    );
    if (repoImage) {
        const url = await getDownloadURL(repoImage);
        return url;
    }
    return null;
};