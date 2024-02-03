import { signInWithGithub } from "./firebase";
import { getAdditionalUserInfo, GithubAuthProvider } from "@firebase/auth";
import { getUserData } from "./get-user-data";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { fetchUserRepositories } from "./get-repos";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { uploadUserRepoImg } from "./upload-user-repo-img";

export async function signInFunc(
  router: AppRouterInstance,
  startCreatingAccount: any,
  finishCreatingAccount: any,
) {
  await signInWithGithub().then(async (result) => {
    if (result.user.uid) {
      // should always be true
      const user = await getUserData(result.user.uid);
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (user) {
        if (user.doneSurvey) {
          router.push("/projects");
        } else {
          router.push("/survey");
        }
      } else {
        startCreatingAccount();
        const accessToken =
          GithubAuthProvider.credentialFromResult(result)?.accessToken;
        const repositories = await fetchUserRepositories(accessToken || "");
        setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          doneSurvey: false,
          photoURL: result.user.photoURL,
          email: result.user.email,
          name: result.user.displayName
            ? result.user.displayName
            : additionalUserInfo?.username,
          accessToken: accessToken,
          repositories: repositories,
        });
        // await Promise.all(
        // 	repositories.map((repo: any, index: number) => {
        // 		return uploadUserRepoImg(
        // 			repo.name,
        // 			repo.description,
        // 			repo.points,
        // 			result.user.uid,
        // 			index
        // 		);
        // 	})
        // );

        // this below is wrong since it moves on and gets
        // rid of the loading screen without finishing all generations
        //     - on fix of rate limit error use the above code!
        repositories.map(async (repo: any, index: number) => {
          await uploadUserRepoImg(
            repo.name,
            repo.description,
            repo.points,
            result.user.uid,
            index,
          );
        });
        finishCreatingAccount();
        router.push("/survey");
      }
    } else {
      throw new Error("User not signed in");
    }
  });
}
